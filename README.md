# ArcGIS-JSSDK-craftySamples
Crafty samples for the ArcGIS Maps SDK for JavaScript. Mostly adjustments of pre-existing samples.

## Setup

After cloning the repository, simply run:

```bash
npm install
```

This will automatically install the git hooks that enable automatic TOC generation. The installation is handled by npm's `prepare` script, which runs in the following situations:
- After running `npm install`
- After cloning the repository
- Before the package is packed for publishing
- Before creating a new git commit

This ensures that the TOC generation hooks are always properly set up, regardless of how the repository is installed or used.

The Table of Contents in `index.html` will now automatically update whenever you commit changes.

## Samples

1. ["Insta Story on TV"-style MapView](./instaStoryOnTvStyleMapView)<br/>
   Live demo on JSFiddle: https://jsfiddle.net/esride_nik/c920k6mo/13/
2. [Hambacher Neuseenland](./hambacherNeuseenland)<br/>
   Live demo on JSFiddle: https://jsfiddle.net/esride_nik/rya0kqcx/4/
3. [GeoJSON Building Footprints](./geoJsonBuildingFootprints/)<br/>
   * Derived from: https://developers.arcgis.com/javascript/latest/sample-code/layers-geojson/
   * Data source: https://osmbuildings.org/documentation/data/