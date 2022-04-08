import React from 'react'
import { useState, useEffect } from 'react'
import IngredientList from './IngredientList'
import { getRecipe, deleteRecipe, patchRecipe } from './api'
import { Link, useParams } from 'react-router-dom'

const RecipeCard = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const [isRecipeDeleted, setIsRecipeDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(async () => {
        const recipe = await getRecipe(id)
        setRecipe(recipe)
    }, [])

    const clickDelete = async () => {
        const res = await deleteRecipe(id)
        if (res.status === 204) {
            setIsRecipeDeleted(true)
        } else {
            setIsRecipeDeleted(false)
        }
        setRecipe({})
    }

    const editRecipe = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setRecipe((previousState) => ({
            ...previousState,
            [name]: value,
        }))
    }

    const addIngredient = (newIngredient) => {
        const updatedIngredientList = [...recipe.ingredients, newIngredient]
        setRecipe((previousState) => ({
            ...previousState,
            ingredients: updatedIngredientList,
        }))
    }

    const removeIngredient = (name) => {
        const updatedIngredientList = recipe.ingredients.filter(
            (ingredient) => ingredient.name !== name
        )
        setRecipe((previousState) => ({
            ...previousState,
            ingredients: updatedIngredientList,
        }))
    }

    const saveRecipe = async () => {
        const res = await patchRecipe(recipe.id, recipe)
        if (res.status === 200) {
            setIsEditing(false)
        } else {
            console.log('Unable to make the changes')
        }
    }

    return (
        <>
            {isRecipeDeleted ? (
                <p>Recipe deleted successfully!</p>
            ) : (
                <>
                    {recipe && (
                        <>
                            {isEditing ? (
                                <div>
                                    <label htmlFor="recipeName">
                                        Recipe name
                                    </label>
                                    <input
                                        id="recipeName"
                                        name="name"
                                        value={recipe.name}
                                        onChange={editRecipe}
                                    ></input>
                                    <br />
                                    <label htmlFor="recipeDescription">
                                        Recipe description
                                    </label>
                                    <input
                                        id="recipeDescription"
                                        name="description"
                                        value={recipe.description}
                                        onChange={editRecipe}
                                    ></input>
                                    <IngredientList
                                        recipe={recipe}
                                        isEditing={isEditing}
                                        addIngredient={addIngredient}
                                        removeIngredient={removeIngredient}
                                    />
                                    <button onClick={saveRecipe}>
                                        Save changes
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2>{recipe.name}</h2>
                                    <p>description: {recipe.description}</p>
                                    <IngredientList
                                        recipe={recipe}
                                        isEditing={isEditing}
                                        addIngredient={addIngredient}
                                        removeIngredient={removeIngredient}
                                    />
                                    <button onClick={clickDelete}>
                                        Delete recipe
                                    </button>
                                    <button onClick={() => setIsEditing(true)}>
                                        Edit recipe
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            <Link to="/recipes">See all recipes</Link>
        </>
    )
}
export default RecipeCard
