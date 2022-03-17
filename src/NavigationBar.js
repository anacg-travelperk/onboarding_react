import React from "react";
import { NavLink } from "react-router-dom"
import CreateRecipe from "./CreateRecipe";


const NavigationBar = () => {
    return (
        <div>
            <a href='linkToMyRecipes'>My recipes</a>
            <a href='linkToCreateRecipe'>Create new recipe</a>
        </div>
    )
}

export default NavigationBar