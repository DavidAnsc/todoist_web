import { useContext, useEffect, useState } from "react"
import "./App.css"
import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/sidebar/Sidebar"
import { Viewport } from "./components/viewport/Viewport"
import { SelectionProvider, TodoListsProvider, TodosProvider, ErrorBadgeProvider, TokenProvider, UserProvider } from "./contexts/Providers"
import { LogInSheet, SignUpSheet } from "./components/account/SignInView"
import { postRefresh, getUserGetInfo, getAllTodos } from "./fetch/fetchers/APIDataFetcher"
import { TokenContext, UserContext } from "./contexts/Contexts"
import { ErrorBadge } from "./fetch/models/ErrorBadgeModel"
import { Severities } from "./fetch/models/ErrorBadgeModel"
import { ErrBadge } from "./components/error/ErrBadge"
import { TodosContext } from "./contexts/Contexts"
import { ErrorBadgeContext } from "./contexts/Contexts"

function AppContent() {
  const [showSignup, setShowSignup] = useState(null);
  const [showLogin, setShowLogin] = useState(null);

  const { setUser } = useContext(UserContext);
  const { jwtToken, setToken } = useContext(TokenContext);
  const { setTodos } = useContext(TodosContext) ?? {};
  const {setError} = useContext(ErrorBadgeContext);
  const showAuthOverlay = Boolean(showSignup || showLogin);


  useEffect(() => {
    async function runInit() {

      const tempToken = await postRefresh("/auth/refresh", setToken);
      if (tempToken === null) {
        console.log("not logged in");
        setShowLogin(true);
        setShowSignup(false);
        return;
      }

      setShowLogin(false);
      setShowSignup(false); 
      await getUserGetInfo("/auth/getUserInfo", setUser, tempToken, setToken)
        .then(async () => {
          const newList = await getAllTodos("/app/allTodos", setError, jwtToken, setToken);
          setTodos(newList);
      });
    }

    runInit();

  }, [setToken, setUser, jwtToken, setTodos, setError]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        <Navbar loginState={{ showLogin, setShowLogin }} setShowLogin={setShowLogin} />
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

      <div className="fixed left-1/2 top-1/5 -translate-x-1/2 -translate-y-1/2 z-2000">
        <ErrBadge />
      </div>

      {showAuthOverlay && (
        <div className="fixed inset-0 z-1000 grid place-items-center">
          <LogInSheet signupState={{ showSignup, setShowSignup }} loginState={{ showLogin, setShowLogin }} />
          <SignUpSheet signupState={{ showSignup, setShowSignup }} loginState={{ showLogin, setShowLogin }} />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <ErrorBadgeProvider>
        <TokenProvider>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </TokenProvider>
      </ErrorBadgeProvider>
    </>
  );
}

export default App
