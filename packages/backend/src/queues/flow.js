import { Queue } from 'bullmq';
import redisConfig from '../config/redis.js';
import logger from '../helpers/logger.js';
import { exit } from 'process';

const CONNECTION_REFUSED = 'ECONNREFUSED';

const createQueue = (queueName) => {
  const redisConnection = {
    connection: redisConfig,
  };

  const queue = new Queue(queueName, redisConnection);

  queue.on('error', (error) => {
    if (error.code === CONNECTION_REFUSED) {
      logger.error(
        `Make sure Redis is installed and running. Error in queue '${queueName}':`,
        error
      );

      exit(1);
    }

    logger.error(`Error happened in queue '${queueName}':`, error);
  });

  return queue;
};

const flowQueue = createQueue('flow');

process.on('SIGTERM', async () => {
  await flowQueue.close();
  exit(0);
});

export default flowQueue;
