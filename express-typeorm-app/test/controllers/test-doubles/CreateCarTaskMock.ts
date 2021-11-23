import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import Car from '../../../src/models/entities/Car';
import * as createCarTaskModule from '../../../src/tasks/cars/CreateCarTask';

export default class CreateCarTaskMock {
  constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(createCarTaskModule.default);
    this.constructorStub = sandbox.stub(createCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  private readonly instanceStub: SinonStubbedInstance<createCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public withExecuteReturing(car: Car): void {
    this.instanceStub.execute.returns(Promise.resolve(car));
  }

  public withExecuteThrowing(exception: Error): void {
    this.instanceStub.execute.returns(Promise.reject(exception));
  }
}
