import './App.css'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/sidebar/Sidebar'
import { SelectionProvider } from './contexts/SelectionProvider'

function App() {

  return (
    <>
    <div className=''>
      <Navbar />
      <SelectionProvider>
        <Sidebar />
      </SelectionProvider>
    </div>
    </>
  )
}

export default App
