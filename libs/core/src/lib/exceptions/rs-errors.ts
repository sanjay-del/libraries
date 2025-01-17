export class RSError extends Error {
  public httpCode: number;
  public type: string;
  constructor(
    message: string,
    name = 'UNKNOWN',
    httpCode = 500,
    type = 'RSERROR',
  ) {
    super(message);
    this.name = name?.toUpperCase() || 'UNKNOWN';
    this.httpCode = httpCode || 500;
    this.type = type?.toUpperCase() || 'RSERROR';
  }
}

export const ERRORS: any = {
  register: (errors: { [key: string]: RSError }) => {
    Object.keys(errors).forEach((key) => {
      ERRORS[key] = errors[key];
    });
  },
  list: () => {
    const result: {
      [key: string]: {
        name: string;
        message: string;
        type: string;
        httpCode: number;
      };
    } = {};
    Object.keys(ERRORS).forEach((key) => {
      if (typeof ERRORS[key] === 'function') return;
      result[key] = {
        name: ERRORS[key].name,
        message: ERRORS[key].message,
        type: ERRORS[key].type,
        httpCode: ERRORS[key].httpCode,
      };
    });
    return result;
  },

  NO_MATCH_IP: new RSError('IP address does not match', 'NO_MATCH_IP', 403),
  NO_MATCH_OTP: new RSError('OTP does not match', 'NO_MATCH_OTP', 403),

  NOT_JSON: new RSError('Invalid JSON string', 'NOT_JSON', 400),
  NOT_IMPLEMENTED: new RSError('Not implemented', 'NOT_IMPLEMENTED', 501),
};
