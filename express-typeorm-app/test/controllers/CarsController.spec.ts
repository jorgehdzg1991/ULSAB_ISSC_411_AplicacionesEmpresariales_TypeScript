import expect from 'expect';
import { StatusCodes } from 'http-status-codes';
import sinon, { SinonSandbox } from 'sinon';
import request from 'supertest';
import app from '../../src/app';
import NotFoundException from '../../src/exceptions/NotFoundException';
import Car from '../../src/models/entities/Car';
import FindCarTaskMock from '../test-doubles/mocks/FindCarTaskMock';

describe('CarsController tests', () => {
  let sandbox: SinonSandbox;

  const carsPath = '/cars';

  const kiaRioLx2018 = new Car(
    '00000000-0000-0000-0000-000000000000',
    'KIA',
    'Rio',
    'Rio LX',
    2018
  );

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('findCar --> GET /cars/:id', () => {
    let findCarTaskMock: FindCarTaskMock;

    const findCarPath = `${carsPath}/${kiaRioLx2018.id}`;

    beforeEach(() => {
      findCarTaskMock = new FindCarTaskMock(sandbox);
    });

    it('should find a car by id', (done) => {
      findCarTaskMock.withExecuteReturing(kiaRioLx2018);

      request(app)
        .get(findCarPath)
        .expect(StatusCodes.OK)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).toEqual(kiaRioLx2018);
            done();
          }
        });
    });

    it("should return NotFound if car doesn't exist", (done) => {
      findCarTaskMock.withExecuteThrowing(new NotFoundException());

      request(app)
        .get(findCarPath)
        .expect(StatusCodes.NOT_FOUND)
        .end(() => done());
    });

    it('should return InternalServerError if unknown error ocurrs', (done) => {
      findCarTaskMock.withExecuteThrowing(
        new Error('I have a bad feeling about this')
      );

      request(app)
        .get(findCarPath)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .end(() => done());
    });
  });
});
