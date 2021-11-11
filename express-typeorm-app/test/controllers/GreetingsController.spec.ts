import expect from 'expect';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../src/app';

describe('GreetingsController tests', () => {
  const greetingsPath = '/greetings';

  it('should say hello', (done) => {
    request(app)
      .get(`${greetingsPath}/hello`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          const expectedGreeting = { message: 'Hello world!' };
          expect(res.body).toEqual(expectedGreeting);
          done();
        }
      });
  });

  it('should greet someone', (done) => {
    const person = 'Jorge';

    request(app)
      .get(`${greetingsPath}/greet/${person}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          const expectedGreeting = { message: `Hello ${person}!` };
          expect(res.body).toEqual(expectedGreeting);
          done();
        }
      });
  });
});
