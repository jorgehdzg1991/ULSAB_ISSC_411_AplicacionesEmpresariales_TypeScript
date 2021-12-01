import expect from 'expect';
import { StatusCodes } from 'http-status-codes';
import sinon, { SinonSandbox } from 'sinon';
import request from 'supertest';
import app from '../../src/app';
import NotFoundException from '../../src/exceptions/NotFoundException';
import Car from '../../src/models/entities/Car';
import { CreateCarData } from '../../src/tasks/cars/CreateCarTask';
import CreateCarTaskMock from './test-doubles/CreateCarTaskMock';
import FindCarTaskMock from './test-doubles/FindCarTaskMock';
import ListCarsTaskMock from './test-doubles/ListCarsTaskMock';
import UpdateCarTaskMock from './test-doubles/UpdateCarTaskMock';
import { UpdateCarData } from '../../src/tasks/cars/UpdateCarTask';
import DeleteCarTaskMock from './test-doubles/DeleteCarTaskMock';

describe('CarsController tests', () => {
  let sandbox: SinonSandbox;

  const carsApiPath = '/cars';

  // #region Cars used in this test

  const kiaRioLx2018 = new Car(
    '00000000-0000-0000-0000-000000000000',
    'KIA',
    'Rio',
    'Rio LX',
    2018
  );

  const kiaRioEx2018 = new Car(
    '00000000-0000-0000-0000-000000000001',
    'KIA',
    'Rio',
    'Rio EX',
    2018
  );

  const kiaForteLx2018 = new Car(
    '00000000-0000-0000-0000-000000000002',
    'KIA',
    'Forte',
    'Forte EX',
    2018
  );

  // #endregion

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('findCar --> GET /cars/:id', () => {
    let findCarTaskMock: FindCarTaskMock;

    const findCarPath = `${carsApiPath}/${kiaRioLx2018.id}`;

    beforeEach(() => {
      findCarTaskMock = new FindCarTaskMock(sandbox);
    });

    it('should find a car by id', (done) => {
      findCarTaskMock.withExecuteReturning(kiaRioLx2018);

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

    it('should return InternalServerError if unknown error occurs', (done) => {
      findCarTaskMock.withExecuteThrowing(
        new Error('I have a bad feeling about this')
      );

      request(app)
        .get(findCarPath)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .end(() => done());
    });
  });

  context('listCars --> GET /cars', () => {
    let listCarsTaskMock: ListCarsTaskMock;

    const listCarsPath = carsApiPath;
    const listOfCars = [kiaRioLx2018, kiaRioEx2018, kiaForteLx2018];

    beforeEach(() => {
      listCarsTaskMock = new ListCarsTaskMock(sandbox);
    });

    it('should return a list of cars', (done) => {
      listCarsTaskMock.withExecuteReturning(listOfCars);

      request(app)
        .get(listCarsPath)
        .expect(StatusCodes.OK)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).toEqual(listOfCars);
            done();
          }
        });
    });

    it('should return InternalServerError if unknown error occurs', (done) => {
      listCarsTaskMock.withExecuteThrowing(
        new Error('I have a bad feeling about this')
      );

      request(app)
        .get(listCarsPath)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .end(() => done());
    });
  });

  context('createCar --> POST /cars', () => {
    let createCarTaskMock: CreateCarTaskMock;

    const createCarData: CreateCarData = {
      brand: kiaRioLx2018.brand,
      model: kiaRioLx2018.model,
      submodel: kiaRioLx2018.submodel,
      year: kiaRioLx2018.year,
    };

    beforeEach(() => {
      createCarTaskMock = new CreateCarTaskMock(sandbox);
    });

    it('should create a car', (done) => {
      createCarTaskMock.withExecuteReturning(kiaRioLx2018);

      request(app)
        .post(carsApiPath)
        .set('Content-Type', 'application/json')
        .send(createCarData)
        .expect(StatusCodes.OK)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            const car = <Car>res.body;
            expect(car).toEqual(kiaRioLx2018);
            done();
          }
        });
    });

    it('should return InternalServerError if unknown error occurs', (done) => {
      createCarTaskMock.withExecuteThrowing(
        new Error('I have a bad feeling about this')
      );

      request(app)
        .post(carsApiPath)
        .set('Content-Type', 'application/json')
        .send(createCarData)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .end((err) => {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    context('body validation', () => {
      it('should return BadRequest if any of the required properties of the body are missing', (done) => {
        createCarTaskMock.withExecuteReturning(kiaRioLx2018);

        const emptyBody = {};

        const expectedValidationErrors = {
          errors: [
            '"brand" was missing in the request body',
            '"brand" must be a string',
            '"model" was missing in the request body',
            '"model" must be a string',
            '"year" was missing in the request body',
            '"year" must be a number',
          ],
        };

        request(app)
          .post(carsApiPath)
          .set('Content-Type', 'application/json')
          .send(emptyBody)
          .expect(StatusCodes.BAD_REQUEST)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.body).toEqual(expectedValidationErrors);
              done();
            }
          });
      });

      it('"submodel" should be optional', (done) => {
        createCarTaskMock.withExecuteReturning(kiaRioLx2018);

        const createCarDataWithoutSubmodel: CreateCarData = {
          ...createCarData,
          submodel: undefined,
        };

        request(app)
          .post(carsApiPath)
          .set('Content-Type', 'application/json')
          .send(createCarDataWithoutSubmodel)
          .expect(StatusCodes.OK)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              const car = <Car>res.body;
              expect(car).toEqual(kiaRioLx2018);
              done();
            }
          });
      });
    });
  });

  context('updateCar --> PUT /cars/:id', () => {
    let updateCarTaskMock: UpdateCarTaskMock;

    const updateCarPath = `/cars/${kiaRioLx2018.id}`;
    const updatedCar = kiaRioLx2018;
    const updateCarData: UpdateCarData = {
      brand: updatedCar.brand,
      model: updatedCar.model,
      submodel: updatedCar.submodel,
      year: updatedCar.year,
    };

    beforeEach(() => {
      updateCarTaskMock = new UpdateCarTaskMock(sandbox);
    });

    it('should update a car', (done) => {
      updateCarTaskMock.withExecuteReturning(updatedCar);

      request(app)
        .put(updateCarPath)
        .set('Content-Type', 'application/json')
        .send(updateCarData)
        .expect(StatusCodes.OK)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            const car = <Car>res.body;
            expect(car).toEqual(kiaRioLx2018);
            done();
          }
        });
    });

    it("should return NotFound if car doesn't exist", (done) => {
      updateCarTaskMock.withExecuteThrowing(new NotFoundException());

      request(app)
        .put(updateCarPath)
        .set('Content-Type', 'application/json')
        .send(updateCarData)
        .expect(StatusCodes.NOT_FOUND)
        .end((err) => {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    it('should return InternalServerError if an unknown error occurs', (done) => {
      updateCarTaskMock.withExecuteThrowing(
        new Error('I have a bad feeling about this')
      );

      request(app)
        .put(updateCarPath)
        .set('Content-Type', 'application/json')
        .send(updateCarData)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .end((err) => {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    context('body validation', () => {
      it('should return BadRequest if any of the required properties of the body are missing', (done) => {
        updateCarTaskMock.withExecuteReturning(kiaRioLx2018);

        const emptyBody = {};

        const expectedValidationErrors = {
          errors: [
            '"brand" was missing in the request body',
            '"brand" must be a string',
            '"model" was missing in the request body',
            '"model" must be a string',
            '"year" was missing in the request body',
            '"year" must be a number',
          ],
        };

        request(app)
          .put(updateCarPath)
          .set('Content-Type', 'application/json')
          .send(emptyBody)
          .expect(StatusCodes.BAD_REQUEST)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.body).toEqual(expectedValidationErrors);
              done();
            }
          });
      });

      it('"submodel" should be optional', (done) => {
        updateCarTaskMock.withExecuteReturning(kiaRioLx2018);

        const updateCarDataWithoutSubmodel: CreateCarData = {
          ...updateCarData,
          submodel: undefined,
        };

        request(app)
          .put(updateCarPath)
          .set('Content-Type', 'application/json')
          .send(updateCarDataWithoutSubmodel)
          .expect(StatusCodes.OK)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              const car = <Car>res.body;
              expect(car).toEqual(kiaRioLx2018);
              done();
            }
          });
      });
    });
  });

  context('deleteCar --> DELETE /cars/:id', () => {
    let deleteCarTaskMock: DeleteCarTaskMock;

    const deleteCarPath = `/cars/${kiaRioLx2018.id}`;

    beforeEach(() => {
      deleteCarTaskMock = new DeleteCarTaskMock(sandbox);
    });

    it('should delete a car', (done) => {
      deleteCarTaskMock.withExecuteSucceeding();

      request(app)
        .delete(deleteCarPath)
        .expect(StatusCodes.OK)
        .end((err) => {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    it('should return InternalServerError if an unknown error occurs', (done) => {
      deleteCarTaskMock.withExecuteThrowing(
        new Error('I have a bad feeling about this')
      );

      request(app)
        .delete(deleteCarPath)
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .end((err) => {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});
