import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { check, validationResult, ValidationChain } from 'express-validator';
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
    const bodyValidation = CarsController.getBodyValidation();

    this.router.get('/:id', CarsController.findCar);
    this.router.get('/', CarsController.listCars);
    this.router.post('/', bodyValidation, CarsController.createCar);
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
      const result = validationResult(req);

      if (!result.isEmpty()) {
        CarsController.respond(res, StatusCodes.BAD_REQUEST, {
          errors: result.array(),
        });

        return;
      }

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

  private static getBodyValidation(): ValidationChain[] {
    return [
      check('brand')
        .exists()
        .withMessage('"brand" was missing in the request body')
        .isString()
        .withMessage('"brand" must be a string'),
      check('model')
        .exists()
        .withMessage('"model" was missing in the request body')
        .isString()
        .withMessage('"model" must be a string'),
      check('submodel')
        .optional()
        .isString()
        .withMessage('"submodel" must be a string'),
      check('year')
        .exists()
        .withMessage('"year" was missing in the request body')
        .isNumeric()
        .withMessage('"year" must be a number'),
    ];
  }
}
