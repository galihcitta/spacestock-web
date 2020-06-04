import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AlgoliaPlaces from 'algolia-places-react'
import city from '../../assets/images/city.jpg'

const Home = (props) => {
    const [citySelected, setCitySelected] = useState('')
    const { handleSubmit } = useForm()
    const onSubmit = (data) =>
        props.history.push('/listings', { response: citySelected })
    

    return (
        <div className="flex flex-grow flex-col lg:flex-row-reverse">
            <div className="sm:py-4 lg:self-center">
                <img
                    className="p-4 w-full h-screen sm:w-3/4 mx-auto lg:w-auto"
                    src={city}
                    alt="Rooms"
                />
             </div>
             <div className="flex-grow sm:py-8 lg:self-center">
                <div className="px-8 mt-4">
                    <h1 className="text-gray-700 text-3xl lg:text-5xl leading-tight">
                        <span className="font-bold">Cari Apartemen!</span>
                    </h1>
                    <p className="font-light text-gray-700 text-xl md:text-2xl">
                        Properti di Ujung Jari
                        <br className="hidden md:inline lg:hidden" /> di Seluruh Indonesia
                    </p>
                    <div className="flex items-center my-auto py-8 md:w-full">
                        <form
                            className="flex flex-col w-full items-center sm:w-full sm:flex-row lg:w-4/5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <AlgoliaPlaces 
                                className="w-64 px-10 md:px-16 shadow p-1 appearance-none text-xl border lg:text-xl rounded-lg text-gray-700 focus:outline-none focus:shadow-outline text-center md:w-full md:flex-grow"
                                placeholder="Masukkan kota"
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
                    <div className="flex">
                        <div className="-my-5 mx-auto sm:mx-0">
                            <Link
                                to={{
                                    pathname: '/listings',
                                    state: { response: '' },
                                }}
                                className="text-orange-400 text-sm sm:hidden"
                            >
                                Apartements
                            </Link>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}

export default Home