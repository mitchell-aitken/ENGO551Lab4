# ENGO 551 - Lab 4 

Mitchell Aitken - Winter 2024

## Project Overview

This project showcases the integration of a custom-designed Mapbox vector tileset into a Leaflet-based web mapping application.
The primary goal was to enhance the existing GeoWeb application from Lab 3 by adding a toggleable map layer, which displays traffic incident data for Calgary, styled and hosted using Mapbox.

## Implementation Details

### Mapbox Vector Tileset and Style

- **Data Preparation**: Utilized the 2017 Traffic Incidents dataset from Open Calgary, imported into Mapbox Studio as a CSV file.
- **Styling**: Developed a unique style in Mapbox Studio, focusing on visual clarity and user engagement. Adjusted properties such as color, radius, blur, and opacity to ensure the data is represented accurately and appealingly.
- **Publishing**: The styled layer was then published on Mapbox, and then integrated into the Leaflet application.

### Leaflet.js Integration

- **Custom Layer Integration**: The Mapbox style layer was added to the Leaflet map using the `L.mapbox.styleLayer` method. 
- **Toggle Functionality**: Implemented a toggle button on the webpage, enabling users to show or hide the custom Mapbox layer as well as dark and light basemap. Allows users to compare the base map with the overlaid traffic incidents data.


## Design Rationale

The map layer was designed with a focus on user experience, making it both informative and aesthetically pleasing.
The chosen colors and styles are dark themed, aim to make the data stand out against the base map, while not overwhelming the user with too much visual complexity.

