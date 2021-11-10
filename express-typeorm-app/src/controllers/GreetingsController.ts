import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import Greeting from '../models/Greeting';
import Controller from './Controller';

export default class GreetingsController extends Controller {
  constructor() {
    super('/greetings');
  }

  protected configureRouter(): void {
    this.router.get('/hello', GreetingsController.hello);
    this.router.get('/greet/:name', GreetingsController.greet);
  }

  /**
   * @api {get} /greetings/hello Hello
   * @apiName hello
   * @apiDescription Returns a "Hello world!" greeting
   * @apiGroup Greetings  API
   *
   * @apiSuccess {String} message Greeting message
   *
   * @apiSuccessExample {json} Success-Example:
   *  HTTP/1.1 200 OK
   *  {
   *    "message": "Hello world!"
   *  }
   */
  private static hello(req: Request, res: Response): void {
    const greeting = new Greeting('Hello world!');

    GreetingsController.respond(res, StatusCodes.OK, greeting);
  }

  /**
   * @api {get} /greetings/greet/:name Greet
   * @apiName greet
   * @apiDescription Greet someone
   * @apiGroup Greetings  API
   *
   * @apiParam {String} name Name of the person to be added to the greet message
   *
   * @apiSuccess {String} message Greeting message
   *
   * @apiSuccessExample {json} Success-Example:
   *  HTTP/1.1 200 OK
   *  {
   *    "message": "Hello Jorge!"
   *  }
   */
  private static greet(req: Request, res: Response): void {
    const { name } = req.params;
    const greeting = new Greeting(`Hello ${name}!`);

    GreetingsController.respond(res, StatusCodes.OK, greeting);
  }
}
