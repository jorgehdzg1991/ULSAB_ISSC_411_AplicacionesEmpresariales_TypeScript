import { v4 as uuid } from 'uuid';
import DatabaseConnection from '../../database/DatabaseConnection';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export default class CreateCarTask implements IAsyncTask<Car> {
  constructor(brand: string, model: string, submodel: string, year: number) {
    const newCarId = uuid();

    this.newCar = new Car(
      newCarId,
      <string>brand,
      <string>model,
      <string>submodel,
      <number>year
    );
  }

  private newCar: Car;

  public async execute(): Promise<Car> {
    const connection = await DatabaseConnection.getConnectedInstance();
    const carRepository = connection.getRepository(Car);

    return carRepository.save(this.newCar);
  }
}
