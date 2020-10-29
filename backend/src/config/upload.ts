import multer, { Options } from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
  },
  fileFilter: (request, file, cb) => {
    const mimeTypes = [
      'image/jpeg',
      'image/png'
    ];

    if (!mimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
} as Options;