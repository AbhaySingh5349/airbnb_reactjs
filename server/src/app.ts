import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import path from 'path';

// router
import { router } from './routes/index';
import { errorHandler } from './middlewares/index';
import { NotFoundError } from './errors/index';
import { node_env } from './config/env';
import { verifyToken } from './middlewares/index';
import { CustomRequest } from './types';

const app = express();

app.use(express.json()); // to parse json data of post requests
app.use(cors({ credentials: true, origin: process.env.SERVER_BASE_URL })); // (client port) allow external url server to hit requests on client
app.use(
  cookieSession({
    signed: false, // since JWT is already encrypted, so we disable encryption on cookie
    secure: node_env === 'production', // allow HTTPS connection for prod (cookies will be used if user visiting app on HTTPS connection)
  })
);
app.use(cookieParser());

// to make get request to view image: http://localhost:8080/image-uploads/{image_name}
app.use(
  '/image-uploads',
  express.static(path.join(__dirname, '..', '/images'))
);

/*

app.use((req, res, next) => {
  console.log('cookies: ', req.cookies);
  next();
});

o/p => 
cookies:  {
  jwt_access_cookie: {
    value: 'abcd..',
    issuedAt: '2024-01-03T11:02:46.305Z',
    expires: '2024-01-03T11:03:46.306Z'
  },
  session: 'def...'     
}
*/

app.get('/test', verifyToken, (req: CustomRequest, res: Response) => {
  return res.send(`airbnb server: ${req.currentUser}`);
});

app.use('/', router);

app.all('*', (req, res) => {
  throw new NotFoundError(`Route Not found ${req.path}`);
});

app.use(errorHandler);

export { app };
