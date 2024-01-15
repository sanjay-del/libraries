export class RSError extends Error {
  public httpCode: number;
  public type: string;
  constructor(
    message: string,
    name = 'UNKNOWN',
    httpCode = 500,
    type = 'UNKNOWN',
  ) {
    super(message);
    this.name = name?.toUpperCase() || 'UNKNOWN';
    this.httpCode = httpCode || 500;
    this.type = type?.toUpperCase() || 'UNKNOWN';
  }
}

export const ERRORS = {
  NOT_JSON: new RSError('Invalid JSON string', 'NOT_JSON', 400, 'validation'),
};
