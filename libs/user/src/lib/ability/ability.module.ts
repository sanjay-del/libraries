import { DynamicModule, Global, Module } from '@nestjs/common';
import { SUBJECTS } from '../constants';
import { AbilitySubject } from './ability.subjects';

@Global()
@Module({})
export class AbilityModule {
  static forRoot(options?: {
    subjects?: { [key: string]: string };
  }): DynamicModule {
    const { subjects } = options || {};
    AbilitySubject.add(subjects || {});

    return {
      module: AbilityModule,
      providers: [
        {
          provide: 'SUBJECTS',
          useValue: SUBJECTS,
        },
      ],
      exports: ['SUBJECTS'],
    };
  }
}
