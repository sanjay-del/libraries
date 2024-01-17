import { RSError } from '@rumsan/core';

export const ERRORS_RSUSER = {
  ROLE_NAME_INVALID: new RSError(
    'Invalid characters in role name.',
    'ROLE_NAME_INVALID',
    400,
  ),
};
