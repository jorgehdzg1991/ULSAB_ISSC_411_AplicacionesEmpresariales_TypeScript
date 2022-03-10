export default class SingletonCounter {
  private static instance?: SingletonCounter;

  public count: number;

  private constructor() {
    this.count = 0;
  }

  public static getInstance(): SingletonCounter {
    if (!SingletonCounter.instance) {
      SingletonCounter.instance = new SingletonCounter();
    }
    return SingletonCounter.instance;
  }

  public addOne(): void {
    this.count += 1;
  }
}
