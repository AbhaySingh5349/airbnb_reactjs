import express, { Request, Response } from 'express';
import cors from 'cors';

// router
import { router } from './routes/index';

const app = express();

app.use(express.json()); // to parse json data of post requests
app.use(cors()); // allow external url server to hit requests on client

app.get('/test', (req: Request, res: Response) => {
  return res.send('airbnb server');
});

app.use('/', router);

export { app };
