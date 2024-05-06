// Import individual modules instead of the default export
import newTickets from './new-tickets/index';
import newUsers from './new-users/index';

// Create a new object using the spread operator
// to include the imported modules
const modules = {
  newTickets,
  newUsers,
};

// Export the object as the default export
export default modules;

