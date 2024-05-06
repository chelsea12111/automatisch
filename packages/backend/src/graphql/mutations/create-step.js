import App from '../../models/app.js';
import Flow from '../../models/flow.js';

const checkAppAndAction = async (appKey, key) => {
  if (appKey && key) {
    await App.checkAppAndAction(appKey, key);
  }

  if (appKey && !key) {
    await App.findOneByKey(appKey);
  }
};

const getFlowQuery = (currentUser, isCreator) =>
  isCreator
    ? currentUser.$relatedQuery('flows')

