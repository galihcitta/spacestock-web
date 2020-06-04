import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import logo from '../assets/images/spacestock.png'
import Home from '../components/Home/Home'
import ApartmentList from '../components/Apartment/ApartmentList'
import ApartmentDetail from '../components/Apartment/ApartmentDetail'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Router>
            <div className="p-0 flex flex-col min-h-screen min-w-screen lg:max-w-screen-xl lg:mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between p-6">
                        <div className="">
                            <Link to="/">
                                <img src={logo} alt="Logo" className="w-32 lg:w-100" />
                            </Link>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="focus:outline-none lg:hidden text-3xl"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                            </button>
                      </div>
                    </div>
                    <div className={`${isOpen ? 'block' : 'hidden'} pt-1 px-5 lg:flex`}>
                    <ul
                    className="text-xl lg:bg-white lg:flex"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                        <li className="p-2 lg:px-6 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="p-2 lg:px-6 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
                            <Link to="/listings">Apartemen</Link>
                        </li>
                  </ul>
                    </div>
                </div>
                <main className="flex flex-col flex-grow">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/listings" exact component={ApartmentList} />
                        <Route path="/listing/:id" component={ApartmentDetail} />
                    </Switch>
                </main>
                <footer className="p-4 pl-6 flex justify-between items-center">
                    <div>
                        <p className="font-medium text-gray-800">By Galih Citta Surya Prasetya</p>
                    </div>
                    <div>
                        <ul className="flex flex-col ml-16 pr-6 justify-end text-sm lg:text-base lg:flex-row">
                            <li className="lg:mx-10">
                                <p className="font-bold">Frontend Technical Test</p>
                            </li>
                        </ul>
                    </div>
              </footer>
            </div>
        </Router>
    )
}

export default App