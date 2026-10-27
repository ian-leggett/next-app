import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from './todo-list'

afterEach(cleanup)

async function addTodo(text: string) {
  await userEvent.type(screen.getByPlaceholderText('Add a task...'), text)
  await userEvent.click(screen.getByRole('button', { name: 'Add' }))
}

describe('TodoList', () => {
  it('adds a todo and clears the input', async () => {
    render(<TodoList />)
    await addTodo('Buy milk')
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Add a task...')).toHaveValue('')
  })

  it('ignores blank input', async () => {
    render(<TodoList />)
    await addTodo('   ')
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('toggles a todo as done', async () => {
    render(<TodoList />)
    await addTodo('Buy milk')
    await userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByText('Buy milk')).toHaveClass('line-through')
  })

  it('deletes a todo', async () => {
    render(<TodoList />)
    await addTodo('Buy milk')
    await userEvent.click(screen.getByRole('button', { name: 'Delete Buy milk' }))
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })
  it('trims whitespace from new todos', async () => {
    render(<TodoList />)
    await addTodo('  Buy milk  ')
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('adds a todo when pressing Enter', async () => {
    render(<TodoList />)
    await userEvent.type(screen.getByPlaceholderText('Add a task...'), 'Buy milk{Enter}')
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('keeps todos in the order they were added', async () => {
    render(<TodoList />)
    await addTodo('First')
    await addTodo('Second')
    await addTodo('Third')
    const items = screen.getAllByRole('listitem')
    expect(items.map((li) => li.textContent)).toEqual([
      expect.stringContaining('First'),
      expect.stringContaining('Second'),
      expect.stringContaining('Third'),
    ])
  })

  it('toggles a todo back to not done', async () => {
    render(<TodoList />)
    await addTodo('Buy milk')
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    expect(screen.getByText('Buy milk')).not.toHaveClass('line-through')
  })

  it('only toggles the todo that was clicked', async () => {
    render(<TodoList />)
    await addTodo('First')
    await addTodo('Second')
    const [first, second] = screen.getAllByRole('checkbox')
    await userEvent.click(second)
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()
  })

  it('only deletes the todo that was clicked', async () => {
    render(<TodoList />)
    await addTodo('First')
    await addTodo('Second')
    await userEvent.click(screen.getByRole('button', { name: 'Delete First' }))
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('allows duplicate todo text', async () => {
    render(<TodoList />)
    await addTodo('Same')
    await addTodo('Same')
    expect(screen.getAllByText('Same')).toHaveLength(2)
  })
})
