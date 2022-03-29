import React from "react";
import SearchBar from "./SearchBar"
import { useState } from "react";

const SearchRecipe = () => {
    const [searchResult, setSearchResult] = useState(null)
    
    const onResult = (result) => {
    setSearchResult(result)
    }

    return (
        <div>
        <SearchBar onResult={onResult}/>
        <div>{searchResult && (
            <div>
            <p>Your results:</p>
            <ul>
                {searchResult.map((recipe, index) => {
                        return <li key={index}>{recipe.name}</li>
                })}
            </ul>
            </div>
            )}
        </div>
        </div>
    )
}

export default SearchRecipe