# ArcGIS-JSSDK-craftySamples
Crafty samples for the ArcGIS Maps SDK for JavaScript. Mostly adjustments of pre-existing samples.

## Setup

After cloning the repository, install the git hooks to enable automatic TOC generation:

```bash
# Make the install script executable
chmod +x scripts/install-hooks.sh
# Install the hooks
./scripts/install-hooks.sh
```

The Table of Contents in `index.html` will now automatically update whenever you commit changes.

## Samples

1. ["Insta Story on TV"-style MapView](./instaStoryOnTvStyleMapView)<br/>
   Live demo on JSFiddle: https://jsfiddle.net/esride_nik/c920k6mo/13/
2. [Hambacher Neuseenland](./hambacherNeuseenland)<br/>
   Live demo on JSFiddle: https://jsfiddle.net/esride_nik/rya0kqcx/4/
3. [GeoJSON Building Footprints](./geoJsonBuildingFootprints/)<br/>
   * Derived from: https://developers.arcgis.com/javascript/latest/sample-code/layers-geojson/
   * Data source: https://osmbuildings.org/documentation/data/