import React from "react";
// import logo from "../icons/GRADIA_LOGO.png"

function Navbar({
  toggleComponent,
  handleSignOut,
  showBasicCalendar,
  handleUserTimes,
}) {
  return (
    <nav className=" p-4  top-0 w-full z-50" style={{ color: "#323232" }}>
      <div className="container mx-auto flex justify-center items-center">
        <div>
          <button className="text-white mr-4" onClick={toggleComponent}>
            <span className="text-white px-5">
              {showBasicCalendar ? "Show GradeView" : "Show BasicCalendar"}
            </span>
          </button>
        </div>
        <div className="flex item-center">
          {/* <img src={logo} alt="Logo" className="h-12" /> */}
          <span
            className="text-white text-lg font-bold ml-2 px-5 "
            style={{ color: "#DAA520", fontFamily: "consolas" }}
          >
            Gradia
          </span>
        </div>
        {/* <div>
          <button className="text-white px-5" onClick={handleUserTimes}>
            <span className="text-white px-5">Update Work Time</span>
          </button>
        </div> */}
        <div>
          <button className="text-white px-5" onClick={handleSignOut}>
            <span className="text-white px-5">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
