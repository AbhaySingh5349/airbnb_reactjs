import express from 'express';

import {
  uploadPhotoByLink,
  uploadPhotoFromSystem,
  addNewAccomodation,
} from '../controllers/index';

import {
  photosMiddleware,
  verifyToken,
  validateAccomodationInput,
} from '../middlewares/index';

const router = express.Router();

router.post('/upload-photo-by-link', uploadPhotoByLink);
router.post(
  '/upload-photo-from-system',
  photosMiddleware.array('photos', 10),
  uploadPhotoFromSystem
);
router.post(
  '/add-new-accomodation',
  verifyToken,
  validateAccomodationInput,
  addNewAccomodation
);

export { router };
