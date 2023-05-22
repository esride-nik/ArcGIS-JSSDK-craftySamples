import Map from "@arcgis/core/Map.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import "./style.css";

// If GeoJSON files are not on the same domain as your website, a CORS enabled server
// or a proxy is required.
const url = "https://data.osmbuildings.org/0.2/anonymous/tile/15/17605/10743.json";
// const url = "./data/15-17005-10743.json";

const template = {
  title: "Building Footprints",
  content: "The height of this {type} building is {height}.",
  fieldInfos: [
    {
      fieldName: "time",
      format: {
        dateFormat: "short-date-short-time"
      }
    }
  ]
};

const renderer =  {
  type: "unique-value",
  field: "type",
  defaultSymbol: { type: "simple-fill" },
  uniqueValueInfos: [{
    value: "education",
    symbol: {
      type: "simple-fill",
      color: "blue"
    }
  }, {
    value: "residential",
    symbol: {
      type: "simple-fill",
      color: "green"
    }
  }, {
    value: "commercial",
    symbol: {
      type: "simple-fill",
      color: "orange"
    }
  }],
  visualVariables: [
    {
      type: "opacity",
      field: "height",
      stops: [
        {
          value: 8,
          opacity: 0.1
        },
        {
          value: 24,
          opacity: 1
        }
      ]
    }
  ]
};

const geojsonLayer = new GeoJSONLayer({
  url: url,
  copyright: "osmbuildings.org",
  popupTemplate: template,
  renderer: renderer,
  orderBy: {
    field: "height"
  }
});

const gQuery = geojsonLayer.createQuery();
gQuery.where = '1=1';
const extent = await geojsonLayer.queryExtent(gQuery);
console.log('extent', extent);

const map = new Map({
  basemap: "gray-vector",
  layers: [geojsonLayer]
});

const view = new MapView({
  container: "viewDiv",
  map: map
});
view.when((v) => {
  console.log('v', v);
  v.goTo({target: extent.extent})
})


const scene = new SceneView({
  container: "sceneDiv",
  map: map
});
scene.when(async (s) => {
  console.log('s', s);
  await s.goTo({
    target: extent.extent,
    tilt: 45
  })
});
