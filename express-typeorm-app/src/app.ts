import express from 'express';
import { json as jsonParser } from 'body-parser';
import 'reflect-metadata';
import CarsController from './controllers/CarsController';
import GreetingsController from './controllers/GreetingsController';

const app = express();

app.use(jsonParser());

new GreetingsController().mount(app);
new CarsController().mount(app);

export default app;
