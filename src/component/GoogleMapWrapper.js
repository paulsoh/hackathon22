/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from 'react-google-maps';

import CircleMarker from './CircleMarker';

const defaultLocation = {
  lat: 37.8236034,
  lng: 127.5970519,
}

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={props.center}
    onClick={props.setCenterPosition}
  >
    <Marker 
      position={props.center}
    />
    <Circle 
      center={props.center}
      radius={props.limitRadius * 1000 }        
      options={{
          fillColor: `red`,
          fillOpacity: 0.05,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
      }}
    />
    {props.markers.map(marker => (
      <CircleMarker
        isHovered={marker._key === props.hoveredPersonnelKey}
        labelColor={marker.isSafezone}
        key={marker._key}
        center={marker.position}
        radius={10}
        options={{
          fillColor: `blue`,
          fillOpacity: 1,
          strokeColor: `blue`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    ))}

  </GoogleMap>
));

export default class GoogleMapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: defaultLocation,
      markers: [],
    };
  }

  render() {
    return (
      <SimpleMapExampleGoogleMap
        center={this.props.centerPosition}
        limitRadius={this.props.limitRadius}
        markers={this.props.personnelPositions}
        setCenterPosition={this.props.setCenterPosition}
        hoveredPersonnelKey={this.props.hoveredPersonnelKey}
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
}
