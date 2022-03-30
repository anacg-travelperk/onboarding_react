const axios = require('axios')

export const getRecipe = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8000/recipes/${id}/`)
        return res.data
    } catch (e) {
        console.log('There is an error!')
    }
}

export const getRecipes = async () => {
    const res = await axios.get('http://localhost:8000/recipes/')
    return res.data
}

export const deleteRecipe = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8000/recipes/${id}/`)
        return res
    } catch (e) {
        return e
    }
}

export const patchRecipe = async (id, recipe) => {
    try {
        const res = await axios.patch(
            `http://localhost:8000/recipes/${id}/`,
            recipe
        )
        return res
    } catch (e) {
        return e
    }
}

export const postRecipe = async (recipe, ingredientList) => {
    const ingredients = ingredientList.map((ingr) => ({ name: ingr }))
    try {
        const res = axios.post('http://localhost:8000/recipes/', {
            name: recipe.name,
            description: recipe.description,
            ingredients: ingredients,
        })
        return res
    } catch (e) {
        console.log('There is an error!')
    }
}

export const getSearch = async (searchTerm) => {
    try {
        const res = await axios.get(
            `http://localhost:8000/recipes/?name=${searchTerm}`
        )
        return res
    } catch (e) {
        console.log('There is an error!')
    }
}
