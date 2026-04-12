import { useState } from "react";
import exitImage from "../assets/icons/exit.png";
import settingImage from "../assets/icons/setting.png";
import { getUserLogout } from "../fetch/fetchers/APIDataFetcher";

export function Navbar({userState, loginState, tokenState}) {

  const {user, setUser} = userState;
  const {showLogin, setShowLogin} = loginState;
  const {jwtToken, setToken} = tokenState;

  const [showMenu, setShowMenu] = useState(false);

  function logoutUser() {
    setShowMenu(false);
    getUserLogout("/auth/logout", jwtToken, setUser, setToken);
    setShowLogin(true);
  }

  return (
    <>
    <div className="fixed top-0 w-full bg-[#E5E5E5] z-999999">
      <div className="flex justify-between items-center px-6 pt-2">
        <h1 className="sm:text-2xl md:text-3xl lg:text-4xl sora-font tracking-tighter">todoist</h1>
        <div className="flex gap-3 items-center lg:text-lg">
          <div>
            <div 
              style={{display: user !== null ? "" : "none"}} 
              className="flex items-center gap-2.5 cursor-default"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="w-7 h-7 rounded-xl bg-gray-600"></div>
              <h2>{user !== null ? user.displayName : "Login"}</h2>
            </div>
            <div
              style={{display: showMenu ? "" : "none"}}
              className="absolute right-1.5 top-13 rounded-md p-3 bg-blue-200 w-30 text-sm text-gray-700"
            >
              <div onClick={() => {
                  logoutUser();
                }}
                className="cursor-pointer flex items-center gap-0.5 pb-3.5 relative"
              >
               <img src={exitImage} className="row-start-1 col-start-1 w-3.5 h-4.5 pt-1">
               </img>
                <div className="relative top-0.5 pl-1 inter-font text-sm">Logout</div>
              </div>
              <div onClick={() => {
                  // updatePriority(Priorities.LOW);
                }}
                className="cursor-pointer flex items-center gap-0.5"
              >
               <img src={settingImage} className="row-start-1 col-start-1 w-3.5 h-4.5 pt-1">
               </img>
                <div className="pl-1 relative top-0.5 inter-font text-sm">Preferences</div>
              </div>
            </div>
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