import React from 'react'
import { useState, useEffect } from 'react'
import { getRecipes } from './api'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'

const RecipesView = () => {
    const [recipes, setRecipes] = useState(null)
    const [isSearchDisplay, setIsSearchDisplay] = useState(false)

    useEffect(async () => {
        if (recipes === null) {
            const recipes = await getRecipes()
            setRecipes(recipes)
            setIsSearchDisplay(false)
        }
    }, [recipes])

    return (
        <div>
            <h3>My recipes</h3>
            <SearchBar
                onResult={setRecipes}
                setIsSearchDisplay={setIsSearchDisplay}
            />
            {!recipes && <p>No recipes found</p>}
            {isSearchDisplay && recipes.length === 0 && (
                <p>No results for that search</p>
            )}
            {recipes && (
                <ul className="recipeList">
                    {recipes.map((recipe, index) => {
                        return (
                            <Link to={`/recipes/${recipe.id}`} key={index}>
                                {recipe.name}
                            </Link>
                        )
                    })}
                </ul>
            )}

            {isSearchDisplay && (
                <button onClick={() => setRecipes(null)}>Show all</button>
            )}
            <Link to="/new">Create new recipe</Link>
        </div>
    )
}

export default RecipesView
