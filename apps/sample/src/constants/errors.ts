import { RSError } from '@rumsan/core';

export const ERRORS = {
  SSS_NO_MATCH_IP: new RSError(
    'SSS IP address does not match',
    'NO_MATCH_IP',
    403,
  ),
};
