import {Vehicle} from './vehicle';

export class Bike extends Vehicle {

  estimated_trip_length_in_km: number;

  in_rack: boolean;

  label: string;

  location_note: string;

  name: string;

  type: {
    description: string,
    id: number
  };

  constructor() {
    super();
  }

}
