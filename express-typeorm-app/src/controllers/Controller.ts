import { Express, Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

export default abstract class Controller {
  constructor(basePath: string) {
    this.basePath = basePath;
    this.router = Router();

    this.configureRouter();
  }

  protected router: Router;

  private basePath: string;

  public mount(app: Express): void {
    app.use(this.basePath, this.router);
  }

  protected abstract configureRouter(): void;

  protected static respond(
    res: Response,
    statusCode: number,
    data?: object,
    contentType = 'application/json'
  ): void {
    res.writeHead(statusCode, {
      'Content-Type': contentType,
    });

    if (data) {
      const cleanData = Controller.cleanData(data);
      res.end(JSON.stringify(cleanData));
    } else {
      res.end();
    }
  }

  protected static sendUnknownErrorResponse(res: Response): void {
    Controller.respond(res, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  private static cleanData(data: object): object {
    if (_.isArray(data)) {
      return data.map((item) => Controller.cleanData(item));
    }
    return Controller.cleanObject(data);
  }

  private static cleanObject(data: object): object {
    const dataWithoutUndefinedValues = _.omitBy(data, _.isUndefined);
    const dataWithoutNullAndUndefinedValues = _.omitBy(
      dataWithoutUndefinedValues,
      _.isNull
    );
    return dataWithoutNullAndUndefinedValues;
  }
}
