import React from "react";
import { useState } from "react";
import { getSearch } from './api'


const SearchBar = ({ onResult, setIsSearchDisplay }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (e) => {
        const input = e.target.value
        setSearchTerm(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await getSearch(searchTerm)
        if (res.status === 200) {
            const searchResult = res.data
            onResult(searchResult)
            setIsSearchDisplay(true)
            setSearchTerm('')
        } else {
            console.log('There is an error!')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search for term:</label>
            <input
                id="search"
                name="searchTerm"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
            ></input>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar