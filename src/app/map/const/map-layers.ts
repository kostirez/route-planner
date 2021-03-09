import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';


const openStreetMapStandard = new TileLayer({
  source: new OSM(),
  visible: true,
});

const openStreetMapUrl = new TileLayer({
  source: new OSM({
    url: ''
  }),
  visible: false,
});

const stamen = new TileLayer({
  source: new XYZ({
    url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
    // attributions: ''
  }),
  visible: false,
});

export const baseLayerGroup = new LayerGroup({
  layers: [
    openStreetMapStandard,
    openStreetMapUrl,
    stamen
  ]
});

export function setVisibleLayer(layerType: number): void {
  baseLayerGroup.getLayersArray().map( layer => layer.setVisible(false));
  switch (layerType) {
    case 0: openStreetMapStandard.setVisible(true); break;
    case 1: openStreetMapUrl.setVisible(true); break;
    case 2: stamen.setVisible(true); break;
  }
}

