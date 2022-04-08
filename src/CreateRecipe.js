import React from 'react'
import { useState } from 'react'
import { postRecipe } from './api'
import { Link, useHistory } from 'react-router-dom'

const CreateRecipe = () => {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
    })
    const [ingredient, setIngredient] = useState('')
    const [ingredientList, setIngredientList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory()

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
        if (ingredient != '') {
            setIngredientList(() => [...ingredientList, ingredient])
            setIngredient('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await postRecipe(recipe, ingredientList)
            if (res.status === 201) {
                setIngredient('')
                setIngredientList([])
                setRecipe({ name: '', description: '' })
                const newRecipeId = res.data.id
                history.push(`/recipes/${newRecipeId}`)
            }
        } catch (e) {
            setErrorMessage(
                'Could not post the recipe. Try filling in all fields'
            )
        }
    }

    return (
        <div>
            <Link to="/recipes">See all recipes</Link>
            <h3>New recipe:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Recipe name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={recipe.name}
                    onChange={handleRecipeChange}
                />
                <br />
                <label htmlFor="description">Recipe description:</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={recipe.description}
                    onChange={handleRecipeChange}
                />
                <br />
                <label htmlFor="ingredient">Ingredient:</label>
                <input
                    id="ingredient"
                    name="ingredient"
                    type="text"
                    value={ingredient}
                    onChange={handleIngredientChange}
                />
                <button
                    title="add one more ingredient"
                    onClick={addIngredientToList}
                    type="button"
                >
                    +
                </button>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
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
