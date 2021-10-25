import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { check, validationResult, ValidationChain } from 'express-validator';
import Controller from './Controller';
import FindCarTask from '../tasks/cars/FindCarTask';
import ListCarsTask from '../tasks/cars/ListCarsTask';
import CreateCarTask, { CreateCarData } from '../tasks/cars/CreateCarTask';
import NotFoundException from '../exceptions/NotFoundException';
import UpdateCarTask, { UpdateCarData } from '../tasks/cars/UpdateCarTask';
import DeleteCarTask from '../tasks/cars/DeleteCarTask';

export default class CarsController extends Controller {
  constructor() {
    super('/cars');
  }

  protected configureRouter(): void {
    this.router.get('/:id', CarsController.findCar);
    this.router.get('/', CarsController.listCars);
    this.router.post(
      '/',
      CarsController.validateBody,
      CarsController.createCar
    );
    this.router.put(
      '/:id',
      CarsController.validateBody,
      CarsController.updateCar
    );
    this.router.delete('/:id', CarsController.deleteCar);
  }

  // #region  Endpoints

  private static async findCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const findCarTask = new FindCarTask(id);

      const car = await findCarTask.execute();

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
      const listCarsTask = new ListCarsTask();

      const cars = await listCarsTask.execute();

      CarsController.respond(res, StatusCodes.OK, cars);
    } catch (error) {
      CarsController.sendUnknownErrorResponse(res, <Error>error);
    }
  }

  private static async createCar(req: Request, res: Response): Promise<void> {
    try {
      const carData = <CreateCarData>req.body;

      const createCarTask = new CreateCarTask(carData);

      const car = await createCarTask.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (error) {
      CarsController.sendUnknownErrorResponse(res, <Error>error);
    }
  }

  private static async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const carData = <UpdateCarData>req.body;

      const updateCarTask = new UpdateCarTask(id, carData);

      const car = await updateCarTask.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (error) {
      if (error instanceof NotFoundException) {
        CarsController.respond(res, StatusCodes.NOT_FOUND);
      } else {
        CarsController.sendUnknownErrorResponse(res, <Error>error);
      }
    }
  }

  private static async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleteCarTask = new DeleteCarTask(id);

      await deleteCarTask.execute();

      CarsController.respond(res, StatusCodes.OK);
    } catch (error) {
      CarsController.sendUnknownErrorResponse(res, <Error>error);
    }
  }

  // #endregion

  // #region  Body validation

  private static async validateBody(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await CarsController.runValidation(req);

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      CarsController.respond(res, StatusCodes.BAD_REQUEST, {
        errors: validationErrors.array(),
      });

      return;
    }

    next();
  }

  private static async runValidation(req: Request): Promise<void> {
    const carBodyValidation = CarsController.getCarBodyValidation();

    // eslint-disable-next-line no-restricted-syntax
    for (const validation of carBodyValidation) {
      // eslint-disable-next-line no-await-in-loop
      await validation.run(req);
    }
  }

  private static getCarBodyValidation(): ValidationChain[] {
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

  // #endregion
}
