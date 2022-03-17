import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios")

const getRecipes = async () => {
    const res = await axios.get('http://localhost:8000/recipes/')
    return res.data
}


const DisplayAllRecipes = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(async() => {
        const recipes = await getRecipes()
        setRecipes(recipes)
     }, [])
    
    return (
        <div>
            <ul>
                {recipes.map((recipe, index) => {
                        return <li key={index}>{recipe.name}</li>
                })}
            </ul>
        </div>
    )
}

export default DisplayAllRecipes


  