import './App.css';
import NavigationBar from './NavigationBar';
import CreateRecipe from './CreateRecipe';
import DisplayRecipe from './DisplayRecipe';
import SearchRecipe from './SearchRecipe';
import DisplayAllRecipes from './DisplayAllRecipes';
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [isDisplayView, setIsDisplayView] = useState(false)
  const [isCreateView, setIsCreateView] = useState(true)
  const [isSearchView, setIsSearchView] = useState(false)
  
  return (
    <div>
      <NavigationBar/>
      {isDisplayView && <DisplayAllRecipes/>}
      {isCreateView && <CreateRecipe/>}
      {isSearchView && <SearchRecipe/>}
      {/* <DisplayRecipe id={15}/> */}
    </div>
  );
}

export default App;
