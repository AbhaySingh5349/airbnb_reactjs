import { Request, Response } from 'express';

import { catchAsync } from '../middlewares';
import { Accomodation } from '../models';

const getAllAccomodations = catchAsync(async (req: Request, res: Response) => {
  const accomodations = await Accomodation.find({});

  return res.json({ accomodations });
});

export { getAllAccomodations };
