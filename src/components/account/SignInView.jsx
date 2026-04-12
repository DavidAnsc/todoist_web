import GoogleButton from "./small_components/GoogleButton";
import downArrow from "../../assets/icons/downArrow.png"
import { useState } from "react";
import { postUserRegister, postUserLogin, getUserGetInfo } from "../../fetch/fetchers/APIDataFetcher";

export function LogInSheet({ loginState, signupState, userState, tokenState }) {
  const {user, setUser} = userState;

  const { showLogin, setShowLogin } = loginState;
  const { setShowSignup } = signupState;
  const { setToken } = tokenState;

  const [usernameOrEmail, setUsernameOrEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function handleSubmit(i) {
    i.preventDefault();
    const output = await postUserLogin(
      "/auth/login",
      usernameOrEmail.trim(),
      password,
      setToken
    );
    if (output === null) {
      return;
    }

    await getUserGetInfo("/auth/getUserInfo", setUser, output.jwtToken);

    setShowLogin(false);
    setShowSignup(false);
    console.log(user);
  }


  return (
    <>
      <div
        style={{ display: showLogin ? "" : "none" }}
        className="w-100 h-80 rounded-xl bg-blue-200 row-start-1 col-start-1 border border-gray-400"
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
              onClick={() => {setShowLogin(false);}}
              className="w-5 h-5 absolute top-0 right-0 cursor-pointer text-gray-600"
            >
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="grid place-items-center">
            <form className="row-start-1 col-start-1" onSubmit={handleSubmit}>
              <input onChange={(e) => setUsernameOrEmail(e.target.value)} placeholder="Email/Username" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm mb-4"></input>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm mb-4"></input>
              <h3 className="text-blue-600 ml-0.5 cursor-pointer mb-6" onClick={() => { setShowSignup(true); setShowLogin(false); }}>Sign up</h3>
              <div className="flex justify-end items-center px-1">
                <GoogleButton />
                <button type="submit" style={{ height: "38px" }} className="cursor-pointer px-4 ml-2 bg-white rounded-full sora-font text-sm border border-gray-500 text-gray-800">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export function SignUpSheet({signupState, loginState}) {
  const { setShowLogin } = loginState;
  const { showSignup, setShowSignup } = signupState;

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);

  async function handleSubmit(i) {
    i.preventDefault();
    const output = await postUserRegister("/auth/register", username.trim(), password, displayName.trim(), email.trim());
    if (output === null) {
      return;
    }
    setShowLogin(true);
    setShowSignup(false);
  }


  return (
    <>
      <div
        style={{ display: showSignup ? "" : "none" }}
        className="w-100 h-110 rounded-xl bg-blue-200 row-start-1 col-start-1 border border-gray-400"
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
              onClick={() => {setShowSignup(false);}}
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
              <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm mb-4"></input>
              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm mb-4"></input>
              <input onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm mb-4"></input>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2.5 pl-3.5 w-80 rounded-md block bg-blue-100 mt-2 sora-font text-sm mb-4"></input>
              <div className="flex justify-end items-center px-1">
                <button type="submit" style={{ height: "38px" }} className="cursor-pointer px-4 ml-2 bg-white rounded-full sora-font text-sm border border-gray-500 text-gray-800">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}