import express, { Request, Response } from 'express';
import cors from 'cors';

// router
import { router } from './routes/index';
import { errorHandler } from './middlewares/index';
import { NotFoundError } from './errors/index';

const app = express();

app.use(express.json()); // to parse json data of post requests
app.use(cors()); // allow external url server to hit requests on client

app.get('/test', (req: Request, res: Response) => {
  return res.send('airbnb server');
});

app.use('/', router);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
