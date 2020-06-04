import React, { useState, useEffect } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from 'axios'
import MapDetail from '../Map/MapDetail'


function ListingInfo(props) {

    let pictures = ''
    if (Object.keys(props.images).length > 0) {
    pictures = props.images.others.map((el, index) => (
      <img
        className="w-32 sm:w-48 sm:w-64 lg:w-64 lg:h-64 shadow-sm lg:px-1 lg:object-center lg:object-cover"
        key={index}
        src={`${props.images.others[index]}`}
        alt="Listing"
      />
    ))
  }

  return (
    <div className="flex flex-col lg:w-full">
        <div className="flex py-2 h-40 sm:justify-around lg:px-6 lg:w-full lg:flex-grow lg:justify-start overflow-hidden">
            {pictures}
        </div>
      
        <div className="p-6 lg:flex lg:flex-col">
            <div className="lg:flex">
                <div className="lg:w-1/2">
                    <p className="font-bold text-gray-900 mt-4 text-xl">
                        Informasi Properti:
                    </p>
                   
                    <p className="font-medium text-gray-900 mt-3">Alamat:</p>
                    <p>
                        {props.address.street}, {props.address.city}, {props.address.country}
                    </p>
                   

                  <div className="flex">
                    <div>
                        <p className="mt-3">
                        Jenis Bangunan: {props.type}
                        </p>
                    </div>
                    
                 </div>

                 <p className="font-medium text-gray-900 mt-3">Deskripsi:</p>
                 <p className="mt-2 bg-white p-4 shadow-xl">{props.description}</p>
                  <div>
                   
                   </div>
                </div>
                <div className="lg:w-1/2">
                    <p className="font-bold text-gray-900 mt-4 text-xl">Fasilitas:</p>
                   

                    <div className="flex">
                        <div>
                           
                              {props.facilities.map((facility,i) => 
                                <span key={i} className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                {facility}
                               </span>
                                )}
                        </div>
                        
                             
                      
                    </div>
                </div>
                <div className="lg:w-1/2">
                <p className="font-bold text-gray-900 mt-4 text-xl">Peta Lokasi</p>
                <MapDetail lat={props.latitude} long={props.longitude} />
                </div>
            </div>
        </div>
    </div>
  )
}

const ApartmentDetail = ({ match }) => {
    const [data, setData] = useState('')
    const [alert, setAlert] = useState('')

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/apartment/${match.params.id}`,
                  })
                setData(response.data)
            } catch (e) {
                return setAlert(
                    <SweetAlert
                      danger
                      title="Woot!"
                      customButtons={
                        <React.Fragment>
                          <input
                            onClick={() => setAlert(null)}
                            value="Ok"
                            type="submit"
                            className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                          />
                        </React.Fragment>
                      }
                    >
                      Problems to retrieve the information. Please, try again later.
                    </SweetAlert>
                  )
            }
        }
        fetchListings()
    }, [])

    const headerCity = data === '' ? '' : `Lokasi di ${data.address.city}`
    const headerTitle = data === '' ? '' : data.name
    const result = data === '' ? '' : <ListingInfo {...data} />

    return (
        <div>
        {alert}
        <div className="px-6 py-3 bg-themeGreen">
          <p className="font-bold text-gray-900">{headerCity}</p>
          <h1 className="font-bold text-2xl text-gray-900">{headerTitle}</h1>
        </div>
        <div className="bg-gray-100">{result}</div>
      </div>
    )
}

export default ApartmentDetail