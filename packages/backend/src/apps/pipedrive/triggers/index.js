// import individual modules instead of the default export
import * as newActivities from './new-activities/index.js';
import * as newDeals from './new-deals/index.js';
import * as newLeads from './new-leads/index.js';
import * as newNotes from './new-notes/index.js';

// create an array of the imported modules
const modules = [newActivities, newDeals, newLeads, newNotes];

// export the array using a named export
export { modules };

