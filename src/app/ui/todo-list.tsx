'use client'

import { useState } from 'react'

type Todo = { id: number; text: string; done: boolean }

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  function addTodo(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }])
    setText('')
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          Add
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.done}
              aria-label={`Mark ${todo.text} as done`}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={`flex-1 ${todo.done ? 'line-through text-zinc-400' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-sm text-red-600"
              aria-label={`Delete ${todo.text}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
