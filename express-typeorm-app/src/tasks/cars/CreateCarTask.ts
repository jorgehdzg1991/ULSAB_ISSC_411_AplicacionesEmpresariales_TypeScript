import DatabaseConnection from '../../database/DatabaseConnection';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export type CreateCarData = {
  brand: string;
  model: string;
  submodel?: string;
  year: number;
};

export default class CreateCarTask implements IAsyncTask<Car> {
  constructor(data: CreateCarData) {
    this.data = data;
  }

  private data: CreateCarData;

  public async execute(): Promise<Car> {
    const carRepository = await DatabaseConnection.getRepository(Car);
    return carRepository.save(this.data);
  }
}
