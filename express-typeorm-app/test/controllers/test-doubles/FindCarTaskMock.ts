import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import Car from '../../../src/models/entities/Car';
import * as findCarTaskModule from '../../../src/tasks/cars/FindCarTask';

export default class FindCarTaskMock {
  constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(findCarTaskModule.default);
    this.constructorStub = sandbox.stub(findCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  private readonly instanceStub: SinonStubbedInstance<findCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public withExecuteReturing(car: Car): void {
    this.instanceStub.execute.returns(Promise.resolve(car));
  }

  public withExecuteThrowing(exception: Error): void {
    this.instanceStub.execute.returns(Promise.reject(exception));
  }
}
