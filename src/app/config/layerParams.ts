import {ILayerParams, IMode} from '../interfaces/ILayerParams';

export const mode: IMode[] = [
  {
    name: 'All',
    layers: [
      'Bike',
      'CyclePath',
      'BikeParking',
      'Car',
      'ParkingMachines',
      'ParkingLot',
      'PaidParking',
      'ProhibitedParking',
      'ZTP',
      'streets',
      'MHDStops',
      'PIDLines',
      'chodci'
    ]
  },
  {
    name: 'Bike',
    layers: [
      'Bike',
      'CyclePath',
      'BikeParking'
    ]
  },
  {
    name: 'Car',
    layers: [
      'Car',
      'ParkingMachines',
      'ParkingLot',
      'PaidParking',
      'ProhibitedParking',
      'ZTP',
      'streets'
    ]
  },
  {
    name: 'PIDLines',
    layers: [
      'MHDStops',
      'PIDLines'
    ]
  },
];

export const layersParams: ILayerParams[] = [
  {
    name: 'Bike',
    database: 'golemio',
    searchUrl: 'sharedbikes',
    subnames: ['HOMEPORT'],
    layerType: 'point',
    info: ['name', 'company']
  },
  {
    name: 'CyclePath',
    database: 'myApi',
    searchUrl: 'cyclePath',
    subnames: [],
    layerType: 'line',
    info: ['number']
  },
  {
    name: 'BikeParking',
    database: 'golemio',
    searchUrl: 'bicycleparkings',
    subnames: [],
    layerType: 'point',
    info: []
  },
  {
    name: 'Car',
    database: 'golemio',
    searchUrl: 'sharedcars',
    subnames: ['HoppyGo', 'CAR4WAY', 'Anytime', 'Autonapůl', 'AJO'],
    layerType: 'point',
    info: ['name', 'company']
  },
  {
    name: 'ParkingMachines',
    database: 'myApi',
    searchUrl: 'Parking',
    subnames: [],
    layerType: 'point',
    info: []
  },
  {
    name: 'ParkingLot',
    database: 'myApi',
    searchUrl: 'parkingLot',
    subnames: [],
    layerType: 'point',
    info: []
  },
  {
    name: 'ZTP',
    database: 'myApi',
    searchUrl: 'ZTP',
    subnames: [],
    layerType: 'point',
    info: []
  },
  {
    name: 'ProhibitedParking',
    database: 'myApi',
    searchUrl: 'ZakazStani',
    subnames: [],
    layerType: 'polygon',
    info: []
  },
  {
    name: 'PaidParking',
    database: 'myApi',
    searchUrl: 'placene_parkovani',
    subnames: [],
    layerType: 'polygon',
    info: []
  },
  {
    name: 'PIDLines',
    database: 'myApi',
    searchUrl: 'typ',
    subnames: ['metro', 'tram', 'bus'],
    layerType: 'line',
    info: []
  },
  {
    name: 'MHDStops',
    database: 'myApi',
    searchUrl: 'null',
    subnames: [],
    layerType: 'point',
    info: []
  },
  {
    name: 'streets',
    database: 'myApi',
    searchUrl: 'streets',
    subnames: [],
    layerType: 'line2',
    info: []
  },
  {
    name: 'chodci',
    database: 'myApi',
    searchUrl: 'pesi',
    subnames: [],
    layerType: 'line3',
    info: []
  }
];
