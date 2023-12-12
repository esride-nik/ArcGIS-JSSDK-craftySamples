"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const GraphicsLayer_1 = __importDefault(require("@arcgis/core/layers/GraphicsLayer"));
const ImageryLayer_1 = __importDefault(require("@arcgis/core/layers/ImageryLayer"));
let view;
(_a = document === null || document === void 0 ? void 0 : document.querySelector("arcgis-scene")) === null || _a === void 0 ? void 0 : _a.addEventListener("viewReady", (event) => __awaiter(void 0, void 0, void 0, function* () {
    view = event.detail.view;
    runApp();
}));
let imageryLayer;
let volumetricGraphicsLayer;
const setupView = () => {
    const clippingAdd = 100;
    const extentAdd = 1000;
    view.viewingMode = "local";
    view.clippingArea = {
        spatialReference: { latestWkid: 3857, wkid: 102100 },
        xmin: -4891786.441670591 - clippingAdd,
        ymin: -2307257.926811594 - clippingAdd,
        xmax: -4891427.934010591 + clippingAdd,
        ymax: -2306963.3097615945 + clippingAdd,
    };
    view.extent = {
        spatialReference: { latestWkid: 3857, wkid: 102100 },
        xmin: -4891786.441670591 - extentAdd,
        ymin: -2307257.926811594,
        xmax: -4891427.934010591 + extentAdd,
        ymax: -2306963.3097615945 + extentAdd * 2,
    };
};
const addLayers = () => {
    imageryLayer = new ImageryLayer_1.default({
        id: 'Elevation in bands',
        url: 'https://tiledimageservices.arcgis.com/OLiydejKCZTGhvWg/arcgis/rest/services/VarzeaMin_DOMs/ImageServer',
        opacity: 0.9
    });
    volumetricGraphicsLayer = new GraphicsLayer_1.default({
        id: 'volumetricGraphics'
    });
    view.map.addMany([imageryLayer, volumetricGraphicsLayer]);
};
const runApp = () => {
    console.log('View \'s ready. Continue imperatively from here.', view);
    setupView();
    addLayers();
};
