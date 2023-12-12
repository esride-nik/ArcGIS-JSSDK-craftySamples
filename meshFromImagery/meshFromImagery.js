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
var _a;
let view;
(_a = document === null || document === void 0 ? void 0 : document.querySelector("arcgis-scene")) === null || _a === void 0 ? void 0 : _a.addEventListener("viewReady", (event) => __awaiter(void 0, void 0, void 0, function* () {
    view = event.detail.view;
    runApp();
}));
const runApp = () => {
    console.log('View \'s ready. Continue imperatively from here.', view);
};
