import React from 'react'

const ApartmentPaginate = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="py-2">
        <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
                {pageNumbers.map(number => (
                    <li key={number} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                        <a href="#" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    )
}

export default ApartmentPaginate