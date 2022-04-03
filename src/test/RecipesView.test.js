import axios from 'axios'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import RecipesView from '../RecipesView'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')

const recipesMockResponse = {
    data: [
        {
            name: 'recipe a',
            description: 'recipe a',
            ingredients: [{ name: 'flour' }],
        },
        {
            name: 'recipe b',
            description: 'recipe b',
            ingredients: [{ name: 'wheat' }],
        },
    ],
}

describe('RecipesView', () => {
    it('Should render recipe a and b', async () => {
        axios.get.mockResolvedValue(recipesMockResponse)

        render(
            <BrowserRouter>
                <RecipesView />
            </BrowserRouter>
        )

        await waitFor(() => screen.getByText('recipe a'))
        expect(screen.getByText('recipe a')).toBeInTheDocument()
    })
    it.todo('Render empty view when there are no recipes')
})
