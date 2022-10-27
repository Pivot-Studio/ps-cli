type Constructor = {
  new (...args:any):any
}
export function singleton<T extends Constructor>(Baseclass:T) {
  return class Newclass extends Baseclass {
    constructor(...args:any) {
      super(...args)
    }
    private static instance:Newclass
    static getInstance(options:string[]) {
      if(!this.instance) this.instance = new Newclass(options)
      return this.instance
    }
  }
}
