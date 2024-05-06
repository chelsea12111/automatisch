import express from 'express';
import cors from 'cors';
import morgan from './helpers/morgan.js';
import * as Sentry from './helpers/sentry.ee.js';
import appAssetsHandler from './helpers/app-assets-handler.js';
import errorHandler from './helpers/error-handler.js';
import { orm } from './config/orm.js';
import { createBullBoard, BullAdapter } from 'bull-board';
import { registerAdapter } from 'bull-board/registerAdapter';
import configurePassport from './helpers/passport.js';
import router from './routes/index.js';

const { requestBodySizeLimit } = await import('./config/app.js');
const corsOptions = { origin: '*' };

const app = express();

Sentry.init(app);

Sentry.attachRequestHandler(app);
Sentry.attachTracingHandler(app);

app.use(morgan);

const jsonParser = express.json({
  limit: requestBodySizeLimit,
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}).on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Error parsing JSON');
});

const urlencodedParser = express.urlencoded({
  extended: true,
  limit: requestBodySizeLimit,
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}).on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Error parsing URL-encoded data');
});

app.use(jsonParser);
app.use(urlencodedParser);

app.use(cors(corsOptions));

configurePassport(app);

app.use('/', router);

const serverAdapter = new BullAdapter();
createBullBoard(serverAdapter);
registerAdapter(serverAdapter);
injectBullBoardHandler(app, serverAdapter);

appAssetsHandler(app);

const noMatchHandler = (req, res) => {
  res.status(404).send('Page not found');
};

app.use(noMatchHandler);

Sentry.attachErrorHandler(app);

app.use(errorHandler);

export default app;

