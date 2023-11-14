// media Layer Video GeoreFerencing - on-the-fly

require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/MediaLayer",
    "esri/layers/support/VideoElement",
    "esri/layers/support/ExtentAndRotationGeoreference",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/geometry/Extent",
    "esri/widgets/Slider",
  ], (
    Map,
    SceneView,
    MediaLayer,
    VideoElement,
    ExtentAndRotationGeoreference,
    LayerList,
    Expand,
    Extent,
    Slider
  ) => {
    // create a video element by setting video param to point to the video file url
    // set the geographic location of the video file on the map using an extent
    const vElement = new VideoElement({
      //   video: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4",
      video: "./hurricanes_aerosol-aug.mp4",
      georeference: new ExtentAndRotationGeoreference({
        extent: new Extent({
          xmin: -150,
          ymin: 1,
          xmax: 20,
          ymax: 80,
          spatialReference: {
            wkid: 4326,
          },
        }),
      }),
    });

    // const vElement = new VideoElement({
    //   video: "./757eff0c-9cfe-41aa-88ce-f32fb3956289.mp4",
    //   georeference: new ExtentAndRotationGeoreference({
    //     extent: new Extent({
    //       xmin: -13270000,
    //       ymin: 4032547.1853116825,
    //       xmax: -13000000,
    //       ymax: 4132747.1853116825,
    //       spatialReference: {
    //         wkid: 3857,
    //       },
    //     }),
    //   }),
    // });

    // add the video element to the media layer
    const layer = new MediaLayer({
      source: [vElement],
      title: "Media layer with video",
      copyright: "NASA and nobody",
    });

    layer.when().then((ml) => console.log("ml", ml));

    const map = new Map({
      basemap: "topo-vector",
      ground: "world-elevation",
      layers: [layer],
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      //   camera: {
      //     position: {
      //       spatialReference: { latestWkid: 3857, wkid: 102100 },
      //       x: -13047973.04363734,
      //       y: 4032647.1853116825,
      //       z: 9361.218061765656,
      //     },
      //     heading: 305.60877525757803,
      //     tilt: 84.16455839233811,
      //   }
      camera: {
        position: {
          spatialReference: { latestWkid: 3857, wkid: 102100 },
          x: -13154262.045092562,
          y: 3970824.908822286,
          z: 300793.5274479827,
        },
        heading: 357.134040187626,
        tilt: 13.728486129501949,
      },
    });

    view.when().then(() => {
      view.watch("camera", (c) => console.log(JSON.stringify(c)));
    });

    const layerList = new LayerList({
      view,
      listItemCreatedFunction: defineActions,
    });
    const llExpand = new Expand({
      view: view,
      content: layerList,
      expanded: false,
    });

    view.ui.add(llExpand, "lower-right");
    function defineActions(event) {
      const item = event.item;
      item.actionsSections = [
        {
          title: "Opacity",
          className: "esri-icon-up",
          id: "increase-opacity",
        },
      ];

      // add a slider to the layer list
      // so that the opacity of the media layer can be changed
      const slider = new Slider({
        min: 0,
        max: 1,
        precision: 2,
        values: [1],
        visibleElements: {
          labels: true,
          rangeLabels: true,
        },
      });

      item.panel = {
        content: slider,
        className: "esri-icon-sliders-horizontal",
        title: "Change layer opacity",
        open: true,
      };

      slider.on("thumb-drag", (event) => {
        const { value } = event;
        item.layer.opacity = value;
      });
    }



const overview = new SceneView({
    container: "overviewDiv",
    map: map,
    // camera: {
    //     position: {
    //     spatialReference: { latestWkid: 3857, wkid: 102100 },
    //     x: -13154262.045092562,
    //     y: 3970824.908822286,
    //     z: 300793.5274479827,
    //     },
    //     heading: 357.134040187626,
    //     tilt: 13.728486129501949,
    // },
    });

    // TODO: event listeners on scene view
    // xminSlider.addEventListener("calciteSliderInput", () => {
    //   console.log("xmin", xminSlider.value);
    //   vElement.georeference.extent.xmin = xminSlider.value;
    // });
    // xmaxSlider.addEventListener("calciteSliderInput", () => {
    //   console.log("xmax", xmaxSlider.value);
    //   vElement.georeference.extent.xmax = xmaxSlider.value;
    // });
    // yminSlider.addEventListener("calciteSliderInput", () => {
    //   console.log("ymin", yminSlider.value);
    //   vElement.georeference.extent.ymin = yminSlider.value;
    // });
    // ymaxSlider.addEventListener("calciteSliderInput", () => {
    //   console.log("ymax", ymaxSlider.value);
    //   vElement.georeference.extent.ymax = ymaxSlider.value;
    // });
  });