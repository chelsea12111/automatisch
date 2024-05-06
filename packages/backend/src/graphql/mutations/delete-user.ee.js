import { Duration } from 'luxon';
import User from '../../models/user.js';
import deleteUserQueue from '../../queues/delete-user.ee.js';

const deleteUser = async (_parent, { input: { id } }, context) => {
  // Check if the user has permission to delete a user
  context.currentUser.can('delete', 'User');

  // Delete the user from the database
  await User.query().deleteById(id);

  // Schedule a job to delete the user's data after 30 days
  const jobName = `Delete user - ${id}`;
  const jobPayload = { id };
  const millisecondsFor30Days = Duration.fromObject({ days: 30 }).toMillis();
  const jobOptions = {
    delay: millisecondsFor30Days,
  };

  await deleteUserQueue.add(jobName, jobPayload, jobOptions);

  return true;
};

export default deleteUser;
