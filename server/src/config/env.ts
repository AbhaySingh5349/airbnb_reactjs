import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const db_url = process.env.MONGO_DB_URL;
const db_password = process.env.MONGO_DB_PASSWORD;

export { port, db_url, db_password };
