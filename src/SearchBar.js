import React from "react";
import { useState } from "react";
const axios = require("axios")

const getSearch = async (searchTerm) => {
    try {
        const res = await axios.get(`http://localhost:8000/recipes/?name=${searchTerm}`)
        return res
    } catch(e) {
        console.log("There is an error!")
    }
}

const SearchBar = ({onResult}) => {
    const [searchTerm, setSearchTerm] = useState("")
    
    const handleSearchChange = (e) => {
        const input = e.target.value
        setSearchTerm(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await getSearch(searchTerm)
        if (res.status===200) {
            const searchResult = res.data
            onResult(searchResult)
        } else {
            console.log("There is an error!")
        }

    }
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Search for term:</label>
        <input name="searchTerm" type="text" value={searchTerm} onChange={handleSearchChange}></input>
        <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar