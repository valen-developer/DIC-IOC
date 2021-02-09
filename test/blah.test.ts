import { IOC } from '../src/index';

class UserRepository {
  public name = 'user repository';
}

class UserCreator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  get repository(): UserRepository {
    return this.userRepository;
  }
}

describe('IOC', () => {
  const container = new IOC();
  test('when create a service this can be got', () => {
    container.setService('UserRepository', () => new UserRepository());

    expect(container.get('UserRepository') instanceof UserRepository).toBe(
      true
    );
  });

  test('when create a service with dependency, this must be accessible', () => {
    container.setService(
      'UserCreator',
      (c: IOC) => new UserCreator(c.get('UserRepository'))
    );

    const userCreator: UserCreator = container.get('UserCreator');

    expect(userCreator.repository instanceof UserRepository).toBe(true);
  });

  test('when try create a object when its dependency is not created yet, it must throw an exception', () => {
    const ioc = new IOC();

    expect(() => {
      ioc.setService(
        'UserCreator',
        (c: IOC) => new UserCreator(c.get('UserRepository'))
      );
    }).toThrowError();
  });
});
