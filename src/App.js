import './App.css'
import CreateRecipe from './CreateRecipe'
import DisplayRecipe from './DisplayRecipe'
import DisplayAllRecipes from './DisplayAllRecipes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DisplayAllRecipes />} />
                    <Route path="/recipes" element={<DisplayAllRecipes />} />
                    <Route path="/new" element={<CreateRecipe />} />
                </Routes>
            </BrowserRouter>
            {/* <DisplayRecipe id={39} />  */}
        </div>
    )
}

export default App
