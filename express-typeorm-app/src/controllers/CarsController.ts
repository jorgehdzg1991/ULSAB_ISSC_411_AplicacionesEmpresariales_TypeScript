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

  /**
   * @api {get} /cars/:id Find car
   * @apiName findCar
   * @apiDescription Finds a car by ID from the database
   * @apiGroup Cars API
   *
   * @apiParam {Number} id Car ID
   *
   * @apiSuccess {String} id Car ID
   * @apiSuccess {String} brand Brand name
   * @apiSuccess {String} model Model
   * @apiSuccess {String} [submodel] Submodel
   * @apiSuccess {String} year Year
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "00000000-0000-0000-0000-000000000000",
   *    "brand": "KIA",
   *    "model": "Rio",
   *    "submodel": "Rio LX",
   *    "year": "2018"
   *  }
   *
   * @apiError 404 Car wasn't found
   */
  private static async findCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const findCarTask = new FindCarTask(id);

      const car = await findCarTask.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        CarsController.respond(res, StatusCodes.NOT_FOUND);
      } else {
        CarsController.sendUnknownErrorResponse(res);
      }
    }
  }

  /**
   * @api {get} /cars Get list of cars
   * @apiName listCars
   * @apiDescription Returns a list of cars from the database
   * @apiGroup Cars API
   *
   * @apiSuccess {Object[]} cars List of cars
   * @apiSuccess {String} cars.id Car ID
   * @apiSuccess {String} cars.brand Brand name
   * @apiSuccess {String} cars.model Model
   * @apiSuccess {String} [cars.submodel] Submodel
   * @apiSuccess {String} cars.year Year
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  [
   *    {
   *      "id": "00000000-0000-0000-0000-000000000000",
   *      "brand": "KIA",
   *      "model": "Rio",
   *      "submodel": "Rio LX",
   *      "year": "2018"
   *    },
   *    {
   *      "id": "00000000-0000-0000-0000-000000000001",
   *      "brand": "KIA",
   *      "model": "Rio",
   *      "submodel": "Rio EX",
   *      "year": "2018"
   *    },   *    {
   *      "id": "00000000-0000-0000-0000-000000000002",
   *      "brand": "KIA",
   *      "model": "Forte",
   *      "submodel": "Forte LX",
   *      "year": "2018"
   *    }
   *  ]
   */
  private static async listCars(_req: Request, res: Response): Promise<void> {
    try {
      const listCarsTask = new ListCarsTask();

      const cars = await listCarsTask.execute();

      CarsController.respond(res, StatusCodes.OK, cars);
    } catch (error) {
      console.error(error);
      CarsController.sendUnknownErrorResponse(res);
    }
  }

  /**
   * @api {post} /cars Create car
   * @apiName createCar
   * @apiDescription Creates a new car and saves it to the database
   * @apiGroup Cars API
   *
   * @apiBody {String} brand Brand name
   * @apiBody {String} model Model
   * @apiBody {String} [submodel] Submodel
   * @apiBody {String} year Year
   *
   * @apiParamExample {json} Request-Example
   *  {
   *    "brand": "KIA",
   *    "model": "Rio",
   *    "submodel": "Rio LX",
   *    "year": "2018"
   *  }
   *
   * @apiSuccess {String} id Car ID
   * @apiSuccess {String} brand Brand name
   * @apiSuccess {String} model Model
   * @apiSuccess {String} [submodel] Submodel
   * @apiSuccess {String} year Year
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "00000000-0000-0000-0000-000000000000",
   *    "brand": "KIA",
   *    "model": "Rio",
   *    "submodel": "Rio LX",
   *    "year": "2018"
   *  }
   *
   * @apiError 400 Body validation failed
   */
  private static async createCar(req: Request, res: Response): Promise<void> {
    try {
      const carData = <CreateCarData>req.body;

      const createCarTask = new CreateCarTask(carData);

      const car = await createCarTask.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (error) {
      console.error(error);
      CarsController.sendUnknownErrorResponse(res);
    }
  }

  /**
   * @api {put} /cars/:id Update car
   * @apiName updateCar
   * @apiDescription Updates an existing car in the database
   * @apiGroup Cars API
   *
   * @apiParam {Number} id Car ID
   *
   * @apiBody {String} brand Brand name
   * @apiBody {String} model Model
   * @apiBody {String} [submodel] Submodel
   * @apiBody {String} year Year
   *
   * @apiParamExample {json} Request-Example
   *  {
   *    "brand": "KIA",
   *    "model": "Rio",
   *    "submodel": "Rio LX",
   *    "year": "2018"
   *  }
   *
   * @apiSuccess {String} id Car ID
   * @apiSuccess {String} brand Brand name
   * @apiSuccess {String} model Model
   * @apiSuccess {String} [submodel] Submodel
   * @apiSuccess {String} year Year
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "00000000-0000-0000-0000-000000000000",
   *    "brand": "KIA",
   *    "model": "Rio",
   *    "submodel": "Rio LX",
   *    "year": "2018"
   *  }
   *
   * @apiError 400 Body validation failed
   * @apiError 404 Car wasn't found
   */
  private static async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const carData = <UpdateCarData>req.body;

      const updateCarTask = new UpdateCarTask(id, carData);

      const car = await updateCarTask.execute();

      CarsController.respond(res, StatusCodes.OK, car);
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        CarsController.respond(res, StatusCodes.NOT_FOUND);
      } else {
        CarsController.sendUnknownErrorResponse(res);
      }
    }
  }

  /**
   * @api {delete} /cars/:id Delete car
   * @apiName deleteCar
   * @apiDescription Deletes a car from the database
   * @apiGroup Cars API
   *
   * @apiParam {Number} id Car ID
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   */
  private static async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleteCarTask = new DeleteCarTask(id);

      await deleteCarTask.execute();

      CarsController.respond(res, StatusCodes.OK);
    } catch (error) {
      console.error(error);
      CarsController.sendUnknownErrorResponse(res);
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
        errors: validationErrors.array().map((e) => e.msg),
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
