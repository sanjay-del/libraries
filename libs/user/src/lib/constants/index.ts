const namespace = 'rumsan_user';
const withNamespace = (str: string) => `${namespace}.${str}`;

export const ACTIONS = {
  MANAGE: 'manage',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
};

export const SUBJECTS = {
  ALL: 'all',
  USER: 'user',
  STORY: 'story',
  ROLE: 'role',
  PERMISSION: 'permission',
};

export const EMAIL_TEMPLATES = {
  LOGIN: 'login',
};

export const EVENTS = {
  OTP_CREATED: withNamespace(`otp_created`),
};

export const APP = {
  JWT_BEARER: 'JWT',
};
