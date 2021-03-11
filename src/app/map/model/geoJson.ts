export interface Geometry {

  type: string;

  coordinates: [number, number];

}


export class GeoJson<T> {

  features: {

    geometry: Geometry,

    properties: T,

    type: string

  };

  constructor() {
  }

  public getProperties(): T {
    return this.features.properties;
  }

}
