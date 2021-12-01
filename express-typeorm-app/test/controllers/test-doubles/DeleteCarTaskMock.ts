import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import * as deleteCarTaskModule from '../../../src/tasks/cars/DeleteCarTask';

export default class DeleteCarTaskMock {
  constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(deleteCarTaskModule.default);
    this.constructorStub = sandbox.stub(deleteCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  private readonly instanceStub: SinonStubbedInstance<deleteCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public withExecuteSucceeding(): void {
    this.instanceStub.execute.returns(Promise.resolve());
  }

  public withExecuteThrowing(exception: Error): void {
    this.instanceStub.execute.returns(Promise.reject(exception));
  }
}
