import axios from 'axios'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateRecipe from '../CreateRecipe'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')

describe('CreateRecipe', () => {
    it('should create a recipe', async () => {
        const mockedCreateRecipe = jest.fn(() => ({
            status: 201,
        }))
        axios.post.mockImplementation(mockedCreateRecipe)

        render(
            <BrowserRouter>
                <CreateRecipe />
            </BrowserRouter>
        )
        await waitFor(() => screen.getByText('New recipe:'))
        expect(screen.getByText('New recipe:')).toBeInTheDocument()

        userEvent.type(screen.getByLabelText('Recipe name:'), 'pizza')
        expect(screen.getByLabelText('Recipe name:')).toHaveValue('pizza')

        userEvent.type(
            screen.getByLabelText('Recipe description:'),
            'place in the oven'
        )
        expect(screen.getByLabelText('Recipe description:')).toHaveValue(
            'place in the oven'
        )

        userEvent.type(screen.getByLabelText('Ingredient:'), 'dough')
        userEvent.click(screen.getByRole('button', { name: '+' }))
        await waitFor(() => {
            screen.getByRole('listitem')
        })

        userEvent.click(screen.getByRole('button', { name: 'Create' }))
        await waitFor(() => {
            expect(mockedCreateRecipe).toHaveBeenCalledWith(
                'http://localhost:8000/recipes/',
                {
                    name: 'pizza',
                    description: 'place in the oven',
                    ingredients: [{ name: 'dough' }],
                }
            )
        })
    })
    it('should display error if input value is empty', async () => {
        const mockedCreateRecipe = jest.fn(() => ({
            status: 201,
        }))
        axios.post.mockImplementation(mockedCreateRecipe)

        render(
            <BrowserRouter>
                <CreateRecipe />
            </BrowserRouter>
        )
        await waitFor(() => screen.getByText('New recipe:'))
        expect(screen.getByText('New recipe:')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'Create' }))
        await waitFor(() => {
            expect(mockedCreateRecipe).toHaveBeenCalled()
        })
        expect(
            screen.getByText(
                'Could not post the recipe. Try filling in all fields'
            )
        ).toBeInTheDocument()
    })
})
