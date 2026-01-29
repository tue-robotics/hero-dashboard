export interface IArgs {
  host: () => Promise<string>;
}

declare global {
  interface Window {
    args: IArgs;
  }
}
