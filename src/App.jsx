import './App.css'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/sidebar/Sidebar'
import { Viewport } from './components/viewport/Viewport'
import { SelectionProvider, TodoListsProvider, TodosProvider } from './contexts/Providers'
import { TodoListModel } from './fetch/TodoListModel'
import { Priorities } from './fetch/TodoModel'
import { TodoModel } from "./fetch/TodoModel"

function App() {

  return (
    <>
      <div className="">
        <Navbar />
        <TodosProvider>
          <TodoListsProvider>
            <SelectionProvider>
              <div className="flex items-start">
                <Sidebar />
                <div className="flex flex-1 justify-center">
                  <Viewport />
                </div>
              </div>
            </SelectionProvider>
          </TodoListsProvider>
        </TodosProvider>
      </div>
    </>
  )
}

export default App
