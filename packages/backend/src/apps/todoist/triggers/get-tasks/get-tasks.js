import type { HttpRequestParams } from './types';

const getActiveTasks = async ($: { http: { get: <T>(url: string, params?: HttpRequestParams) => Promise<T> } }): Promise<void> => {
  const validateParams = (params: any) => {
    if (!params.projectId || !params.sectionId) {
      throw new Error('projectId and sectionId are required parameters');
    }
  };

  const params = {
    project_id: $.step.parameters.projectId?.trim(),
    section_id: $.step.parameters.sectionId?.trim(),
    label: $.step.parameters.label?.trim(),
    filter: $.step.parameters.filter?.trim(),
  };

  validateParams(params);

  try {
    const response = await $.http.get('/tasks', { params });

    if (response.data && Array.isArray(response.data)) {
      response.data.sort((a, b) => {
        return b.id - a.id;
      });

      response.data.map((task: any) => {
        $.pushTriggerItem({
          raw: task,
          meta: {
            internalId: task.id,
          },
        });
      });
    } else {
      console.warn('No tasks found in the response');
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export default getActiveTasks;
