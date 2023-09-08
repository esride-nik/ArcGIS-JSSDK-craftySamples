require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/layers/ImageryLayer",
  "esri/layers/GraphicsLayer",
  "esri/Basemap",
  "esri/views/SceneView",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Expand",
  "esri/widgets/Search",
  "esri/widgets/LayerList",
  "esri/geometry/Polyline",
  "esri/symbols/LineSymbol3D"
], (
  Map,
  FeatureLayer,
  ImageryLayer,
  GraphicsLayer,
  Basemap,
  SceneView,
  BasemapGallery,
  Expand,
  Search,
  LayerList,
  Polyline,
  LineSymbol3D
) => {
  // 3D topo basemap with satellite imagery + labels
  const map = new Map({
    basemap: new Basemap({
      portalItem: {
        id: "0560e29930dc4d5ebeb58c635c0909c9", // References the 3D Topographic Basemap
      },
    }),
  });
  map.basemap = "hybrid";

  // ISS layer
  const issFl = new FeatureLayer({
    url: "https://services1.arcgis.com/1a2tmD6ZLIYsIeMb/ArcGIS/rest/services/Position_ISS/FeatureServer/0",
    refreshInterval: 0.05,
    id: "issPosition",
    renderer: {
      type: "simple",
      symbol: {
        angle: 0,
        xoffset: 0,
        yoffset: 0,
        type: "picture-marker",
        url:
          "data:image/png;base64," +
          "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",
        contentType: "image/png",
        width: 30,
        height: 22.439024390243905,
      },
    },
    labelingInfo: [
      {
        labelExpressionInfo: {
          expression: document.getElementById("label-expression").text,
        },
        useCodedValues: true,
        maxScale: 0,
        minScale: 0,
        where: null,
        labelPlacement: "center-right",
        symbol: {
          color: [255, 140, 0, 255],
          type: "text",
          backgroundColor: [0, 0, 0, 0.3],
          borderLineColor: null,
          haloSize: 0,
          haloColor: null,
          horizontalAlignment: "left",
          rightToLeft: false,
          angle: 0,
          xoffset: 0,
          yoffset: 0,
          text: "",
          rotated: false,
          kerning: true,
          font: {
            size: 8.25,
            style: "normal",
            decoration: "none",
            weight: "bold",
            family: "Arial",
          },
        },
      },
    ],
    transparency: 0,
  });
  map.add(issFl);

  // create graphic layer for ground ray

  // global graphic
  let groundRayGraphic;
  let groundRayGraphicLayer;

  // adding more feature layers via URLs or AGO item IDs
  const operationalFlProps = [
    {
      portalItem: { id: "dece90af1a0242dcbf0ca36d30276aa3" },
      id: "fireHazard",
    },
    {
      portalItem: { id: "248e7b5827a34b248647afb012c58787" },
      id: "activeHurricanes",
    },
    {portalItem: {id: "86e297ef8b194badbc17892ceb29f50e"}, id: "satelliteOrbits", visible: false, renderer: {authoringInfo: {},type: "simple",symbol: {type: "line-3d",symbolLayers: [{type: "line",material: {color: [255,255,255],transparency: 99},join: "bevel",cap: "round",size: 0.075,pattern: {type: "style",style: "solid"}}]}}}];
  const operationalFls = operationalFlProps.map(
    (flProps) => new FeatureLayer(flProps)
  );
  map.addMany(operationalFls);

  // adding imagery layers via URLs or AGO item IDs
  const operationalIlProps = [
    {
      portalItem: { id: "00873877644147a9868fd622cf601eab" },
      id: "seaSurface",
      visible: false,
    },
    {
      portalItem: { id: "fe200cff94624a938b042d68beeaa13a" },
      id: "landCover20180",
      visible: false,
    },
    {
      portalItem: { id: "cee96e0ada6541d0bd3d67f3f8b5ce63" },
      id: "landCover2050",
      visible: false,
    },
  ];
  const operationalIls = operationalIlProps.map(
    (ilProps) => new ImageryLayer(ilProps)
  );
  map.addMany(operationalIls);

  // init scene and interact with ISS
  let syncIssPosition = true;
  let syncSwitchDiv;
  let syncSwitch;
  let groundPosition;
  let groundRayGraphicOpacity = 0.3;
  let zoomInput;
  let tiltInput;
  const view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: {
        spatialReference: { latestWkid: 3857, wkid: 102100 },
        x: 3042297.300734445,
        y: 5849186.4538756,
        z: 21476163.859991025,
      },
      heading: 3.805369017745423,
      tilt: 0.11448271836777343,
    },
  });

  const getGroundRayGraphic = (polyline) => {
    const options = {
      profile: "quad",
      cap: "round",
      join: "miter",
      width: 3000,
      height: 3000,
      color: [200, 200, 200, groundRayGraphicOpacity],
      profileRotation: "all",
    };
    return {
      geometry: polyline,
      symbol: new LineSymbol3D({
        symbolLayers: [
          {
            type: "path",
            profile: options.profile,
            material: {
              color: options.color,
            },
            width: options.width,
            height: options.height,
            join: options.join,
            cap: options.cap,
            anchor: "bottom",
            profileRotation: options.profileRotation,
          },
        ],
      }),
    };
  };

  view.when((v) => {
    groundRayGraphic = getGroundRayGraphic(
      new Polyline({
        hasZ: true,
        spatialReference: { latestWkid: 3857, wkid: 102100 },
        paths: [
          [
            [0, 0, 0],
            [0, 0, 400000],
          ],
        ],
      })
    );
    groundRayGraphicLayer = new GraphicsLayer({
      id: "groundRayGraphicLayer",
      graphics: [groundRayGraphic]
    });
    map.add(groundRayGraphicLayer);

    // initial zoom to ISS
    updateCameraPosition(1);

    // connect sync switch
    syncSwitch = document.getElementById("syncSwitch");
    syncSwitch.checked = true;
    syncSwitch.addEventListener("calciteSwitchChange", (sw) => {
      syncIssPosition = sw.srcElement.checked;
      console.log("Sync ISS position:", syncIssPosition);
      if (syncIssPosition === true) {
        updateCameraPosition();
      }
    });

    // connect groundPosition switch
    groundPosition = document.getElementById("groundPosition");
    groundPosition.checked = true;
    groundPosition.addEventListener("calciteSwitchChange", (sw) => {
      groundRayGraphicOpacity = sw.srcElement.checked ? 0.3 : 0.0;
    });

    // connect zoom input
    zoomInput = document.getElementById("zoomInput");
    zoomInput.value = 6;
    zoomInput.addEventListener("calciteInputNumberChange", (inp) => {
      if (syncIssPosition === true) {
        updateCameraPosition(1, false);
      }
    });

    // connect tilt input
    tiltInput = document.getElementById("tiltInput");
    tiltInput.value = 40;
    tiltInput.addEventListener("calciteInputNumberChange", (inp) => {
      if (syncIssPosition === true) {
        updateCameraPosition(1, false);
      }
    });
  });

  const updateCameraPosition = async (speedFactor = 0.1, bgColAni = true) => {
    const flq = issFl.createQuery();
    flq.where = "1=1";
    flq.returnZ = true;
    const flqres = await issFl.queryFeatures(flq);
    if (flqres.features.length > 0) {
      if (syncSwitchDiv && bgColAni) {
        syncSwitchDiv.classList.add("newData");
      }
      const iss = flqres.features[0];

      // update ground ray      
      groundRayGraphicLayer.graphics.items[0].geometry = new Polyline({
        hasZ: true,
        spatialReference: { latestWkid: 3857, wkid: 102100 },
        paths: [
          [
            [iss.geometry.x, iss.geometry.y, 0],
            [iss.geometry.x, iss.geometry.y, iss.geometry.z],
          ],
        ],
      });
      
  //     const groundRaySymbol = groundRayGraphicLayer.graphics.items[0].symbol.clone(); groundRayGraphicLayer.graphics.items[0].symbol.symbol = groundRaySymbol;
  // console.log("groundRayGraphic", JSON.stringify(groundRayGraphicLayer.graphics.items[0].geometry));

      // update camera
      await view.goTo(
        {
          target: iss.geometry,
          tilt: tiltInput ? tiltInput.value : 40,
          zoom: zoomInput ? zoomInput.value : 6,
        },
        {
          animate: true,
          speedFactor: speedFactor,
        }
      );
      if (syncSwitchDiv && bgColAni) {
        syncSwitchDiv.classList.remove("newData");
      }
    }
  };

  issFl.on("refresh", async (r) => {
    console.log("fl refreshed", r.dataChanged, syncIssPosition);
    // TODO: if data changed, store time difference and new position and start animation (single frames)
    if (r.dataChanged === true && syncIssPosition) {
      updateCameraPosition();
    }
  });

  const bgExpand = new Expand({
    expandIcon: "basemap",
    expandTooltip: "Basemap Gallery",
    view: view,
    content: new BasemapGallery({
      view: view,
    }),
  });

  const lyrExpand = new Expand({
    expandIcon: "layers",
    expandTooltip: "Layer List",
    view: view,
    content: new LayerList({
      view: view,
    }),
  });

  const searchWidget = new Search({
    view: view,
  });

  syncSwitchDiv = document.createElement("div");
  syncSwitchDiv.id = "syncSwitchDiv";
  syncSwitchDiv.innerHTML = `<calcite-label id="syncSwitchLabel" layout="inline"><calcite-switch id="syncSwitch"></calcite-switch>Sync ISS position</calcite-label>
<calcite-label id="groundPositionLabel" layout="inline"><calcite-switch id="groundPosition"></calcite-switch>Show ground position</calcite-label>
<calcite-input-number id="zoomInput" step="1" min="1" max="15" maxLength="2" icon="zoom-to-object" alignment="end"></calcite-input-number>
<calcite-input-number id="tiltInput" step="1" min="1" max="90" maxLength="2" icon="center-vertical" alignment="end"></calcite-input-number>`;

  view.ui.add([syncSwitchDiv, searchWidget, bgExpand, lyrExpand], {
    position: "top-right",
  });
});
