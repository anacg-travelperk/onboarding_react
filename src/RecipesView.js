import React from 'react'
import { useState, useEffect } from 'react'
import { getRecipes } from './api'
import SearchBar from './SearchBar'

const RecipesView = () => {
    const [recipes, setRecipes] = useState(null)

    useEffect(async () => {
        if (recipes === null) {
            const recipes = await getRecipes()
            setRecipes(recipes)
        }
    }, [recipes])

    return (
        <div>
            <h3>My recipes</h3>
            <SearchBar onResult={setRecipes} />
            {recipes && recipes.length === 0 && (
                <p>No results for that search</p>
            )}
            {recipes && (
                <ul>
                    {recipes.map((recipe, index) => {
                        return <a key={index}>{recipe.name}</a>
                    })}
                </ul>
            )}

            <button onClick={() => setRecipes(null)}>Show all recipes</button>
        </div>
    )
}

export default RecipesView
