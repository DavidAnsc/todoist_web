import { useContext, useEffect, useState } from "react"
import "./App.css"
import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/sidebar/Sidebar"
import { Viewport } from "./components/viewport/Viewport"
import { SelectionProvider, TodoListsProvider, TodosProvider, ErrorBadgeProvider } from "./contexts/Providers"
import { LogInSheet, SignUpSheet } from "./components/account/SignInView"
import { postRefresh, getUserGetInfo } from "./fetch/fetchers/APIDataFetcher"
import { ErrorBadgeContext } from "./contexts/Contexts"
import { ErrorBadge } from "./fetch/models/ErrorBadgeModel"
import { Severities } from "./fetch/models/ErrorBadgeModel"
import { handleShowError } from "./SetError"
import { ErrBadge } from "./components/error/ErrBadge"

function AppContent() {
  const [showSignup, setShowSignup] = useState(null);
  const [showLogin, setShowLogin] = useState(null);

  const [user, setUser] = useState(null);
  const [jwtToken, setToken] = useState(null);

  const { setError } = useContext(ErrorBadgeContext);
  const showAuthOverlay = Boolean(showSignup || showLogin);


  useEffect(() => {
    async function runInit() {

      const tempToken = await postRefresh("/auth/refresh", setToken);
      if (tempToken === null) {
        // not logged in
        console.log("not logged in");
        handleShowError(new ErrorBadge("You're not logged in", "Pls log in using the sheet", Severities.MED), setError);
        setShowLogin(true);
        setShowSignup(false);
        return;
      }

      setShowLogin(false);
      setShowSignup(false); 
      await getUserGetInfo("/auth/getUserInfo", setUser, tempToken);
    }

    runInit();

  }, [setError]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        <Navbar userState={{ user, setUser }} loginState={{ showLogin, setShowLogin }} tokenState={{ jwtToken, setToken }} setShowLogin={setShowLogin} />
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
          <LogInSheet userState={{ user, setUser }} signupState={{ showSignup, setShowSignup }} loginState={{ showLogin, setShowLogin }} tokenState={{ jwtToken, setToken }} />
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
        <AppContent />
      </ErrorBadgeProvider>
    </>
  );
}

export default App
