export interface ILayerParams {

  name: string;

  database: string;

  subnames?: string[];

  searchUrl: string;

  layerType: string;

  info: string[];
}

export interface IMode {

  name: string;

  layers: string[];
}
