import {Vehicle} from './vehicle';

export class Car extends Vehicle {

  availability: {
    description: string,
    id: number
  };

  fuel: {
    description: string,
    id: number
  };

  constructor() {
    super();
  }
}
