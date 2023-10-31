require(["esri/layers/StreamLayer", "esri/arcade"], (StreamLayer, arcade) => {
    const updateData = async (data, view) => {
        const visualizationProfile = arcade.createArcadeProfile("visualization");
        const rotationAE =
            await arcade.createArcadeExecutor("IIF($feature.point_direction > 0, $feature.point_direction, 360-$feature.point_direction)", visualizationProfile);

        const rot = await rotationAE.executeAsync({
            "$feature": data,
            "$view": view
        });
        console.log(data.attributes.point_direction, rot)
    }

    const createStreamLayer = () => {
        const transportationSymbols = [
            {
                value: "Car",
                name: "Audi_A6",
                styleName: "EsriRealisticTransportationStyle"
            },
            {
                value: "Bike",
                name: "Mountain_Bike",
                styleName: "EsriRealisticTransportationStyle"
            },
            {
                value: "Pedestrian",
                name: "Payphone",
                styleName: "EsriRealisticStreetSceneStyle"
            }
        ];

        const transportationRenderer = {
            type: "unique-value",
            field: "vehicle_type",
            uniqueValueInfos: transportationSymbols.map((type) => {
                return {
                    value: type.value,
                    symbol: {
                        type: "web-style",
                        name: type.name,
                        styleName: type.styleName
                    }
                };
            }),
            visualVariables: [
                {
                    type: "rotation",
                    // field: "point_direction",
                    valueExpression: "IIF($feature.point_direction > 0, $feature.point_direction, 360-$feature.point_direction"
                }
            ]
        };

        streamLayer = new StreamLayer({
            url: "https://vsaz0116.esri-de.com/server/rest/services/Traffic_Stream/StreamServer",
            purgeOptions: {
                displayCount: 10000
            },
            renderer: transportationRenderer
        });

        streamLayer.on("layerview-create", async (lv) => {
            console.log(lv);
            lv.layerView.on("data-received", (data, lv) => updateData(data));
        });

        return streamLayer;
    };

    document.querySelector("arcgis-scene")?.addEventListener("viewReady", async (event) => {
        const view = event.detail.view;
        // const sceneLayer = view.map.allLayers.items.filter((l) => l.id == "18b80f91a4b-layer-0")[0];
        // sceneLayer.visible = false;
        // console.log("viewReady", view, sceneLayer);

        view.popup = {
            defaultPopupTemplateEnabled: true,
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: false,
                breakpoint: false
            }
        }

        view.map.add(createStreamLayer());
    });
});
