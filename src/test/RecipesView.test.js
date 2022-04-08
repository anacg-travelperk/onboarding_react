import axios from 'axios'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render recipe a and b', async () => {
        axios.get.mockResolvedValue(recipesMockResponse)

        render(
            <BrowserRouter>
                <RecipesView />
            </BrowserRouter>
        )

        await waitFor(() => screen.getByText('recipe a'))
        expect(screen.getByText('recipe a')).toBeInTheDocument()
    })

    it('should render empty recipe view when there are no recipes', async () => {
        axios.get.mockResolvedValue({})

        render(
            <BrowserRouter>
                <RecipesView />
            </BrowserRouter>
        )

        await waitFor(() => screen.getByText('No recipes found'))
        expect(screen.getByText('No recipes found')).toBeInTheDocument()
    })

    it('should display message when there are no matching results for a recipe search', async () => {
        const testMock = jest.fn((args) => {
            if (args === 'http://localhost:8000/recipes/') {
                return recipesMockResponse
            }
            return {
                status: 200,
                data: [],
            }
        })
        axios.get = testMock

        render(
            <BrowserRouter>
                <RecipesView />
            </BrowserRouter>
        )

        userEvent.type(
            screen.getByLabelText('Search for term:'),
            'norecipelikethis'
        )
        userEvent.click(screen.getByRole('button', { name: 'Search' }))
        await waitFor(() => {
            expect(testMock).toHaveBeenCalledTimes(2)
        })
        expect(
            screen.getByText('No results for that search')
        ).toBeInTheDocument()
    })

    it('should perform a search and shows only matching recipe', async () => {
        const testMock = jest.fn((args) => {
            if (args === 'http://localhost:8000/recipes/') {
                return recipesMockResponse
            }
            return {
                status: 200,
                data: [
                    {
                        name: 'recipe a',
                        description: 'recipe a',
                        ingredients: [{ name: 'flour' }],
                    },
                ],
            }
        })
        axios.get = testMock

        render(
            <BrowserRouter>
                <RecipesView />
            </BrowserRouter>
        )

        userEvent.type(screen.getByLabelText('Search for term:'), 'a')
        userEvent.click(screen.getByRole('button', { name: 'Search' }))
        await waitFor(() => {
            expect(testMock).toHaveBeenCalledWith(
                'http://localhost:8000/recipes/?name=a'
            )
        })
        await waitFor(() => {
            screen.getByText('recipe a')
        })
        expect(screen.getByText('recipe a')).toBeInTheDocument()
        expect(screen.queryByText('recipe b')).not.toBeInTheDocument()
    })
})


