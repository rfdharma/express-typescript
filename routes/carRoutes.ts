import express from 'express';
import { getCars, getCreateCarForm, createCar, renderUpdateCarPage, updateCar, deleteCar } from '../controllers/CarController'; // Import the updateCar controller function
import upload from '../middleware/upload';

const router = express.Router();

// Get all cars
router.get('/cars', getCars);

// Render the form for creating a new car
router.get('/cars/create', getCreateCarForm);

// Create a new car
router.post('/cars/create', upload.single('image'), createCar);

// Render the form for updating a car (Note: Use a GET request for the update form)
router.get('/cars/:id/edit', renderUpdateCarPage);

router.post('/cars/:id', upload.single('image'), updateCar);

// Delete a car
router.post('/cars/:id/delete', deleteCar);

export default router;
