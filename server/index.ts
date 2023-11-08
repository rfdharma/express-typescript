import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import carsRoutes from '../routes/carRoutes';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/resources/views'));


app.use(express.json());
// app.use('/assets', express.static(__dirname + '/resources'));

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server + hellow');
});

app.use('/', carsRoutes);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
