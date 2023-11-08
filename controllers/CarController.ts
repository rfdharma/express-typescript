import { Request, Response } from 'express';
import Car from '../models/CarModel'; // Import your CarModel
import {v2 as cloudinary} from 'cloudinary';

export const getCars = async (req: Request, res: Response) => {
    try {
        const cars = await Car.query();
        res.render('index', { cars });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the database.');
    }
};

export const getCreateCarForm = (req: Request, res: Response) => {
    res.render('create');
};

export const createCar = async (req: Request, res: Response) => {
    try {
        const { name, price, size } = req.body as Car;
        const imageFile = req.file;

        if (imageFile) {
            // Convert the image data to base64
            const fileBase64 = imageFile.buffer.toString('base64');

            // Upload the base64 image data to Cloudinary
            const result = await cloudinary.uploader.upload(`data:${imageFile.mimetype};base64,${fileBase64}`);

            // Get the URL of the uploaded image from Cloudinary
            const image = result.secure_url;

            // Save the car information and the Cloudinary image URL to the database
            const newCar = await Car.query().insert({
                name,
                price,
                size,
                image, // Save the Cloudinary image URL in the database
            });

            res.status(201).json(newCar);
        } else {
            res.status(400).json({ message: 'No image file uploaded.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan mobil.' });
    }
};




export const renderUpdateCarPage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await Car.query().findById(id);

        if (car) {
            res.render('update', { car }); // Render the 'update.ejs' page with car data
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading the edit page.');
    }
};

export const updateCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, size } = req.body as Car;
        const imageFile = req.file; // Get the uploaded image file

        if (imageFile) {
            // Convert the image data to base64
            const fileBase64 = imageFile.buffer.toString('base64');

            // Upload the base64 image data to Cloudinary
            const result = await cloudinary.uploader.upload(`data:${imageFile.mimetype};base64,${fileBase64}`);

            // Get the URL of the uploaded image from Cloudinary
            const image = result.secure_url;

            // Update the car information and the Cloudinary image URL in the database
            await Car.query().findById(id).patch({
                name,
                price,
                size,
                image, // Save the Cloudinary image URL in the database
            });

            res.redirect('/cars'); // Redirect to the list of cars after updating
        } else {
            // If no new image is uploaded, update only car information
            await Car.query().findById(id).patch({
                name,
                price,
                size,
            });

            res.redirect('/cars'); // Redirect to the list of cars after updating
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating the car.');
    }
};



// Delete a car
export const deleteCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Car.query().deleteById(id);
        res.redirect('/cars');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the car.');
    }
};

