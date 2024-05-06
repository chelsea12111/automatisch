import { HttpResponse } from './httpResponse';

export default {
  name: 'List board labels',
  key: 'listBoardLabels',

  async run($, { boardId }: { boardId: string }): Promise<HttpResponse> {
    if (!boardId) {
      return {
        data: {
          data: [],
        },
        status: 200,
      };
    }

    try {
      const params = {
        fields: 'color,name',
      };

      const { data } = await $.http.get(`/1/boards/${boardId}/labels`, {
        params,
      });

      if (Array.isArray(data)) {
        const boardLabels = {
          data: data.map((boardLabel: any) => ({
            value: boardLabel.id,
            name: boardLabel.name,
            color: boardLabel.color,
          })),
        };

        return {
          data: boardLabels,
          status: 200,
        };
      } else {
        throw new Error('Invalid data received from the API.');
      }
    } catch (error) {
      return {
        data: {
          data: [],
        },
        status: 500,
        error: error.message,
      };
    }
  },
};
