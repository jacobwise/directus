import { ForbiddenError } from '@directus/errors';
import type {
	Accountability,
	Filter,
	Item,
	Permission,
	PermissionsAction,
	SchemaOverview
} from '@directus/types';
import { validatePayload } from '@directus/utils';
import { FailedValidationError, joiValidationErrorItemToErrorExtensions } from '@directus/validation';
import type { Knex } from 'knex';
import { cloneDeep, flatten, isNil, merge } from 'lodash-es';
import { GENERATE_SPECIAL } from '../constants.js';
import getDatabase from '../database/index.js';
import type { AbstractServiceOptions } from '../types/index.js';
import { PayloadService } from './payload.js';

export class AuthorizationService {
	knex: Knex;
	accountability: Accountability | null;
	payloadService: PayloadService;
	schema: SchemaOverview;

	constructor(options: AbstractServiceOptions) {
		this.knex = options.knex || getDatabase();
		this.accountability = options.accountability || null;
		this.schema = options.schema;

		this.payloadService = new PayloadService('directus_permissions', {
			knex: this.knex,
			schema: this.schema,
		});
	}

	/**
	 * Checks if the provided payload matches the configured permissions, and adds the presets to the payload.
	 */
	validatePayload(action: PermissionsAction, collection: string, data: Partial<Item>): Partial<Item> {
		const payload = cloneDeep(data);

		let permission: Permission | undefined;

		if (this.accountability?.admin === true) {
			permission = {
				id: 0,
				role: this.accountability?.role,
				collection,
				action,
				permissions: {},
				validation: {},
				fields: ['*'],
				presets: {},
			};
		} else {
			permission = this.accountability?.permissions?.find((permission) => {
				return permission.collection === collection && permission.action === action;
			});

			if (!permission) throw new ForbiddenError();

			// Check if you have permission to access the fields you're trying to access

			const allowedFields = permission.fields || [];

			if (allowedFields.includes('*') === false) {
				const keysInData = Object.keys(payload);
				const invalidKeys = keysInData.filter((fieldKey) => allowedFields.includes(fieldKey) === false);

				if (invalidKeys.length > 0) {
					throw new ForbiddenError();
				}
			}
		}

		const preset = permission.presets ?? {};

		const payloadWithPresets = merge({}, preset, payload);

		const fieldValidationRules = Object.values(this.schema.collections[collection]!.fields)
			.map((field) => field.validation)
			.filter((v) => v) as Filter[];

		const hasValidationRules =
			isNil(permission.validation) === false && Object.keys(permission.validation ?? {}).length > 0;

		const hasFieldValidationRules = fieldValidationRules && fieldValidationRules.length > 0;

		const requiredColumns: SchemaOverview['collections'][string]['fields'][string][] = [];

		for (const field of Object.values(this.schema.collections[collection]!.fields)) {
			const specials = field?.special ?? [];

			const hasGenerateSpecial = GENERATE_SPECIAL.some((name) => specials.includes(name));

			const nullable = field.nullable || hasGenerateSpecial || field.generated;

			if (!nullable) {
				requiredColumns.push(field);
			}
		}

		if (hasValidationRules === false && hasFieldValidationRules === false && requiredColumns.length === 0) {
			return payloadWithPresets;
		}

		if (requiredColumns.length > 0) {
			permission.validation = hasValidationRules ? { _and: [permission.validation!] } : { _and: [] };

			for (const field of requiredColumns) {
				if (action === 'create' && field.defaultValue === null) {
					permission.validation._and.push({
						[field.field]: {
							_submitted: true,
						},
					});
				}

				permission.validation._and.push({
					[field.field]: {
						_nnull: true,
					},
				});
			}
		}

		if (hasFieldValidationRules) {
			if (permission.validation && Object.keys(permission.validation).length > 0) {
				permission.validation = { _and: [permission.validation, ...fieldValidationRules] };
			} else {
				permission.validation = { _and: fieldValidationRules };
			}
		}

		const validationErrors: InstanceType<typeof FailedValidationError>[] = [];

		validationErrors.push(
			...flatten(
				validatePayload(permission.validation!, payloadWithPresets).map((error) =>
					error.details.map((details) => new FailedValidationError(joiValidationErrorItemToErrorExtensions(details))),
				),
			),
		);

		if (validationErrors.length > 0) throw validationErrors;

		return payloadWithPresets;
	}
}
