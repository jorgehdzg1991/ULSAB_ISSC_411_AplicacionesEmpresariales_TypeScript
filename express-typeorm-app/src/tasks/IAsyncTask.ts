export default interface IAsyncTask<T> {
  execute(): Promise<T>;
}
