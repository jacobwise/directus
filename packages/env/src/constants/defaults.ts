import { resolve } from 'node:path';
import { cwd } from 'node:process';

export const DEFAULTS = {
	CONFIG_PATH: resolve(cwd(), '.env'),

	HOST: '0.0.0.0',
	PORT: 8055,
	PUBLIC_URL: '/',
	MAX_PAYLOAD_SIZE: '1mb',
	MAX_RELATIONAL_DEPTH: 10,
	QUERY_LIMIT_DEFAULT: 100,
	MAX_BATCH_MUTATION: Infinity,
	ROBOTS_TXT: 'User-agent: *\nDisallow: /',

	TEMP_PATH: './node_modules/.directus',

	DB_EXCLUDE_TABLES: 'spatial_ref_sys,sysdiagrams',

	STORAGE_LOCATIONS: 'local',
	STORAGE_LOCAL_DRIVER: 'local',
	STORAGE_LOCAL_ROOT: './uploads',

	RATE_LIMITER_ENABLED: false,
	RATE_LIMITER_POINTS: 50,
	RATE_LIMITER_DURATION: 1,
	RATE_LIMITER_STORE: 'memory',

	RATE_LIMITER_GLOBAL_ENABLED: false,
	RATE_LIMITER_GLOBAL_POINTS: 1000,
	RATE_LIMITER_GLOBAL_DURATION: 1,
	RATE_LIMITER_GLOBAL_STORE: 'memory',

	ACCESS_TOKEN_TTL: '15m',
	REFRESH_TOKEN_TTL: '7d',
	REFRESH_TOKEN_COOKIE_SECURE: false,
	REFRESH_TOKEN_COOKIE_SAME_SITE: 'lax',
	REFRESH_TOKEN_COOKIE_NAME: 'directus_refresh_token',

	LOGIN_STALL_TIME: 500,
	SERVER_SHUTDOWN_TIMEOUT: 1000,

	ROOT_REDIRECT: './admin',

	CORS_ENABLED: false,
	CORS_ORIGIN: false,
	CORS_METHODS: 'GET,POST,PATCH,DELETE',
	CORS_ALLOWED_HEADERS: 'Content-Type,Authorization',
	CORS_EXPOSED_HEADERS: 'Content-Range',
	CORS_CREDENTIALS: true,
	CORS_MAX_AGE: 18000,

	CACHE_ENABLED: false,
	CACHE_STORE: 'memory',
	CACHE_TTL: '5m',
	CACHE_NAMESPACE: 'system-cache',
	CACHE_AUTO_PURGE: false,
	CACHE_AUTO_PURGE_IGNORE_LIST: 'directus_activity,directus_presets',
	CACHE_CONTROL_S_MAXAGE: '0',
	CACHE_SCHEMA: true,
	CACHE_PERMISSIONS: true,
	CACHE_VALUE_MAX_SIZE: false,
	CACHE_SKIP_ALLOWED: false,

	AUTH_PROVIDERS: '',
	AUTH_DISABLE_DEFAULT: false,

	PACKAGE_FILE_LOCATION: '.',
	EXTENSIONS_PATH: './extensions',
	EXTENSIONS_MUST_LOAD: false,
	EXTENSIONS_AUTO_RELOAD: false,
	EXTENSIONS_SANDBOX_MEMORY: 100,
	EXTENSIONS_SANDBOX_TIMEOUT: 1000,

	MIGRATIONS_PATH: './migrations',

	EMAIL_FROM: 'no-reply@example.com',
	EMAIL_VERIFY_SETUP: true,
	EMAIL_TRANSPORT: 'sendmail',
	EMAIL_SENDMAIL_NEW_LINE: 'unix',
	EMAIL_SENDMAIL_PATH: '/usr/sbin/sendmail',

	TELEMETRY: true,
	TELEMETRY_URL: 'https://telemetry.directus.io',

	ASSETS_CACHE_TTL: '30d',
	ASSETS_TRANSFORM_MAX_CONCURRENT: 25,
	ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION: 6000,
	ASSETS_TRANSFORM_MAX_OPERATIONS: 5,
	ASSETS_TRANSFORM_TIMEOUT: '7500ms',
	ASSETS_INVALID_IMAGE_SENSITIVITY_LEVEL: 'warning',

	IP_TRUST_PROXY: true,
	IP_CUSTOM_HEADER: false,

	IMPORT_IP_DENY_LIST: ['0.0.0.0', '169.254.169.254'],

	SERVE_APP: true,

	RELATIONAL_BATCH_SIZE: 25000,

	EXPORT_BATCH_SIZE: 5000,

	FILE_METADATA_ALLOW_LIST: 'ifd0.Make,ifd0.Model,exif.FNumber,exif.ExposureTime,exif.FocalLength,exif.ISO',

	GRAPHQL_INTROSPECTION: true,

	WEBSOCKETS_ENABLED: false,
	WEBSOCKETS_REST_ENABLED: true,
	WEBSOCKETS_REST_AUTH: 'handshake',
	WEBSOCKETS_REST_AUTH_TIMEOUT: 10,
	WEBSOCKETS_REST_PATH: '/websocket',
	WEBSOCKETS_GRAPHQL_ENABLED: true,
	WEBSOCKETS_GRAPHQL_AUTH: 'handshake',
	WEBSOCKETS_GRAPHQL_AUTH_TIMEOUT: 10,
	WEBSOCKETS_GRAPHQL_PATH: '/graphql',
	WEBSOCKETS_HEARTBEAT_ENABLED: true,
	WEBSOCKETS_HEARTBEAT_PERIOD: 30,

	FLOWS_ENV_ALLOW_LIST: false,
	FLOWS_RUN_SCRIPT_MAX_MEMORY: 32,
	FLOWS_RUN_SCRIPT_TIMEOUT: 10000,

	PRESSURE_LIMITER_ENABLED: true,
	PRESSURE_LIMITER_SAMPLE_INTERVAL: 250,
	PRESSURE_LIMITER_MAX_EVENT_LOOP_UTILIZATION: 0.99,
	PRESSURE_LIMITER_MAX_EVENT_LOOP_DELAY: 500,
	PRESSURE_LIMITER_MAX_MEMORY_RSS: false,
	PRESSURE_LIMITER_MAX_MEMORY_HEAP_USED: false,
	PRESSURE_LIMITER_RETRY_AFTER: false,

	FILES_MIME_TYPE_ALLOW_LIST: '*/*',
} as const;