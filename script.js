// Require the necessary modules
require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "dojo/domReady!"
], function(WebScene, SceneView, Camera, Home, Legend, LayerList) {

  // Create a new WebScene using the portal item ID of the web scene to load
  var scene = new WebScene({
    portalItem: {
      id: "8046207c1c214b5587230f5e5f8efc77"
    }
  });

  // Create a new SceneView using the WebScene and a Camera instance
  var view = new SceneView({
    container: "viewDiv",
    map: scene,
    camera: new Camera({
      position: [
        -71.060217, // lon
        42.382655, // lat
        2500 // elevation in meters
      ],
      tilt: 45,
      heading: 180
    })
  });

  // Wait for the view to load the web scene
  view.when(function() {
    // Get the first feature layer from the web scene
    var featureLayer = scene.layers.getItemAt(1);

    // Create a new Legend widget using the view and the feature layer
    var legend = new Legend({
      view: view,
      layerInfos: [{
        layer: featureLayer,
        title: "Major project buildings"
      }]
    });

    // Create a new LayerList widget using the view
    var layerList = new LayerList({
      view: view
    });

    // Add the Legend widget to the bottom-right corner of the view's UI
    view.ui.add(legend, "bottom-right");

    // Add the LayerList widget to the top-right corner of the view's UI
    view.ui.add(layerList, "top-right");
  });

  // Create a new Home widget using the view
  var homeBtn = new Home({
    view: view
  });

  // Add the Home widget to the top-left corner of the view's UI
  view.ui.add(homeBtn, "top-left");
});
