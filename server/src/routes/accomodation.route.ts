import express from 'express';

import {
  uploadPhotoByLink,
  uploadPhotoFromSystem,
  addNewAccomodation,
  updateAccomodation,
  getMyAccomodations,
  getAccomodationById,
} from '../controllers';

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
router.post('/', verifyToken, validateAccomodationInput, addNewAccomodation);

router.put('/', verifyToken, validateAccomodationInput, updateAccomodation);

router.get('/', verifyToken, getMyAccomodations);
router.get('/:accomodationId', verifyToken, getAccomodationById);

export { router };
