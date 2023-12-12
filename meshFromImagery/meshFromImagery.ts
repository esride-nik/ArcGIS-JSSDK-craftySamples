import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

let view: SceneView;
document?.querySelector("arcgis-scene")?.addEventListener("viewReady", async (event: any) => {
    view = event.detail.view;
    runApp();
});

let imageryLayer: ImageryLayer;
let volumetricGraphicsLayer: GraphicsLayer;

const setupView = () => {

    const clippingAdd = 100;
    const extentAdd = 1000;
    view.viewingMode = "local";
    view.clippingArea = {
        spatialReference: { latestWkid: 3857, wkid: 102100 } as unknown as __esri.SpatialReference,
        xmin: -4891786.441670591 - clippingAdd,
        ymin: -2307257.926811594 - clippingAdd,
        xmax: -4891427.934010591 + clippingAdd,
        ymax: -2306963.3097615945 + clippingAdd,
      } as unknown as __esri.Extent;

    view.extent = {
        spatialReference: { latestWkid: 3857, wkid: 102100 } as unknown as __esri.SpatialReference,
        xmin: -4_891_786.441_670_591 - extentAdd,
        ymin: -2_307_257.926_811_594,
        xmax: -4_891_427.934_010_591 + extentAdd,
        ymax: -2_306_963.309_761_594_5 + extentAdd * 2,
      } as unknown as __esri.Extent;

}
      
const addLayers = () => {
    imageryLayer = new ImageryLayer({
        id: 'Elevation in bands',
        url: 'https://tiledimageservices.arcgis.com/OLiydejKCZTGhvWg/arcgis/rest/services/VarzeaMin_DOMs/ImageServer',
        opacity: 0.9
    });

    volumetricGraphicsLayer = new GraphicsLayer({
        id: 'volumetricGraphics'
    })
    view.map.addMany([imageryLayer, volumetricGraphicsLayer]);
 }

const runApp = () => {
    console.log('View \'s ready. Continue imperatively from here.', view);
    setupView();
    addLayers();
}
