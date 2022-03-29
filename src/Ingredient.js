import React from 'react'

const Ingredient = ({ ingredient, onRemove, isEditing }) => {
    const handleRemove = () => {
        onRemove(ingredient)
    }

    return (
        <div>
            <li>{ingredient.name}</li>
            {isEditing && <button onClick={handleRemove}>Delete</button>}
        </div>
    )
}

export default Ingredient
