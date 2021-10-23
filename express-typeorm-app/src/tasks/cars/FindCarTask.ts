import DatabaseConnection from '../../database/DatabaseConnection';
import NotFoundException from '../../exceptions/NotFoundException';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export default class FindCarTask implements IAsyncTask<Car> {
  constructor(id: string) {
    this.id = id;
  }

  private id: string;

  public async execute(): Promise<Car> {
    const connection = await DatabaseConnection.getConnectedInstance();
    const carRepository = connection.getRepository(Car);

    const car = await carRepository.findOne(this.id);

    if (!car) {
      throw new NotFoundException();
    }

    return car;
  }
}
