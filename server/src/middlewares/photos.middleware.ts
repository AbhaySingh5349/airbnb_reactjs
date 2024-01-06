import path from 'path';
import multer from 'multer';

const photosMiddleware = multer({
  dest: path.join(__dirname, '..', '..', 'images'),
});

export { photosMiddleware };
