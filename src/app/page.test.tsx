import { afterEach, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Home from './page'

afterEach(cleanup)

it('renders the heading and the todo form', () => {
  render(<Home />)
  expect(screen.getByRole('heading', { name: 'To-do' })).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Add a task...')).toBeInTheDocument()
})
