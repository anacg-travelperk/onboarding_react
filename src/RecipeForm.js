import React from "react";
import { useState } from "react";


 const RecipeForm = ({initialRecipe, submitHandler}) => {
    const [recipe, setRecipe] = useState( {name: initialRecipe.name, description: initialRecipe.description} || {
        name: '',
        description: '',
    });
    const [ingredient, setIngredient] = useState("")
    const [ingredientList, setIngredientList] = useState( initialRecipe.ingredients.name || [])
// TODO: map ingredients name into an array, otherwise initialRecipe 

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
        if (ingredient !== ("")) {
            setIngredientList(() => ([
                ...ingredientList,
                ingredient,
            ]))
            setIngredient("")
        }
    }

    const removeListedIngredient = (ingredientName) => {
        setIngredientList(ingredientList.filter(ing => ing.name !== ingredientName))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submitHandler({recipe, ingredientList})
    }

    // const NewButton = () => {
    //     if (isLoggedIn) {
    //         return <button onClick={this.handleLogoutClick} />;
    //       } else {
    //         return <button onClick={this.handleLoginClick} />;
    //       }
    // }

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
                        return (
                            <div>
                                <li key={index}>{value}</li>
                                <button>Edit</button>
                                <button onClick={removeListedIngredient(value)}>Delete</button>
                            </div>)
                    })}
                </ul>
                <button type="submit">Apply changes</button>
                <button type="submit">Create</button>
                {/* <NewButton/> */}
            </form>
        </div>
    )
}

export default RecipeForm