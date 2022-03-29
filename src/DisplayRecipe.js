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

const DisplayRecipe = ({id}) => {
    const [recipe, setRecipe] = useState(null)
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

    const saveRecipe = async () => {
        setIsEditing(false)
    }

    return (
        <div>
            <div>{isRecipeDeleted && <p>Recipe deleted successfully!</p>}</div>
            <div>
                {recipe && (
                    <div>
                        <h2>{recipe.name}</h2>
                        <p>description: {recipe.description}</p>
                        <IngredientList
                            ingredients={recipe.ingredients}
                            isEditing={isEditing}
                        />
                        <button onClick={clickDelete}>Delete recipe</button>

                        {isEditing ? (
                            <button onClick={saveRecipe}>Save changes</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)}>
                                Edit recipe
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div>{isEditing && <form></form>}</div>
        </div>
    )
}

export default DisplayRecipe