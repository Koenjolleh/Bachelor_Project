import React, { Component } from 'react';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Point } from 'ol/geom';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import {  defaults as defaultControls, Attribution } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import { transform } from 'ol/proj';

//Styles
import './styles.css';
import marker from '../../../assets/marker.png';

class MapBBB extends Component {
    state = {
        zoom: 18,
        maxZoom: 20,
        minZoom: 2,
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {   
        this.createMap(this.props.selectedLocation); 
    }

    createMap = (coordinates) => {
        const center = transform([coordinates.longitude,coordinates.latitude], 'EPSG:4326', 'EPSG:3857'); 
        const view = new View({
            center: center,
            zoom: this.state.zoom,
            maxZoom: this.state.maxZoom,
            minZoom: this.state.minZoom,
            projection: 'EPSG:3857'
        });

        const source = new XYZ({
            url: `https://api.mapbox.com/styles/v1/max-cl/cjo4qkmab07c52sqrx6vmoa11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}` //dark
        });
          
        const baseLayer = new TileLayer({
            source: source
        });

        // START CIRCLE
        const circle = new Circle(
            center,
            20
        );

        const circleFeature = new Feature(circle);  

        const painted = this.paintLayer('rgba(0, 229, 255, 0.1)', 'rgba(0, 229, 255, 0.8)', 2);
        circleFeature.setStyle(painted);  

        const vectorSource = new VectorSource({
            features: [circleFeature]
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource
        });
        // END CIRCLE

        // START MARKER
        const iconFeature = new Feature({
            geometry: new Point(center),
            name: 'Null Island',
            population: 4000,
            rainfall: 500
        });
    
        const iconStyle = new Style({
            image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
                anchor: [0.5, 50],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: [marker]
            }))
        });
    
        iconFeature.setStyle(iconStyle);
    
        const vectorSource2 = new VectorSource({
            features: [iconFeature]
        });
    
        const vectorLayer2 = new VectorLayer({
            source: vectorSource2
        });
        vectorLayer2.setZIndex(parseInt(1000, 10));
        // END MARKER

        new Map({
            target: this.refs.mapContainer,
            controls: defaultControls().extend([
                // new ZoomSlider(),
                // new FullScreen(),
                new Attribution()
            ]), 
            attributionOptions: {
                collapsible: false
            },
            interactions: defaultInteractions({
                mouseWheelZoom: true
            }),
            renderer: 'canvas',
            layers: [baseLayer, vectorLayer, vectorLayer2],
            view: view,
            minResolution: "auto",
            maxResolution: "auto"
        });
    };

   
    //Paint the address founded
    paintLayer = (fillColor, strokeColor, widthStroke) => {
        const StyleAddress = new Style({
            fill: new Fill({
                color: fillColor
            }),
            stroke: new Stroke({
                color: strokeColor,
                width: widthStroke
            })
        });
        return StyleAddress;
    };

    render() {
        return (
            <div id="map" className="map" ref="mapContainer"> </div>
        );
    }
}

export default MapBBB;
