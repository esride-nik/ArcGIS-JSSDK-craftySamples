import Map from "@arcgis/core/Map.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import Renderer from "@arcgis/core/renderers/Renderer.js";
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


const create2dMap = async () => {
  const renderer2d = {
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
            value: 0,
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
    renderer: renderer2d,
    orderBy: {
      field: "height"
    }
  });

  const gQuery = geojsonLayer.createQuery();
  gQuery.where = '1=1';
  const extent = await geojsonLayer.queryExtent(gQuery);

  const map2d = new Map({
    basemap: "gray-vector",
    layers: [geojsonLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map2d
  });
  view.when((v) => {
    console.log('v', v);
    v.goTo({ target: extent.extent })
  })

}



const create3dScene = async () => {

  const renderer3d = {
    type: "simple",
    symbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "extrude"
        }
      ]
    },
    visualVariables: [
      {
        type: "size",
        field: "height",
        stops: [
          {
            value: 0,
            size: 1,
            label: "> 0"
          },
          {
            value: 30,
            size: 240,
            label: "> 24"
          }
        ]
      }, {
        type: "color",
        field: "height",
        stops: [
          { value: 0, color: "#FFFCD4" },
          { value: 24, color: "#0D2644" }
        ],
        legendOptions: {
          title: "Building height"
        }
      }
    ]
  };

  const geojsonLayer3D = new GeoJSONLayer({
    url: url,
    copyright: "osmbuildings.org",
    popupTemplate: template,
    renderer: renderer3d,
    orderBy: {
      field: "height"
    }
  });

  const gQuery = geojsonLayer3D.createQuery();
  gQuery.where = '1=1';
  const extent = await geojsonLayer3D.queryExtent(gQuery);
  
  const map3d = new Map({
    basemap: "gray-vector",
    layers: [geojsonLayer3D]
  });

  const scene = new SceneView({
    container: "sceneDiv",
    map: map3d
  });
  scene.when(async (s) => {
    console.log('s', s);
    await s.goTo({
      target: extent.extent,
      tilt: 45
    })
  });
} 

create2dMap();

create3dScene();