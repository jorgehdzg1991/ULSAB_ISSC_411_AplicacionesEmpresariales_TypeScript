import path from 'path';
import { createConnection, Connection } from 'typeorm';

export default class DatabaseConnection {
  private static connection: Connection;

  public static async getConnectedInstance(): Promise<Connection> {
    if (!this.connection) {
      const ext = process.env.NODE_ENV === 'development' ? 'ts' : 'js';
      const entitiesDir = path.join(__dirname, `../models/entities/*.${ext}`);

      this.connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'admin123',
        database: 'car_shop',
        synchronize: true,
        entities: [entitiesDir],
      });
    }

    if (!DatabaseConnection.connection.isConnected) {
      await DatabaseConnection.connection.connect();
    }

    return DatabaseConnection.connection;
  }
}
