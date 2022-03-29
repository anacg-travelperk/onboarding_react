import React from "react";
import { useState } from "react";
import Ingredient from "./Ingredient";
import NewIngredientForm from "./NewIngredientForm";

const IngredientList = ({ ingredients, isEditing }) => {
    const [ingredientList, setIngredientList] = useState(ingredients)

    const add = (newIngredient) => {
        setIngredientList([...ingredientList, newIngredient])
    }

    const removeIngredient = ({ name }) => {
        setIngredientList(
            ingredientList.filter((ingredient) => ingredient.name !== name)
        )
    }

    return (
        <div>
            <h3>Ingredients</h3>
            {isEditing && <NewIngredientForm onNewIngredient={add} />}
            {ingredientList.map((ingredient) => (
                <Ingredient
                    key={ingredient.name}
                    ingredient={ingredient}
                    onRemove={removeIngredient}
                    isEditing={isEditing}
                />
            ))}
        </div>
    )
}

export default IngredientList