import React from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import '../styles.css';

const MapDetail = (props) => {
    let lat = 0
    let long = 0
    lat = props.lat
    long = props.long

    return (
        <Map center={[lat, long]} zoom={12}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
                  
                  position={[lat, long]}
                
                />
        </Map>
    )
}

export default MapDetail