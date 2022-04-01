import './App.css'
import CreateRecipe from './CreateRecipe'
import RecipeCard from './RecipeCard'
import RecipesView from './RecipesView'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
    const id = 49

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <RecipesView />
                    </Route>
                    <Route exact path="/recipes">
                        <RecipesView />
                    </Route>
                    <Route
                        exact
                        path="/recipes/:id"
                        children={<RecipeCard />}
                    ></Route>
                    <Route exact path="/new">
                        <CreateRecipe />
                    </Route>
                    <Route render={() => <h1>Error, not found!</h1>}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
