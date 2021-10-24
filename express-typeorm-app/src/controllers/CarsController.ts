import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Controller from './Controller';
import FindCarTask from '../tasks/cars/FindCarTask';
import ListCarsTask from '../tasks/cars/ListCarsTask';
import CreateCarTask from '../tasks/cars/CreateCarTask';
import NotFoundException from '../exceptions/NotFoundException';

export default class CarsController extends Controller {
  constructor() {
    super('/cars');
  }

  protected initializeRouter(): void {
    this.router.get('/:id', CarsController.findCar);
    this.router.get('/', CarsController.listCars);
    this.router.post('/', CarsController.createCar);
  }

  private static async findCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const task = new FindCarTask(id);

      const car = await task.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (error) {
      if (error instanceof NotFoundException) {
        CarsController.respond(res, StatusCodes.NOT_FOUND);
      } else {
        CarsController.sendUnknownErrorResponse(res, <Error>error);
      }
    }
  }

  private static async listCars(req: Request, res: Response): Promise<void> {
    try {
      const task = new ListCarsTask();

      const cars = await task.execute();

      CarsController.respond(res, StatusCodes.OK, cars);
    } catch (error) {
      CarsController.sendUnknownErrorResponse(res, <Error>error);
    }
  }

  private static async createCar(req: Request, res: Response): Promise<void> {
    try {
      const { brand, model, submodel, year } = req.body;

      const task = new CreateCarTask(
        <string>brand,
        <string>model,
        <string>submodel,
        <number>year
      );

      const newCar = await task.execute();

      CarsController.respond(res, StatusCodes.OK, newCar);
    } catch (error) {
      CarsController.sendUnknownErrorResponse(res, <Error>error);
    }
  }
}
