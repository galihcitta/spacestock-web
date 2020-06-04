import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import '../styles.css'

const MyMap = (props) => {
    const [activeListing, setActiveListing] = useState(null)
    
    let listingsToUse = []
    let latitudeCenter = 0
    let longitudeCenter = 0

    if (props.listingsInfo.length > 0) {
        listingsToUse = props.listingsInfo
        let allLatitudes = props.listingsInfo.map((el) => el.latitude)
        let allLongitudes = props.listingsInfo.map((el) => el.longitude)

        latitudeCenter =
            allLatitudes.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            ) / props.listingsInfo.length
        
        longitudeCenter =
            allLongitudes.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ) / props.listingsInfo.length

    }

    return (
        <Map center={[latitudeCenter, longitudeCenter]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {listingsToUse.map((el) => (
                <Marker
                  key={el.id}
                  position={[el.latitude, el.longitude]}
                  onClick={() => {
                    setActiveListing(el)
                  }}
                />
            ))}

            {activeListing && (
                <Popup
                  position={[activeListing.latitude, activeListing.longitude]}
                  onClose={() => {
                    setActiveListing(null)
                  }}
                >
                  <div className="leading-tight">
                    <img
                      className="w-20"
                      src={`${activeListing.images.primary}`}
                      alt="Listing"
                    />
                    <h2 className="text-xl text-gray-900 font-bold">
                      {activeListing.name}
                    </h2>
                    <Link to={`/listing/${activeListing.id}`}>Lihat Detail</Link>
                  </div>
                </Popup>
            )}
        </Map>
    )
}

export default MyMap