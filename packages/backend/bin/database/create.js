import { createDatabaseAndUser } from './utils.js';

async function main() {
  try {
    await createDatabaseAndUser();
    console.log('Database and user created successfully');
  } catch (error) {
    console.error('Error creating database and user:', error);
  }
}

main();

