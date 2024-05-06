import { renderObject } from '../../../../helpers/renderer.js';
import App from '../../../../models/app.js';
import paginateRest from '../../../../helpers/pagination-rest.js';

export default async (request, response) => {
  try {
    // Finding the app by its key
    const app = await App.findOneByKey(request.params.appKey);

    // Checking if the user is authorized for any flows related to the app
    if (!request.currentUser.authorizedFlows.some((flow) => flow.steps.some((step) => step.app_key === app.key)))) {
      response.status(403).send('User is not authorized for any flows related to this app.');
      return;
    }

    // Querying the flows related to the app and the authorized user
    const flowsQuery = request.currentUser.authorizedFlows
      .clone()
      .joinRelated({
        steps: true,
      })
      .withGraphFetched({
        steps: true,
      })
      .where('steps.app_key', app.key)
      .orderBy('active', 'desc')
      .orderBy('updated_at', 'desc');

    // Paginating the results
    const flows = await paginateRest(flowsQuery, request.query.page);

    // Rendering the response
    renderObject(response, flows);
  } catch (error) {
    // Handling any errors that might occur during the process
    console.error(error);
    response.status(500).send('An error occurred while fetching the data.');
  }
};
