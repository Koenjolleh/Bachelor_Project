import React, { Component } from 'react';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Polygon, Point } from 'ol/geom';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import {  defaults as defaultControls, Attribution } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import { transform } from 'ol/proj';

//Styles
import './styles.css';
import marker from '../../../assets/marker.png';

class MapBBB extends Component {
    state = {
        centerLong: 12.5700724,
        centerLat: 55.6867243,
        centerPoint: [],
        zoom: 2,
        maxZoom: 20,
        minZoom: 2,
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this.createCenterPoint();        
    }

    componentDidUpdate(prevProps, prevState) {
        const { centerPoint } = this.state;
        const { initialMap } = this.props;
        if(initialMap !== prevProps.initialMap){
            this.createCircleLayer(this.props.selectedLocation);            
        }
        if(centerPoint !== prevState.centerPoint){
            this.createMap();
        }
    }

    createCenterPoint = () => {
        const centerPoint = transform([this.state.centerLong, this.state.centerLat], 'EPSG:4326','EPSG:3857');
        this.setState({
            centerPoint: centerPoint
        });
    }

    createMap = () => {
        const view = new View({
            center: this.state.centerPoint,
            zoom: this.state.zoom,
            maxZoom: this.state.maxZoom,
            minZoom: this.state.minZoom,
            projection: 'EPSG:3857'
        });

        const source = new XYZ({
            
            //url: `https://api.mapbox.com/styles/v1/max-cl/cjo4qlyz90a7f2rou5h3ozfcv/tiles/256/{z}/{x}/{y}?access_token=${token_map}#18.4/48.136484/11.575265/0` //light
            //url: `https://api.mapbox.com/styles/v1/max-cl/cjo4qkmab07c52sqrx6vmoa11/tiles/256/{z}/{x}/{y}?access_token=${token_map}#10/42.3624/-71.02` //dark
            url: `https://api.mapbox.com/styles/v1/max-cl/cjo4qkmab07c52sqrx6vmoa11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}` //dark
            //url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${token_map}`
            
        });
          
        const baseLayer = new TileLayer({
            source: source
        });

        const map = new Map({
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
            layers: [baseLayer],
            view: view,
            minResolution: "auto",
            maxResolution: "auto"
        });
        
        this.props.setInitMap(map,view,baseLayer); 
    };

    //Create a new circle layer (vectorlayer)
    createCircleLayer = (coordinates) => {        
        const center = transform([coordinates.longitude,coordinates.latitude], 'EPSG:4326', 'EPSG:3857');       
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
                
        vectorLayer.setZIndex(parseInt(1000, 10));
        this.removeOldAddress();
        this.pushLayer(vectorLayer);
        this.setMarkerIntoMap(center);
        this.centerAddress(center);
        //this.updateSizeMap();
    }    

    setMarkerIntoMap = (coordinates) => {
        const iconFeature = new Feature({
            geometry: new Point(coordinates),
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
    
        const vectorSource = new VectorSource({
            features: [iconFeature]
        });
    
        const vectorLayer = new VectorLayer({
            source: vectorSource
        });

        vectorLayer.setZIndex(parseInt(1000, 10));
        this.pushLayer(vectorLayer);
    }

    updateSizeMap = () => {
        this.props.initialMap.map.updateSize();
    }

    //Add new Layer to the map
    pushLayer = (layer) => {
        // console.log("initialMap: ", this.props.initialMap);
        this.props.initialMap.map.addLayer(layer);
    }

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

    // Center the address founded
    centerAddress = (coord) => {
        const map = this.props.initialMap.map;
        const view =  map.getView();
        view.setCenter(coord);
        view.setZoom(18);
    };

    //Remove old layers (Address)  
    removeOldAddress = () => {   
        const map = this.props.initialMap.map;

        //FIX: change to a object {} and manage with map.layersToRemove
        let layersToRemove = [];
        map.getLayers().forEach(function (layer) {
            layersToRemove.push(layer);        
        });
    
        const len = layersToRemove.length;
        let i = 0;
        if(len > 1){
            for(i = 1; i < len; i++) { 
                map.removeLayer(layersToRemove[i]);
            }
        }else {
            return false;
        }
    }

    makePolygonFromCoordinates = (coordinates) => {
        let polygon_feature = new Feature({});
        const polygon_geom = new Polygon(coordinates);
        polygon_feature.setGeometry(polygon_geom);
        polygon_feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        return polygon_feature.getGeometry();
    }

    getCenterOfExtent = (polygon) => {
        const bounds = polygon.getExtent(); 
        const x_min  = bounds[0];
        const x_max  = bounds[2];
        const y_min  = bounds[1];
        const y_max  = bounds[3];

        const X = x_min + (x_max-x_min)/2;
        const Y = y_min + (y_max-y_min)/2;
        const center = [X, Y]; 

        return center;
    }

    //TODO: ESPERAR POLYGONO DESDE EL BACKEND
    // makePolygonFromCentroid = (coordinates) => {
    //     // const initialPolygon = this.makePolygonFromCoordinates(coordinates);
    //     // const centerPolygon = this.getCenterOfExtent(initialPolygon);
    //     const centerPolygon = [coordinates.longAddress,coordinates.latAddress];
    //     //const center = transform(centerPolygon, 'EPSG:3857', 'EPSG:4326');        
    //     const radius = 0.353;
    //     const options = {steps: 64, units: 'kilometers', properties: {zone: 'zone'}};
    //     const circle = turf.circle(centerPolygon, radius, options);
    //     let polygon = new Polygon([circle.geometry.coordinates[0]]);
    //     polygon.transform('EPSG:4326', 'EPSG:3857');
    
    //     // Create feature with polygon.
    //     var feature = new Feature(polygon);

    //     const painted = this.paintLayer('rgba(0, 229, 255, 0.1)', 'rgba(0, 229, 255, 0.8)', 1);
    //     feature.setStyle(painted);
    
    //     // Create vector source and the feature to it.
    //     var vectorSource = new VectorSource();
    //     vectorSource.addFeature(feature);
    
    //     // Create vector layer attached to the vector source.
    //     var vectorLayer = new VectorLayer({
    //         source: vectorSource
    //     });
                
    //     //this.pushLayer(vectorLayer);
    // }


    render() {
        return (
            <div id="map" className="map" ref="mapContainer"> </div>
        );
    }
}

export default MapBBB;
