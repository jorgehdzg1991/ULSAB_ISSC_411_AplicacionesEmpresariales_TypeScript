import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import Greeting from '../models/entities/Greeting';
import Controller from './Controller';

export default class GreetingsController extends Controller {
  constructor() {
    super('/greeting');
  }

  protected initializeRouter(): void {
    this.router.get('/hello', GreetingsController.hello);
    this.router.get('/greet/:name', GreetingsController.greet);
  }

  private static hello(req: Request, res: Response): void {
    const greeting = new Greeting('Hello world!');

    GreetingsController.respond(res, StatusCodes.OK, greeting);
  }

  private static greet(req: Request, res: Response): void {
    const { name } = req.params;
    const greeting = new Greeting(`Hello ${name}!`);

    GreetingsController.respond(res, StatusCodes.OK, greeting);
  }
}
