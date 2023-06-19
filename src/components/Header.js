import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import firebase from "../firebase";

const Header = ({
  fbName,
  fbEmail,
  fbUid,
  setFBName,
  setFBEmail,
  setFBUid,
}) => {
  const navigate = useNavigate();
  // fg 로그아웃
  const handleLogout = () => {
    firebase.auth().signOut();
    console.log("로그아웃");
    setFBName("");
    setFBEmail("");
    setFBUid("");
    navigate("/");
  };
  return (
    <header className="p-7 bg-blue-400">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="text-white hover:text-blue-200">
          로고
        </NavLink>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => {
                return isActive
                  ? "text-slate-600 font-bold"
                  : "text-white font-bold";
              }}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return isActive
                  ? "text-slate-600 font-bold"
                  : "text-white font-bold";
              }}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
           to = "/todo"
              className={({ isActive }) => {
                return isActive
                  ? "text-slate-600 font-bold"
                  : "text-white font-bold";
              }}
            >
              TODO
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          {fbUid ? (
            <div className="text-white">
              {fbName} {fbEmail} {fbUid}
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage">마이페이지</Link>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return isActive
                    ? "text-slate-600 font-bold"
                    : "text-white font-bold";
                }}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive
                    ? "text-slate-600 font-bold"
                    : "text-white font-bold";
                }}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;