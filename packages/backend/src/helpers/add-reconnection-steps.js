import cloneDeep from 'lodash/cloneDeep';
import {
  AuthStep,
  AuthStepArgument,
  AuthStepProperties,
  ConnectionIdArgument,
} from './types';

const connectionIdArgument: ConnectionIdArgument = {
  name: 'id',
  value: '{connection.id}',
};

const resetConnectionStep = {
  type: 'mutation',
  name: 'resetConnection',
  arguments: [connectionIdArgument],
};

function replaceCreateConnection(string: string) {
  return string.replace(/{createConnection\.id}/g, '{connection.id}');
}

function removeAppKeyArgument(args: AuthStepArgument[]) {
  return args.filter((argument) => argument.name !== 'key');
}

function addConnectionId(step: AuthStep): AuthStep {
  return {
    ...step,
    arguments: step.arguments.map((argument) => {
      if (typeof argument.value === 'string') {
        argument.value = replaceCreateConnection(argument.value);
      }

      if (argument.properties) {
        argument.properties = argument.properties.map((property: AuthStepProperties) => ({
          ...property,
          value: replaceCreateConnection(property.value),
        }));
      }

      return argument;
    }),
  };
}

function replaceCreateConnectionsWithUpdate(steps: AuthStep[]): AuthStep[] {
  const updatedSteps = cloneDeep(steps);
  return updatedSteps.map((step) => {
    const updatedStep = addConnectionId(step);

    if (step.name === 'createConnection') {
      return {
        ...updatedStep,
        name: 'updateConnection',
        arguments: removeAppKeyArgument(updatedStep.arguments),
        arguments: [connectionIdArgument, ...updatedStep.arguments],
      };
    }

    return updatedStep;
  });
}

function addReconnectionSteps(app: any) {
  const hasReconnectionSteps = app.auth.reconnectionSteps;

  if (hasReconnectionSteps) return app;

  if (app.auth.authenticationSteps) {
    const updatedSteps = replaceCreateConnectionsWithUpdate(
      app.auth.authenticationSteps
    );

    app.auth.reconnectionSteps = [resetConnectionStep, ...updatedSteps];
  }

  if (app.auth.sharedAuthenticationSteps) {
    const updatedStepsWithEmbeddedDefaults = replaceCreateConnectionsWithUpdate(
      app.auth.sharedAuthenticationSteps
    );

    app.auth.sharedReconnectionSteps = [
      resetConnectionStep,
      ...updatedStepsWithEmbeddedDefaults,
    ];
  }

  return app;
}

export default addReconnectionSteps;
