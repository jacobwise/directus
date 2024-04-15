import type { RolesService } from '../../../services/roles.js';

export async function fetchRolesTree(service: RolesService, start: string): Promise<string[]> {
	// TODO add caching

	let parent: string | null = start;
	const roles: string[] = [];

	while (parent) {
		const role = (await service.readOne(start, {
			fields: ['id', 'parent'],
		})) as { id: string; parent: string | null };

		roles.push(role.id);
		parent = role.parent;
	}

	roles.reverse();

	return roles;
}
