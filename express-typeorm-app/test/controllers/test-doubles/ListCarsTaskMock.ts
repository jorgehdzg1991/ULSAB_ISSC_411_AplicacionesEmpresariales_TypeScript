import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import Car from '../../../src/models/entities/Car';
import * as listCarsTaskModule from '../../../src/tasks/cars/ListCarsTask';

export default class ListCarsTaskMock {
  constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(listCarsTaskModule.default);
    this.constructorStub = sandbox.stub(listCarsTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  private instanceStub: SinonStubbedInstance<listCarsTaskModule.default>;

  private constructorStub: SinonStub;

  public withExecuteReturing(listOfCars: Car[]): void {
    this.instanceStub.execute.returns(Promise.resolve(listOfCars));
  }

  public withExecuteThrowing(exception: Error): void {
    this.instanceStub.execute.returns(Promise.reject(exception));
  }
}
