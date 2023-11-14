// media Layer Video GeoreFerencing - on-the-fly

require([
    "esri/Map",
    "esri/WebScene",
    "esri/Graphic",
    "esri/views/SceneView",
    "esri/layers/MediaLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/support/VideoElement",
    "esri/layers/support/ExtentAndRotationGeoreference",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/geometry/Extent",
    "esri/widgets/Slider",
    "esri/symbols/PointSymbol3D"
], (
    Map,
    WebScene,
    Graphic,
    SceneView,
    MediaLayer,
    FeatureLayer,
    GraphicsLayer,
    VideoElement,
    ExtentAndRotationGeoreference,
    LayerList,
    Expand,
    Extent,
    Slider,
    PointSymbol3D
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



    // Begin Overview Map

    const createScene = (colors, targetContainer) => {
        const webscene = new WebScene({
            portalItem: {
                id: "c894a37c07124bfcbe1ae60ba757f63e"
            }
        });

        const countryBoundaries = new FeatureLayer({
            url: "http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer",
            title: "World Countries",
            renderer: {
                type: "simple",
                symbol: {
                    type: "polygon-3d",
                    symbolLayers: [{
                        type: "fill",
                        material: { color: colors[2] },
                        outline: {
                            color: colors[2]
                        }
                    }]
                }
            }
        });

        webscene.add(countryBoundaries);

        const overview = new SceneView({
            container: targetContainer,
            map: webscene,
            id: targetContainer,
            ui: {
                components: []
            },
            alphaCompositingEnabled: true,
            environment: {
                background: {
                    type: "color",
                    // set the color alpha to 0 for full transparency
                    color: [255, 252, 244, 0]
                },
                starsEnabled: false,
                atmosphereEnabled: false
            }
        });

        return {
            view: overview,
            graphic: new Graphic({
                id: targetContainer + 'Graphic',
                geometry: overview.position,
                symbol: new PointSymbol3D({
                    callout: {
                      type: "line",
                      color: [0,0,0,1],
                      size: 0
                    },
                    symbolLayers: [
                 
                      {
                        type: "object",
                        anchor: "center",
                        anchorPosition: {
                          x: 0,
                          y: 0,
                          z: 0
                        },
                        castShadows: false,
                        depth: 10,
                        heading: 0,
                        height: 10,
                        material: {
                          color: [255,0,0,1]
                        },
                        resource: {
                          primitive: "sphere",
                        },
                        roll: 0,
                        tilt: 0,
                        width: 10
                      },
                      
                    ],
                    verticalOffset: {
                      maxWorldLength: 100,
                      minWorldLength: 0,
                      screenLength: 0
                    }
                  })
            })
        };
    }

    const overviewGl = new GraphicsLayer({
        id: 'overviewGl'
    });
    map.add(overviewGl);

    const overview1 = createScene(["#FAA732", "#DE1770", "#5EADE1"], "overview1");
    const overview2 = createScene(["#7F2C85", "#F8EB35", "#AE1B2A"], "overview2");
    // const overview3 = createScene(["#1FB8B5", "#EAECAA", "#612F91"], "overview3");
    // const overview4 = createScene(["#E2242D", "#106BAC", "#E5922B"], "overview4");

    // TODO: add one time, then update
    overviewGl.add(overview1.graphic);
    overview1.view.watch("camera", (c) => {
        console.log('connect to edge', )
        
        vElement.georeference.extent.xmin = c.position.latitude;
        vElement.georeference.extent.ymin = c.position.longitude;
    })
    overview1.graphic

    // overview1.when().then((v) => {
    // })

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