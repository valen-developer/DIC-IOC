export class IOC {
  private services: any;

  /**
   * @constructor
   */
  constructor() {
    this.services = {};
  }

  /**
   *
   * @param name name of service
   * @param factory Service Creator. Ex: (c)=> new UserCreator(c.get('userRepository'))
   */
  public setService(name: string, factory: (c: IOC) => {}) {
    if (!this.services[name]) this.services[name] = factory(this);
  }

  /**
   *
   * @param name name of service to get. return that service if exits
   */
  public get(name: string): any {
    if (!this.services[name]) throw new Error(`not that service: ${name}`);
    return this.services[name];
  }
}
