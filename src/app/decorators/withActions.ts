type Constructor<T = {}> = new (...args: any[]) => T;


export function withActions<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    withActions: boolean = true;

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
