import React from 'react'
import { Link } from 'react-router-dom'

const ApartmentCard = (props) => {
    let mainPictureListing = ''
    
    let temp = Object.keys(props.images).length

    if (temp > 0) {  
        mainPictureListing = (
          <Link to={`/listing/${props.id}`} className="font-bold text-xl">
            <img
              src={`${props.images.primary}`}
              alt="Listing"
              className=" h-40 w-full object-cover object-center"
            />
          </Link>
        )
      } else {
        mainPictureListing = (
            <Link to={`/listing/${props.id}`} className="font-bold text-xl">
              <img
                src={`https://roomie-profile-pictures.s3.amazonaws.com/listingpIC-5ec361096052f8153502ae57-1590301532179.jpeg`}
                alt="Listing"
                className=" h-40 w-full object-cover object-center"
              />
            </Link>
          )
     }
    
    return (
        <div className="antialiased shadow-xl bg-white text-gray-900 rounded-lg overflow-hidden my-6 sm:w-64 lg:m-1 lg:self-start">
            {mainPictureListing}
            <div className="p-4 truncate">
                <div className="uppercase text-sm font-medium text-gray-700">
                    <p>{`${props.type}`}</p>
                </div>
                <Link to={`/listing/${props.id}`} className="font-bold text-xl">
                    {props.name}
                </Link>
                <div className="uppercase text-sm tracking-wide">
                    <p>{`${props.address.city} • ${props.address.country}`}</p>
                </div>
                <div className="leading-snug">
                </div>
                <div className="py-3 flex">
                </div>
            </div>
        </div>
    )
}
export default ApartmentCard