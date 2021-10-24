import DatabaseConnection from '../../database/DatabaseConnection';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export default class ListCarsTask implements IAsyncTask<Car[]> {
  // eslint-disable-next-line class-methods-use-this
  public async execute(): Promise<Car[]> {
    const connection = await DatabaseConnection.getConnectedInstance();
    const carRepository = connection.getRepository(Car);

    return carRepository.find();
  }
}
