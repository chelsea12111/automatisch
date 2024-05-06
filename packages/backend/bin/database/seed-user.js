import { createUser } from './utils.js';

const username = prompt('Enter your username:');

if (!username || username.length < 3 || username.length > 30) {
  alert('Username must be between 3 and 30 characters long.');
  return;
}

createUser(username)
  .then((user) => {
    alert(`User ${user.username} created with ID ${user.id}`);
  })
  .catch((error) => {
    if (error.name === 'ValidationError') {
      alert(error.message);
    } else {
      alert('An unexpected error occurred. Please try again later.');
      console.error(error);
    }
  });

