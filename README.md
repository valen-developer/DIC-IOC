# IOC [![NPM Module](https://img.shields.io/badge/npm-0.1.0-red)](https://www.npmjs.com/package/dic-ioc)

A simple dependencies injector container.

## Install

(alpha version. Don´t use in production, I´m not responsible for that)

```
$ npm i dic-ioc
```

# Usage

To use this package, I recommend you define different files where you set your dependencies:
../user-ioc.ts

```
export default userIOCGenerator( container: IOC ){

    //First set Services without dependencies
    container.setService( 'UserRepository', ()=> new UserRepository());

    //Set Services with dependencies (already set)
    container.setService( 'UserCreator', (c:IOC)=> new UserCreator( c.get( 'UserRepository')));

}
```

Then, when you have created all of your dependencies files:
../container-ioc.ts

```
import { IOC } from 'dic-ioc';

import UserIOC from "./user-ioc.ts";


export const getContainer = ()=>{

    //Build container
    const container = new IOC();

    //Set user dependencies
    UserIOC(container);

    return container;

}
```

Finally, use container where you need:
../userCreatorController.ts

```
import { getContainer } from "./container-ioc";

export class UserCreatorController implement Controller{

    public run(req, res){

        const container: IOC = getContainer();

        const userCreator: UserCreator = container.get('UserCreator');
        userCreator.save();

        ...

        res.status(201);

    }

}
```

## License

dic-ioc is under [MIT](https://en.wikipedia.org/wiki/MIT_License) License
