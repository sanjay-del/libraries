import { RSError } from '@rumsan/core';

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

export const EVENTS = {
  OTP_CREATED: 'rsu.otp_created',
};

export const APP = {
  JWT_BEARER: 'JWT',
};

export const RSERRORS_USER = {
  RSUSER_TEST: new RSError('cool', 'RSUSER_TEST', 403),
};
