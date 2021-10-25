import DatabaseConnection from '../../database/DatabaseConnection';
import Car from '../../models/entities/Car';
import IAsyncTask from '../IAsyncTask';

export default class DeleteCarTask implements IAsyncTask<void> {
  constructor(id: string) {
    this.id = id;
  }

  private id: string;

  public async execute(): Promise<void> {
    const carRepository = await DatabaseConnection.getRepository(Car);
    await carRepository.delete(this.id);
  }
}
