import { Express, Router, Response } from 'express';

export default abstract class Controller {
  constructor(basePath: string) {
    this.basePath = basePath;
    this.router = Router();

    this.initializeRouter();
  }

  protected router: Router;

  private basePath: string;

  public mount(app: Express): void {
    app.use(this.basePath, this.router);
  }

  protected abstract initializeRouter(): void;

  protected static respond(
    res: Response,
    statusCode: number,
    data?: unknown,
    contentType = 'application/json'
  ): void {
    res.writeHead(statusCode, {
      'Content-Type': contentType,
    });
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end();
    }
  }
}
