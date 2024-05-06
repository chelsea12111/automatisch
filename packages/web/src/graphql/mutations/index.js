import createConnection from './create-connection';
import updateConnection from './update-connection';
import verifyConnection from './verify-connection';
import resetConnection from './reset-connection';
import deleteConnection from './delete-connection';
import generateAuthUrl from './generate-auth-url';

const mutations = {
  createConnection,
  updateConnection,
  verifyConnection,
  resetConnection,
  deleteConnection,
  generateAuthUrl,
};

export default mutations;
