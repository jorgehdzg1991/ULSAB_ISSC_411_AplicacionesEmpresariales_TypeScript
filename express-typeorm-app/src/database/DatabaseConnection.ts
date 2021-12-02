import path from 'path';
import {
  createConnection,
  Connection,
  Repository,
  EntityTarget,
} from 'typeorm';
import EnvironmentVariables from '../EnvironmentVariables';

export default class DatabaseConnection {
  private static connection: Connection;

  public static async getConnectedInstance(): Promise<Connection> {
    const environmentVariables = new EnvironmentVariables();

    if (!this.connection) {
      const ext = environmentVariables.nodeEnv === 'development' ? 'ts' : 'js';
      const entitiesDir = path.join(__dirname, `../models/entities/*.${ext}`);

      this.connection = await createConnection({
        type: 'mysql',
        host: environmentVariables.dbHost,
        port: environmentVariables.dbPort,
        username: environmentVariables.dbUser,
        password: environmentVariables.dbPassword,
        database: environmentVariables.dbName,
        synchronize: true,
        entities: [entitiesDir],
      });
    }

    if (!DatabaseConnection.connection.isConnected) {
      await DatabaseConnection.connection.connect();
    }

    return DatabaseConnection.connection;
  }

  public static async getRepository<Entity>(
    target: EntityTarget<Entity>
  ): Promise<Repository<Entity>> {
    const connection = await DatabaseConnection.getConnectedInstance();
    return connection.getRepository(target);
  }
}
