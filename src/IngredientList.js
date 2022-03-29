import React from 'react'
import Ingredient from './Ingredient'
import NewIngredientForm from './NewIngredientForm'

const IngredientList = ({
    recipe,
    isEditing,
    updateRecipeIngredients,
    removeRecipeIngredient,
}) => {
    const add = (newIngredient) => {
        updateRecipeIngredients(newIngredient)
    }

    const remove = ({ name }) => {
        removeRecipeIngredient(name)
    }

    return (
        <div>
            <h3>Ingredients</h3>
            {isEditing && <NewIngredientForm onNewIngredient={add} />}

            {recipe.ingredients &&
                recipe.ingredients.map((ingredient) => (
                    <Ingredient
                        key={ingredient.name}
                        ingredient={ingredient}
                        onRemove={remove}
                        isEditing={isEditing}
                    />
                ))}
        </div>
    )
}

export default IngredientList
