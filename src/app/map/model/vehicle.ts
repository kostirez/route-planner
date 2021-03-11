import {Company} from './company';

export abstract class Vehicle {

  company: Company;

  id: string;

  name: string;

  res_url: string;

  updated_at: string;

  protected constructor() {
  }
}
