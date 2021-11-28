import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import Car from '../../../src/models/entities/Car';
import * as updateCarTaskModule from '../../../src/tasks/cars/UpdateCarTask';

export default class UpdateCarTaskMock {
  constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(updateCarTaskModule.default);
    this.constructorStub = sandbox.stub(updateCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  private readonly instanceStub: SinonStubbedInstance<updateCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public withExecuteReturning(car: Car): void {
    this.instanceStub.execute.returns(Promise.resolve(car));
  }

  public withExecuteThrowing(exception: Error): void {
    this.instanceStub.execute.returns(Promise.reject(exception));
  }
}
