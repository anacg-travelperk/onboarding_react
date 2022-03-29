import React from "react";
import { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
import { getRecipe, deleteRecipe, patchRecipe } from './api'

const DisplayRecipe = ({ id }) => {
    const [recipe, setRecipe] = useState({})
    // TODO: try initializing with empty array for ingredients. But, what will happen with the rendering, since it depends on the recipe to be empty?
    const [isRecipeDeleted, setIsRecipeDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(async () => {
        const recipe = await getRecipe(id)
        setRecipe(recipe)
    }, [])

    const clickDelete = async () => {
        const res = await deleteRecipe(id)
        if (res.status === 204) {
            setRecipe(null)
            setIsRecipeDeleted(true)
        } else {
            setRecipe(null)
            setIsRecipeDeleted(false)
        }
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
            <div>{isRecipeDeleted && <p>Recipe deleted successfully!</p>}</div>
            <div>
                {recipe && (
                    <>
                        {isEditing ? (
                            <div>
                                <label>Recipe name</label>
                                <input
                                    name="name"
                                    value={recipe.name}
                                    onChange={editRecipe}
                                ></input>
                                <br />
                                <label>Recipe description</label>
                                <input
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
            </div>
        </>
    )
}
export default DisplayRecipe