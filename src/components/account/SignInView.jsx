import GoogleButton from "../small_components/GoogleButton";
import downArrow from "../../assets/icons/downArrow.png"
import checkMark from "../../assets/icons/checkMark.png"
import crossMark from "../../assets/icons/crossMark.png"
import { useState, useContext, useEffect } from "react";
import { ErrorBadgeContext, TokenContext, UserContext } from "../../contexts/Contexts";
import { postUserRegister, postUserLogin, getUserGetInfo, postUserVerify } from "../../fetch/fetchers/APIDataFetcher";
import { handleShowError } from "../../SetError";
import { ErrorBadge, Severities } from "../../fetch/models/ErrorBadgeModel";

export function LogInSheet({ loginState, signupState }) {
  const { setUser } = useContext(UserContext);

  const { showLogin, setShowLogin } = loginState;
  const { setShowSignup } = signupState;
  const { setToken } = useContext(TokenContext);

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setError } = useContext(ErrorBadgeContext);

  const [usrnEmptyError, setEmptyError] = useState(false);
  const [pswTooShortError, setTooShortError] = useState(false);
  const [pswCapitalNumberError, setCapitalNumberError] = useState(false);

  const anyError = usrnEmptyError || pswTooShortError || pswCapitalNumberError;

  async function handleSubmit(i) {
    i.preventDefault();
    if (anyError) {
      return;
    }

    const output = await postUserLogin(
      "/auth/login",
      usernameOrEmail.trim(),
      password.trim(),
      setToken,
      setError
    );
    if (output === null) {
      return;
    }

    await getUserGetInfo("/auth/getUserInfo", setUser, output.jwtToken, setError);

    setShowLogin(false);
    setShowSignup(false);
  }

  useEffect(() => {
    function handleEdit() {
      if (usernameOrEmail.trim() === "") {
        setEmptyError(true);
      } else {
        setEmptyError(false);
      }

      if (password.length < 7) {
        setTooShortError(true);
      } else {
        setTooShortError(false);
      }

      if (password.toLowerCase() === password || /\d/.test(password) === false) {
        setCapitalNumberError(true);
      } else {
        setCapitalNumberError(false);
      }
    }
    handleEdit();
  }, [usernameOrEmail, password])


  return (
    <>
      <div
        style={{ display: showLogin ? "" : "none" }}
        className="w-100 h-100 rounded-xl bg-blue-200 row-start-1 col-start-1 border border-gray-400"
      >
        <div className="px-3 py-3">
          <div className="flex justify-between relative">
            <div>
              <h3 className="sora-font text-sm mb-1 text-gray-600">Welcome back!</h3>
              <h1 className="sora-font text-3xl mb-5 font-bold">Log in</h1>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => { setShowLogin(false); }}
              className="w-5 h-5 absolute top-0 right-0 cursor-pointer text-gray-600"
            >
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="grid place-items-center">
            <form className="row-start-1 col-start-1" onSubmit={handleSubmit}>
              <input onChange={(e) => setUsernameOrEmail(e.target.value)} placeholder="Email/Username" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm"></input>
              <div className="flex items-start">
                <img src={usrnEmptyError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: usrnEmptyError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1 mb-4">The username/email can't be empty</h3>
              </div>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm"></input>
              <div className="flex items-start">
                <img src={pswTooShortError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: pswTooShortError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1 mb-0.5">The password is above 6 characters</h3>
              </div>
              <div className="flex items-start">
                <img src={pswCapitalNumberError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: pswCapitalNumberError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1 mb-4">The password contains at least one number & capital letter</h3>
              </div>
              <h3 className="text-blue-600 ml-0.5 cursor-pointer mb-6" onClick={() => { setShowSignup(true); setShowLogin(false); }}>Sign up</h3>
              <div className="flex justify-end items-center px-1">
                <GoogleButton />
                <button type="submit"  style={{ height: "38px", cursor: !anyError ? "pointer" : "not-allowed", backgroundColor: !anyError ? "white" : "#a3a3a3" }} className="cursor-pointer px-4 ml-2 bg-white rounded-full sora-font text-sm border border-gray-500 text-gray-800">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export function SignUpSheet({ signupState, loginState }) {
  const { setShowLogin } = loginState;
  const { showSignup, setShowSignup } = signupState;
  const { setError } = useContext(ErrorBadgeContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [usrnEmptyError, setEmptyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [displayNameError, setDisplayNameError] = useState(false);
  const [pswTooShortError, setTooShortError] = useState(false);
  const [pswCapitalNumberError, setCapitalNumberError] = useState(false);


  const anyError = usrnEmptyError || emailError || displayNameError || pswTooShortError || pswCapitalNumberError;

  async function handleSubmit(i) {
    i.preventDefault();
    if (anyError) {
      return;
    }

    const verification = await postUserVerify("/auth/verify", username.trim(), password, displayName.trim(), email.trim());
    if (verification === null || verification === false) {
      handleShowError(new ErrorBadge("The email/username has already been used", "Pls change your email if you've already registered, otherwise change the username.", Severities.HIGH), setError);
      return;
    }

    const output = await postUserRegister("/auth/register", username.trim(), password, displayName.trim(), email.trim(), setError);
    if (output === null) {
      return;
    }
    setShowLogin(true);
    setShowSignup(false);
  }

  useEffect(() => {
    function handleEdit() {
      if (username.trim() === "") {
        setEmptyError(true);
      } else {
        setEmptyError(false);
      }

      if (email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) === false) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }

      if (displayName.trim().length < 3 || displayName.trim().length > 24 || /^[a-zA-Z0-9 _.-]+$/.test(displayName.trim()) === false) {
        setDisplayNameError(true);
      } else {
        setDisplayNameError(false);
      }

      if (password.length < 7) {
        setTooShortError(true);
      } else {
        setTooShortError(false);
      }

      if (password.toLowerCase() === password || /\d/.test(password) === false) {
        setCapitalNumberError(true);
      } else {
        setCapitalNumberError(false);
      }
    }

    handleEdit();
  }, [username, email, displayName, password]);


  return (
    <>
      <div
        style={{ display: showSignup ? "" : "none" }}
        className="w-100 h-124 rounded-xl bg-blue-200 row-start-1 col-start-1 border border-gray-400"
      >
        <div className="px-3 py-3">
          <div className="flex justify-between relative">
            <div>
              <h3 className="sora-font text-sm mb-1 text-gray-600">Welcome to <span className="tracking-tighter">todoist</span></h3>
              <h1 className="sora-font text-3xl mb-3.5 font-bold">Sign up</h1>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => { setShowSignup(false); }}
              className="w-5 h-5 absolute top-0 right-0 cursor-pointer text-gray-600"
            >
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div
            className="inter-font text-sm flex items-center mb-5 cursor-pointer"
            onClick={() => { setShowLogin(true); setShowSignup(false) }}
          >
            <img src={downArrow} className="w-3.5 h-2 rotate-90 inline-block mr-1"></img>
            Login
          </div>
          <div className="grid place-items-center">
            <form className="row-start-1 col-start-1" onSubmit={(i) => handleSubmit(i)}>
              <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm"></input>
              <div className="flex items-start mb-4">
                <img src={usrnEmptyError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: usrnEmptyError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1">The username can't be empty</h3>
              </div>
              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm"></input>
              <div className="flex items-start mb-4">
                <img src={emailError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: emailError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1">The email must be valid</h3>
              </div>
              <input onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm"></input>
              <div className="flex items-start mb-4">
                <img src={displayNameError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: displayNameError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1">The display name must be 3-24 characters</h3>
              </div>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm"></input>
              <div className="flex items-start">
                <img src={pswTooShortError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: pswTooShortError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1 mb-0.5">The password is above 6 characters</h3>
              </div>
              <div className="flex items-start mb-4">
                <img src={pswCapitalNumberError ? crossMark : checkMark} className="w-2 h-2 mt-1"></img>
                <h3 style={{ color: pswCapitalNumberError ? "#ff8472" : "#99a1af" }} className="text-xs inter-font ml-1">The password contains at least one number & capital letter</h3>
              </div>
              <div className="flex justify-end items-center px-1">
                <button
                  type="submit"
                  style={{ height: "38px", cursor: !anyError ? "pointer" : "not-allowed", backgroundColor: !anyError ? "white" : "#a3a3a3" }}
                  className="cursor-pointer px-4 ml-2 bg-white rounded-full sora-font text-sm border border-gray-500 text-gray-800"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}