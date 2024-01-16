import { DynamicModule, Global, Module } from '@nestjs/common';
import { RumsanAppController } from './app.controller';
import { RSERRORS, RSError } from './exceptions';

type ControllerFunction = () => any;

export const ConstantControllers: { [key: string]: ControllerFunction } = {
  errors: RSERRORS.list,
};

export const getConstantController = (name: string) => {
  name = name.toLowerCase();
  if (ConstantControllers[name] === undefined)
    throw new RSError(
      `Constant controller named [${name}] has not been registered.`,
      'RS_CORE:NO_CONSTANT_CONTROLLER',
    );
  return ConstantControllers[name]();
};

const addConstantController = (controllers: {
  [key: string]: ControllerFunction;
}) => {
  Object.keys(controllers).forEach((key) => {
    ConstantControllers[key.toLowerCase()] = controllers[key];
  });
};

@Global()
@Module({})
export class RumsanAppModule {
  static forRoot(options?: {
    controllers?: { [key: string]: ControllerFunction };
  }): DynamicModule {
    const { controllers } = options || {};
    addConstantController(controllers || {});

    return {
      module: RumsanAppModule,
      controllers: [RumsanAppController],
      providers: [
        {
          provide: 'AppConstantControllers',
          useValue: ConstantControllers,
        },
      ],
      exports: ['AppConstantControllers'],
    };
  }
}
