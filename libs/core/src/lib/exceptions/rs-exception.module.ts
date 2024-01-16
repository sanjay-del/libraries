import { DynamicModule, Global, Module } from '@nestjs/common';
import { RSERRORS, RSError } from './rs-errors';

@Global()
@Module({})
export class RSExceptionModule {
  static forRoot(options?: {
    errorSet?: { [key: string]: RSError };
  }): DynamicModule {
    const { errorSet } = options || {};
    RSERRORS.register(errorSet || {});

    return {
      module: RSExceptionModule,
      providers: [
        {
          provide: 'ERRORS',
          useValue: RSERRORS,
        },
      ],
      exports: ['ERRORS'],
    };
  }
}
