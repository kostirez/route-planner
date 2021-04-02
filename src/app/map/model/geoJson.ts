export interface Geometry {

  type: string;

  coordinates: [number, number][];

}


export class GeoJson<T> {

  features: {

    geometry: Geometry,

    properties: T,

    type: string

  }[];

  constructor() {
    this.features = [];
  }

}
