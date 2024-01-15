import { Prisma } from '@prisma/client';

const shortenPrismaMessage = (message: string): string => {
  const shortMessage = message.substring(message.indexOf('→'));
  return shortMessage
    .substring(shortMessage.indexOf('\n'))
    .replace(/\n/g, '')
    .trim();
};

export const PrimsaFriendlyErrorMessage = (
  exception: Prisma.PrismaClientKnownRequestError,
) => {
  let message = exception.message || 'Error occured';
  let httpCode = 500;

  if (exception.code === 'P2002') {
    const field = (<[]>exception.meta.target).join('.');
    message = `Duplicate entry in [${field}] is not allowed.`;
  } else if (exception.code === 'P2025') {
    httpCode = 404;
  } else {
    message = shortenPrismaMessage(exception.message);
  }
  return { message, httpCode };
};
