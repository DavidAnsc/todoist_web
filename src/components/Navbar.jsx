export function Navbar({userState, loginState}) {

  const {user, setUser} = userState;
  const { showLogin, setShowLogin } = loginState;

  return (
    <>
    <div className="fixed top-0 w-full bg-[#E5E5E5] z-999999">
      <div className="flex justify-between items-center px-6 pt-2">
        <h1 className="sm:text-2xl md:text-3xl lg:text-4xl sora-font tracking-tighter">todoist</h1>
        <div className="flex gap-3 items-center lg:text-lg">
          <div style={{display: user !== null ? "" : "none"}} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gray-600"></div>
            <h2>{user !== null ? user.displayName : "Login"}</h2>
          </div>
          <div style={{display: user !== null ? "none" : ""}}>
            <button onClick={() => setShowLogin(true)} style={{ height: "38px" }} className="cursor-pointer px-4 ml-2 bg-white rounded-full sora-font text-sm border border-gray-500 text-gray-800">Login</button>
          </div>
        </div>
      </div>
      <div className="px-3">
      <hr className="mt-2.5"></hr>
      </div>
    </div>
    </>
  );
}