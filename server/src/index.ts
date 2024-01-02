import { app } from './app';

import { port } from './config/env';
import { connectToMongoDB } from './config/mongodb';

app.listen(port, () => {
  console.log(`Server successfully started on port: ${port}`);

  if (!process.env.MONGO_DB_URL)
    throw new Error('tickets mongo_uri variable not defined');
  connectToMongoDB();
});
