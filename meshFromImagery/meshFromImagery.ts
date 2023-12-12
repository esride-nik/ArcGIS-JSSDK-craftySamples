import SceneView from "@arcgis/core/views/SceneView";

let view: SceneView;
document?.querySelector("arcgis-scene")?.addEventListener("viewReady", async (event: any) => {
    view = event.detail.view;
    runApp();
});

const runApp = () => {
    console.log('View \'s ready. Continue imperatively from here.', view);
}
