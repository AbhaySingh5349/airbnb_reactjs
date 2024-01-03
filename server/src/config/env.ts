import * as dotenv from 'dotenv';
dotenv.config();

const node_env = process.env.NODE_ENV;
const port = process.env.PORT;
const db_url = process.env.MONGO_DB_URL;
const db_password = process.env.MONGO_DB_PASSWORD;
const jwt_obj = {
  secret: process.env.JWT_SECRET,
  accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
};

export { node_env, port, db_url, db_password, jwt_obj };
