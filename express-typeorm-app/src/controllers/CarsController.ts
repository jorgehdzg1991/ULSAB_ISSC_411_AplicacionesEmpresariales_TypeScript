import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FindCarTask from '../tasks/cars/FindCarTask';
import CreateCarTask from '../tasks/cars/CreateCarTask';
import Controller from './Controller';
import NotFoundException from '../exceptions/NotFoundException';

export default class CarsController extends Controller {
  constructor() {
    super('/cars');
  }

  protected initializeRouter(): void {
    this.router.get('/:id', CarsController.findCar);
    this.router.post('/', CarsController.createCar);
  }

  private static async findCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const task = new FindCarTask(id);

      const car = await task.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (e) {
      if (e instanceof NotFoundException) {
        CarsController.respond(res, StatusCodes.NOT_FOUND);
      } else {
        console.error(e);
        CarsController.respond(res, StatusCodes.INTERNAL_SERVER_ERROR);
      }
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
    } catch (e) {
      console.error(e);
      CarsController.respond(res, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
