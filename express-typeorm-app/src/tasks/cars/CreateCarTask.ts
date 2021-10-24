import DatabaseConnection from '../../database/DatabaseConnection';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export type CarData = {
  brand: string;
  model: string;
  submodel: string;
  year: number;
};

export default class CreateCarTask implements IAsyncTask<Car> {
  constructor(data: CarData) {
    this.data = data;
  }

  private data: CarData;

  public async execute(): Promise<Car> {
    const connection = await DatabaseConnection.getConnectedInstance();
    const carRepository = connection.getRepository(Car);

    return carRepository.save(this.data);
  }
}
