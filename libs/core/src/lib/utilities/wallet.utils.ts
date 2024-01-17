import { v4 as uuidv4 } from 'uuid';
import { getUnixTimestamp } from './date.utils';
import { CryptoUtils } from './index';

export interface ChallengeInput {
  address?: string;
  clientId?: string;
  ip?: string;
}

export interface ChallengePayload {
  clientId: string;
  ip: string | null;
  timestamp: number;
  address: string | null;
}

const ERRORS = {
  NO_SECRET: 'WalletUtils: Must send secret in to generate challenge data.',
  EXPIRED: 'WalletUtils: Challenge has expired.',
};

export function createChallenge(secret: string, data: ChallengeInput) {
  if (!secret) throw new Error(ERRORS.NO_SECRET);

  const payload: ChallengePayload = {
    clientId: data.clientId || uuidv4(),
    timestamp: getUnixTimestamp(),
    ip: data.ip || null,
    address: data.address || null,
  };

  //convert payload to array
  const payloadArray = [
    payload.clientId,
    payload.timestamp,
    payload.ip,
    payload.address,
  ];

  return {
    clientId: payload.clientId,
    ip: data.ip,
    challenge: CryptoUtils.encrypt(JSON.stringify(payloadArray), secret),
  };
}

export function decryptChallenge(
  secret: string,
  challenge: string,
  validationDurationInSeconds: number = 300,
): ChallengePayload {
  if (!secret) throw new Error(ERRORS.NO_SECRET);

  const [clientId, timestamp, ip, address] = JSON.parse(
    CryptoUtils.decrypt(challenge, secret),
  );
  const payload: ChallengePayload = {
    clientId,
    timestamp,
    ip,
    address,
  };

  if (payload.timestamp + validationDurationInSeconds < getUnixTimestamp())
    throw new Error(ERRORS.EXPIRED);

  return payload;
}
