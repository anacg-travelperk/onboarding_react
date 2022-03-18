import React from "react";
import { useState } from "react";
const axios = require("axios")

const postRecipe = async (recipe, ingredientList) => {
    const ingredients = ingredientList.map(ingr => ({"name": ingr}))
    try {
        const res = axios.post('http://localhost:8000/recipes/', {
            name: recipe.name,
            description: recipe.description,
            ingredients: ingredients
        })
        return res
    } catch(e) {
        console.log("There is an error!")
    }
}

const CreateRecipe = () => {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
    });
    const [ingredient, setIngredient] = useState("")
    const [ingredientList, setIngredientList] = useState([])


    const handleRecipeChange = (e) => {
        const { name, value } = e.target
        setRecipe((recipe) => ({
            ...recipe,
            [name]: value,
        }))
    }

    const handleIngredientChange = (e) => {
        const newIngredient = e.target.value
        setIngredient(newIngredient)
    }

    const addIngredientToList = () => {
        if (ingredient != ("")) {
            setIngredientList(() => ([
                ...ingredientList,
                ingredient,
            ]))
            setIngredient("")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await postRecipe(recipe, ingredientList)
        if (res.status === 201) {
            setIngredient("")
            setIngredientList([])
            setRecipe({name: '',
            description: '',})
        }
        //TODO:cover error case 

    }

    return(
        <div>
            <h1>New recipe:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Recipe name: </label>
                <input name="name" type= "text" value={recipe.name} onChange={handleRecipeChange}/>
                <br/>
                <label htmlFor="description">Recipe description: </label>
                <input name="description" type= "text" value={recipe.description} onChange={handleRecipeChange}/>
                <br/>
                <label htmlFor="ingredient">Ingredient: </label>
                <input name="ingredient" type= "text" value={ingredient} onChange={handleIngredientChange}/>
                <button title="add one more ingredient" onClick={addIngredientToList} type="button">+</button> 
                <ul>
                    {ingredientList.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </ul>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateRecipe