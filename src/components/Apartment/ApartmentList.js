import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import axios from 'axios'
import MyMap from '../Map/MyMap'
import ApartmentCard from './ApartmentCard'
import { FiMap } from 'react-icons/fi'
import { FiList } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import AlgoliaPlaces from 'algolia-places-react'

const ApartmentList = (props) => {
    const [data, setData] = useState([])
    const [showMap, setShowMap] = useState(true)
    const [isFetching, setIsFetching] = useState(true)
    const [citySelected, setCitySelected] = useState('')
    const { handleSubmit } = useForm()
    const onSubmit = (data) =>
        props.history.push('/listings', { response: citySelected })

    let queryCityURL = ''
    let selectedCity = 'Seluruh Indonesia'

    if (
        props.location.state === undefined ||
        props.location.state.response === ''
      ) {
        queryCityURL = 'http://localhost:3000/apartment'
      } else {
        queryCityURL = `http://localhost:3000/apartment/?address.city=${
          props.location.state.response.split(',')[0]
        }`
        selectedCity = props.location.state.response.split(',')[0]
        console.log(selectedCity)
      }

      useEffect(() => {
          const fetchListings = async () => {
            try {
                const response = await axios({
                  method: 'GET',
                  url: queryCityURL,
                })
                setIsFetching(false)
                setData(response.data)
                //console.log(response.data)
            } catch (e) {
                console.log(e)
            }
          }
          fetchListings()
      }, [queryCityURL])

    let results
    if (data.length > 0) {
        results = data.map((el, index) => <ApartmentCard key={el.id} {...el} />)
    } else {
        results = (
        <div className="flex items-center flex-col justify-center w-full h-full flex-grow bg-gray-100 text-gray-800">
            <h2 className="font-bold text-6xl">Sorry,</h2>
            <h3 className="font-base">Hasil pencarian apartement di kota tersebut tidak ditemukan</h3>
        </div>
        )
    }

    return (
        <div className="bg-red-300 flex flex-col lg:max-h-screen">
            {alert}
            <div className="relative px-6 py-3 bg-themeGreen flex items-center content-center">
               
                <div>
                <form
                className="flex flex-col w-full items-center sm:w-full sm:flex-row lg:w-4/5"
                onSubmit={handleSubmit(onSubmit)}
                >
                <AlgoliaPlaces 
                                className="w-64 px-10 md:px-16 shadow p-1 appearance-none text-xl border lg:text-xl rounded-lg text-gray-700 focus:outline-none focus:shadow-outline text-center md:w-full md:flex-grow"
                                placeholder="Cari kota"
                                options={{
                                    appId: process.env.REACT_APP_AP_ID,
                                    apiKey: process.env.REACT_APP_AP_KEY,
                                    type: 'city'
                                  }}
                                onChange={({ suggestion }) => {
                                    let state = suggestion.hasOwnProperty('administrative')
                                      ? suggestion.administrative
                                      : suggestion.hit.administrative[0]
                                    setCitySelected(`${suggestion.name}, ${state}`)
                                }}  
                                onError={({ message }) =>
                                    console.log('Sorry there is error with your API')
                                }
                            />
                            <input
                                className="mt-4 sm:mt-0 bg-themeYellow mx-1 px-3 py-1 lg:ml-6 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                                type="submit"
                                value="Search"
                            />
                </form>
                </div>
                <div className=".right-auto">
                <p className="font-light text-gray-900">Pencarian di:</p>
                <h1 className="font-bold text-2xl text-gray-900">{selectedCity}</h1>
            </div>
              
                <div
                    onClick={() => setShowMap(!showMap)}
                    className="absolute inset-y-0 right-0 m-3 cursor-pointer bg-white rounded-full w-16 h-16 flex items-center justify-center border shadow-xl border-teal-200 lg:hidden"
                >
                {showMap ? (
                    <FiList className="text-2xl text-teal-600" />
                ) : (
                    <FiMap className="text-2xl text-teal-600" />
                )}
                </div>
            </div>
            <div className="bg-gray-100 lg:flex lg:overflow-hidden">
                <div
                    className={`
                    ${
                        showMap
                        ? 'hidden'
                        : 'p-6 lg:p-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-around lg:justify-start lg:w-2/3 lg:overflow-y-scroll'
                    } p-6 lg:p-4 lg:flex lg:flex-row lg:flex-wrap sm:justify-around lg:justify-start lg:w-2/3 lg:overflow-y-scroll`}
                >
                    {!isFetching ? results : ''}
                    <div
                        className={`${
                            isFetching ? '' : 'hidden'
                        } w-full m-auto flex justify-center content-center items-center`}
                    >
                        <ReactLoading type="spin" color="#7BFFB7" height={70} width={70} />
                        <p className="text-2xl text-teal-800 mx-4">Looking for rooms...</p>
                    </div>
                </div>
                <div
                    className={`
                    ${
                        showMap
                        ? 'lg:inline-block lg:w-1/3 lg:bg-red-300 lg:sticky'
                        : 'hidden'
                    } lg:inline-block lg:w-1/3 lg:bg-red-300 lg:sticky`}
                >
                <MyMap listingsInfo={data} />
              </div>
            </div>
        </div>
    )
}

export default ApartmentList
