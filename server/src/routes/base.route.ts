import express from 'express';

import { getAllAccomodations } from '../controllers';

const router = express.Router();

router.get('/', getAllAccomodations);

export { router };
