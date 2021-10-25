import DatabaseConnection from '../../database/DatabaseConnection';
import NotFoundException from '../../exceptions/NotFoundException';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export type UpdateCarData = {
  brand: string;
  model: string;
  submodel?: string;
  year: number;
};

export default class UpdateCarTask implements IAsyncTask<Car> {
  constructor(id: string, data: UpdateCarData) {
    this.id = id;
    this.data = data;
  }

  private id: string;

  private data: UpdateCarData;

  public async execute(): Promise<Car> {
    const carRepository = await DatabaseConnection.getRepository(Car);
    const car = await carRepository.findOne(this.id);

    if (!car) {
      throw new NotFoundException();
    }

    car.brand = this.data.brand;
    car.model = this.data.model;
    car.submodel = this.data.submodel;
    car.year = this.data.year;

    return carRepository.save(car);
  }
}
