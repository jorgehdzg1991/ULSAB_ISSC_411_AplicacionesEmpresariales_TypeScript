import sinon, { SinonSandbox } from 'sinon';
import expect from 'expect';
import EnvironmentVariables from '../src/EnvironmentVariables';

describe('EnvironmentVariables tests', () => {
  let sandbox: SinonSandbox;

  const envVariablesValues = {
    dbHost: 'dbHost value',
    dbPort: '9000',
    dbUser: 'dbUser value',
    dbPassword: 'dbPassword value',
    dbName: 'dbName value',
    nodeEnv: 'nodeEnv value',
  };

  before(() => {
    sandbox = sinon.createSandbox();
  });

  function withAllEnvVariables() {
    sandbox.stub(process, 'env').value({
      DB_HOST: envVariablesValues.dbHost,
      DB_PORT: envVariablesValues.dbPort,
      DB_USER: envVariablesValues.dbUser,
      DB_PASSWORD: envVariablesValues.dbPassword,
      DB_NAME: envVariablesValues.dbName,
      NODE_ENV: envVariablesValues.nodeEnv,
    });
  }

  afterEach(() => {
    sandbox.restore();
  });

  it('should return all env variables', () => {
    withAllEnvVariables();

    const environmentVariables = new EnvironmentVariables();

    expect(environmentVariables.dbHost).toBe(envVariablesValues.dbHost);
    expect(environmentVariables.dbPort).toBe(
      parseInt(envVariablesValues.dbPort, 10)
    );
    expect(environmentVariables.dbUser).toBe(envVariablesValues.dbUser);
    expect(environmentVariables.dbPassword).toBe(envVariablesValues.dbPassword);
    expect(environmentVariables.dbName).toBe(envVariablesValues.dbName);
    expect(environmentVariables.nodeEnv).toBe(envVariablesValues.nodeEnv);
  });

  it('should throw if env variables are missing', () => {
    expect(() => new EnvironmentVariables()).toThrow(
      'Missing environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV'
    );
  });
});
