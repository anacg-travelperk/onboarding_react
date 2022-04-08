import axios from 'axios'
import React from 'react'
import {
    render,
    screen,
    waitFor,
    fireEvent,
    cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecipeCard from '../RecipeCard'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')

const recipeMock = {
    data: {
        id: 1,
        name: 'recipe test',
        description: 'my recipe test description',
        ingredients: [{ name: 'test ingredient' }],
    },
}

describe('RecipeCard', () => {
    it('should display a recipe', async () => {
        axios.get.mockResolvedValue(recipeMock)

        render(
            <BrowserRouter>
                <RecipeCard />
            </BrowserRouter>
        )

        await waitFor(() => screen.getByText('recipe test'))
        expect(screen.getByText('recipe test')).toBeInTheDocument()
        expect(screen.getByText('test ingredient')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Delete recipe' })
        ).toBeInTheDocument()
    })

    it('should display a form with the recipe content when button Edit is clicked', async () => {
        axios.get.mockResolvedValue(recipeMock)

        render(
            <BrowserRouter>
                <RecipeCard />
            </BrowserRouter>
        )

        await waitFor(() => screen.getByText('recipe test'))
        expect(screen.queryByLabelText('Recipe name')).toBeNull()
        fireEvent.click(screen.getByRole('button', { name: 'Edit recipe' }))
        expect(screen.getByLabelText('Recipe name')).toHaveValue('recipe test')
        expect(screen.getByLabelText('Recipe description')).toHaveValue(
            'my recipe test description'
        )
        expect(
            screen.getByPlaceholderText('New Ingredient')
        ).toBeInTheDocument()
        expect(screen.getByText('test ingredient')).toBeInTheDocument()
    })
    it('should apply changes when a recipe is edited', async () => {
        axios.get.mockResolvedValue(recipeMock)
        const mockedPatchRecipe = jest.fn(() => ({
            status: 200,
        }))
        axios.patch = mockedPatchRecipe

        render(
            <BrowserRouter>
                <RecipeCard />
            </BrowserRouter>
        )

        await waitFor(() => screen.getByText('recipe test'))
        userEvent.click(screen.getByRole('button', { name: 'Edit recipe' }))
        userEvent.type(screen.getByLabelText('Recipe name'), ' edited')
        userEvent.type(screen.getByLabelText('Recipe description'), ' edited')
        expect(screen.queryByText('test ingredient')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'Delete' }))
        expect(screen.queryByText('test ingredient')).not.toBeInTheDocument()
        userEvent.type(
            screen.getByPlaceholderText('New Ingredient'),
            'new yummy ingredient'
        )
        userEvent.click(screen.getByRole('button', { name: 'Add Ingredient' }))
        await waitFor(() => {
            screen.getByRole('listitem')
        })
        userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
        await waitFor(() => {
            expect(mockedPatchRecipe).toHaveBeenCalledWith(
                'http://localhost:8000/recipes/1/',
                {
                    id: 1,
                    name: 'recipe test edited',
                    description: 'my recipe test description edited',
                    ingredients: [{ name: 'new yummy ingredient' }],
                }
            )
        })
    })

    it('should call the delete api when a recipe is deleted', async () => {
        axios.get.mockResolvedValue(recipeMock)
        const mockedDeleteRecipe = jest.fn(() => ({
            status: 204,
        }))
        axios.delete = mockedDeleteRecipe

        render(
            <BrowserRouter>
                <RecipeCard />
            </BrowserRouter>
        )

        await waitFor(() =>
            screen.getByRole('button', { name: 'Delete recipe' })
        )
        fireEvent.click(screen.getByRole('button', { name: 'Delete recipe' }))

        await waitFor(() => {
            expect(mockedDeleteRecipe).toHaveBeenCalled()
        })
    })
})
