export * from './errors';
export * from './events';

// For Ability Guard
export const ACTIONS = {
  MANAGE: 'manage',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
};

// For Ability Guard
export const SUBJECTS: any = {
  ALL: 'all',
  USER: 'rsu.user',
  ROLE: 'rsu.role',
  PERMISSION: 'rsu.permission',
};

export const APP = {
  JWT_BEARER: 'JWT',
};
