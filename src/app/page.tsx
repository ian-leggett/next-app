import TodoList from './ui/todo-list'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight">To-do</h1>
      <TodoList />
    </main>
  )
}
