import { json as jsonParser } from 'body-parser';
import express from 'express';
import 'reflect-metadata';
import CarsController from './controllers/CarsController';
import GreetingsController from './controllers/GreetingsController';

const app = express();

app.use(jsonParser());

const port = 3000;

new GreetingsController().mount(app);
new CarsController().mount(app);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
