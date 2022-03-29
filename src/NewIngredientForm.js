import React from "react";
import { useState } from 'react'

const NewIngredientForm = ({ onNewIngredient }) => {
    const [newIngredient, setNewIngredient] = useState({ name: '' })

    const setName = (e) => {
        setNewIngredient({
            name: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onNewIngredient(newIngredient)
        setNewIngredient({ name: '' })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">New Ingredient</label>
            <input
                name="name"
                type="text"
                placeholder="New Ingredient"
                value={newIngredient.name}
                onChange={setName}
            />
            <button type="submit">Add Ingredient</button>
        </form>
    )
}

// TODO: avoid adding an empty ingredient

export default NewIngredientForm 