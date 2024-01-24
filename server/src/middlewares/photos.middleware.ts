import path from 'path';
import multer from 'multer';

/*
const photosMiddleware = multer({
  dest: path.join(__dirname, '..', '..', 'images'),
});
*/

// for s3
const photosMiddleware = multer({
  dest: path.join(__dirname, '..', '..', 'temp_images'),
});

export { photosMiddleware };
