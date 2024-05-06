import express from 'express';
import cors from 'cors';
import morgan from './helpers/morgan.js';
import * as Sentry from './helpers/sentry.ee.js';
import appAssetsHandler from './helpers/app-assets-handler.js';
import errorHandler from './helpers/error-handler.js';
import { orm } from './config/orm.js';
import { createBullBoardHandler, serverAdapter } from './helpers/create-bull-board-handler.js';
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
});

const urlencodedParser = express.urlencoded({
  extended: true,
  limit: requestBodySizeLimit,
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
});

app.use(jsonParser);
app.use(urlencodedParser);

app.use(cors(corsOptions));

configurePassport(app);

app.use('/', router);

createBullBoardHandler(serverAdapter);
injectBullBoardHandler(app, serverAdapter);

appAssetsHandler(app);

webUIHandler(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

Sentry.attachErrorHandler(app);

app.use(errorHandler);

export default app;
