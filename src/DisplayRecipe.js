import React from "react";
import { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
const axios = require("axios")


const getRecipe = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8000/recipes/${id}/`)
        return res.data
    } catch(e) {
        console.log("There is an error!")
    }
}

const deleteRecipe = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8000/recipes/${id}/`)
        return res
    } catch(e) {
        return (e)
    }
}

const patchRecipe = async (id, recipe) => {
    try {
        const res = await axios.patch(`http://localhost:8000/recipes/${id}/`, recipe)
        return res
    } catch(e) {
        return (e)
    }
}

const DisplayRecipe = ({ id }) => {
    const [recipe, setRecipe] = useState({})
    const [isRecipeDeleted, setIsRecipeDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(async () => {
        const recipe = await getRecipe(id)
        setRecipe(recipe)
    }, [])

    useEffect(() => {
        console.log(
            '🚀 ~ file: DisplayRecipe.js ~ line 48 ~ DisplayRecipe ~ recipe',
            JSON.stringify(recipe)
        )
    }, [recipe])

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

    const saveRecipe = async () => {
        const res = await patchRecipe(recipe.id, recipe)
        if (res.status === 200) {
            setIsEditing(false)
        } else {
            console.log('Unable to make the changes')
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

    const updateIngredientList = (newIngredient) => {
        const updatedIngredientList = [...recipe.ingredients, newIngredient]
        console.log(
            '🚀 ~ file: DisplayRecipe.js ~ line 74 ~ updateIngredientList ~ updatedIngredients',
            updatedIngredientList
        )
        setRecipe((previousState) => ({
            ...previousState,
            ingredients: updatedIngredientList,
        }))
    }

    const removeRecipeIngredient = (name) => {
        const updatedIngredientList = recipe.ingredients.filter(
            (ingredient) => ingredient.name !== name
        )
        setRecipe((previousState) => ({
            ...previousState,
            ingredients: updatedIngredientList,
        }))
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
                                    updateRecipeIngredients={
                                        updateIngredientList
                                    }
                                    removeRecipeIngredient={
                                        removeRecipeIngredient
                                    }
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
                                    updateRecipeIngredients={
                                        updateIngredientList
                                    }
                                    removeRecipeIngredient={
                                        removeRecipeIngredient
                                    }
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