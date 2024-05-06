// import the default export from each module
import Calendar from './new-calendar/index.js';
import Event from './new-event/index.js';

// re-export them as an object using named exports
const components = {
  Calendar,
  Event,
};

export default components;


// Import all components as an object
import ComponentLibrary from './ComponentLibrary.js';

// Use the Calendar component
const Calendar = ComponentLibrary.Calendar;

// Or import just the Event component by name
import { Event } from './ComponentLibrary.js';
