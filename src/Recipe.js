import React from "react"
import { useState } from "react"
import IngredientList from "./IngredientList"

// const getRecipe = async (id) => {
//     try {
//         const res = await axios.get(`http://localhost:8000/recipes/${id}/`)
//         return res.data
//     } catch(e) {
//         console.log("There is an error!")
//     }
// }

// const deleteRecipe = async (id) => {
//     try {
//         const res = await axios.delete(`http://localhost:8000/recipes/${id}/`)
//         return res
//     } catch(e) {
//         return (e)
//     }
// }

const Recipe = ({id}) => {
    const [recipe, setRecipe] = useState("")
    const [ingredients, setIngredients] = useState(["tomato", "onion"])

return(
    <IngredientList ingredients={ingredients}/>
)

}




export default Recipe
