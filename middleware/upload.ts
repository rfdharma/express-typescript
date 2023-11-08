// import multer, { StorageEngine } from 'multer';
// import path from 'path';
// import { Request, Express, Router } from 'express';
//
// const uploadsDirectory: string = '/home/dharma/exercise_2/storage/image-cars';
//
// // Mendefinisikan cara menyimpan file
// const storage: StorageEngine = multer.diskStorage({
//     destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//         cb(null, uploadsDirectory);
//     },
//     filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//         const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });
//
// // Membuat middleware untuk upload
// const upload: multer.Multer = multer({ storage: storage });
//
// export default upload;

import multer, { StorageEngine } from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dguyyz3rj',
    api_key: '332615693959727',
    api_secret: 'AJoAkNpG2CGSg_aUaBZ8wr9OFoM',
    timeout: 60000,
});

// Konfigurasi penyimpanan Cloudinary
const storage: StorageEngine = multer.memoryStorage(); // Menggunakan memory storage untuk mengunggah file ke Cloudinary

// Membuat middleware untuk upload
const upload: multer.Multer = multer({ storage: storage });

export default upload;
