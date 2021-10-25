import _ from 'lodash';

class EnvironmentVariables {
  constructor() {
    this.validateEnvironmentVariables();
  }

  private static keys = {
    dbHost: 'DB_HOST',
    dbPort: 'DB_PORT',
    dbUser: 'DB_USER',
    dbPassword: 'DB_PASSWORD',
    dbName: 'DB_NAME',
    nodeEnv: 'NODE_ENV',
  };

  // eslint-disable-next-line class-methods-use-this
  private validateEnvironmentVariables(): void {
    const missingEnvVars: string[] = [];

    _.keys(EnvironmentVariables.keys).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const envVariable = EnvironmentVariables.keys[key];

      if (!process.env[envVariable]) {
        missingEnvVars.push(envVariable);
      }
    });

    if (missingEnvVars.length > 0) {
      const errorMessage = `Missing environment variables: ${missingEnvVars.join(
        ', '
      )}`;
      throw new Error(errorMessage);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public get dbHost(): string {
    return <string>process.env[EnvironmentVariables.keys.dbHost];
  }

  // eslint-disable-next-line class-methods-use-this
  public get dbPort(): number {
    return parseInt(<string>process.env[EnvironmentVariables.keys.dbPort], 10);
  }

  // eslint-disable-next-line class-methods-use-this
  public get dbUser(): string {
    return <string>process.env[EnvironmentVariables.keys.dbUser];
  }

  // eslint-disable-next-line class-methods-use-this
  public get dbPassword(): string {
    return <string>process.env[EnvironmentVariables.keys.dbPassword];
  }

  // eslint-disable-next-line class-methods-use-this
  public get dbName(): string {
    return <string>process.env[EnvironmentVariables.keys.dbName];
  }

  // eslint-disable-next-line class-methods-use-this
  public get nodeEnv(): string {
    return <string>process.env[EnvironmentVariables.keys.nodeEnv];
  }
}

export default new EnvironmentVariables();
