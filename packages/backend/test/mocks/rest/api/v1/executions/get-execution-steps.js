import { ExecutionStep, Step } from './types'; // Assuming these types are defined in a separate file

const getExecutionStepsMock = async (
  executionSteps: ExecutionStep[],
  steps: Step[],
): Promise<{ data: typeof executionSteps; meta: { count: number; currentPage: number; isArray: true; totalPages: number; type: 'ExecutionStep'; name: string } }> => {
  const data = executionSteps.map((executionStep) => {
    const step = steps.find((step) => step.id === executionStep.stepId);

    if (!step) {
      throw new Error(`Step with id ${executionStep.stepId} not found`);
    }

    return {
      id: executionStep.id,
      dataIn: executionStep.dataIn,
      dataOut: executionStep.dataOut,
      errorDetails: executionStep.errorDetails,
      status: executionStep.status,
      createdAt: executionStep.createdAt.getTime(),
      updatedAt: executionStep.updatedAt.getTime(),
      step: {
        id: step.id,
        type: step.type,
        key: step.key,
        appKey: step.appKey,
        iconUrl: step.iconUrl,
        webhookUrl: step.webhookUrl,
        status: step.status,
        position: step.position,
        parameters: step.parameters,
      },
    };
  });

  return {
    data,
    meta: {
      count: executionSteps.length,
      currentPage: 1,
      isArray: true,
      totalPages: 1,
      type: 'ExecutionStep',
      name: 'getExecutionStepsMock',
    },
  };
};

export default getExecutionStepsMock;
