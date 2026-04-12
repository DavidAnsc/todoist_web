import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/sidebar/Sidebar'
import { Viewport } from './components/viewport/Viewport'
import { SelectionProvider, TodoListsProvider, TodosProvider } from './contexts/Providers'
import { TodoListModel } from './fetch/models/TodoListModel'
import { Priorities } from './fetch/models/TodoModel'
import { TodoModel } from "./fetch/models/TodoModel"
import { LogInSheet, SignUpSheet } from './components/account/SignInView'
import { postRefreshToken, getUserGetInfo } from './fetch/fetchers/APIDataFetcher'

function App() {
  //TODO: implement the scroll view that is needed for the viewport.


  const [showSignup, setShowSignup] = useState(null);
  const [showLogin, setShowLogin] = useState(null);

  const [user, setUser] = useState(null);
  const [jwtToken, setToken] = useState(null);

  useEffect(() => {
    async function runInit() {
      const tempToken = await postRefreshToken("/auth/refresh", setToken);
      if (tempToken.timestamp !== undefined) {
        if (tempToken.status === 500) {
          // not logged in
          console.log("not logged in");
          setShowLogin(true);
          setShowSignup(false);
          return;
        }
      }

      setShowLogin(false);
      setShowSignup(false);
      await getUserGetInfo("/auth/getUserInfo", setUser, tempToken);
    }

    runInit();

  }, []);

  return (
    <>
      <div className="grid w-full h-full">
        <div className='row-start-1 col-start-1 relative'>
          <Navbar userState={{user, setUser}} loginState={{showLogin, setShowLogin}} tokenState={{jwtToken, setToken}} setShowLogin={setShowLogin} />
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

        <div className="grid place-items-center h-screen row-start-1 col-start-1 mx-auto my-auto z-1000000">
          <LogInSheet userState={{ user, setUser }} signupState={{ showSignup, setShowSignup }} loginState={{ showLogin, setShowLogin }} tokenState={{ jwtToken, setToken }} />
          <SignUpSheet signupState={{ showSignup, setShowSignup }} loginState={{ showLogin, setShowLogin }} />
        </div>
      </div>
    </>
  );
}

export default App
