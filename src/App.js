import './App.css';
import NavigationBar from './NavigationBar';
import CreateRecipe from './CreateRecipe';
import DisplayRecipe from './DisplayRecipe';
import SearchRecipe from './SearchRecipe';
import DisplayAllRecipes from './DisplayAllRecipes';
import RecipeForm from './RecipeForm';
import IngredientList from './IngredientList';
import Recipe from './Recipe';
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [isDisplayView, setIsDisplayView] = useState(true)
  const [isCreateView, setIsCreateView] = useState(false)
  const [isSearchView, setIsSearchView] = useState(false)

  const recipe = {
      id: 20,
      name: 'Lasa',
      description: 'Cook it for 2 hours',
      ingredients: [
          {
              name: 'hola',
          },
          {
              name: 'adios',
          },
      ],
  }

  return (
      <div>
          <NavigationBar />
          {isCreateView && <CreateRecipe />}
          {isDisplayView && <DisplayAllRecipes />}
          {isSearchView && <SearchRecipe />}
          {/* <DisplayRecipe id={23}/> */}
          {/* <Recipe id={23}/> */}
          {/* <RecipeForm initialRecipe={recipe.name}/> */}
          {/* <IngredientList/> */}
      </div>
  )
}

export default App;
