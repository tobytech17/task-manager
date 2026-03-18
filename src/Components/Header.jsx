import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="border-b border-b-gray-400 ">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-4 ">
        <Link to="/" className="shrink-0">
          <div className="w-39.25 h-10.25">
            <img src={logo} alt="Logo" className="h-full w-auto" />
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {/* Show task links only if logged in */}
          {token && (
            <>
              <Link to="/new-task">
                <p className="text-xl font-bold">New task</p>
              </Link>

              <Link to="/tasks">
                <p className="text-xl font-bold">All tasks</p>
              </Link>

              <Link to="/notes">
                <p className="text-xl font-bold">Notes</p>
              </Link>
            </>
          )}

          {/* Logged in */}
          {token ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-xl font-semibold cursor-pointer"
              >
                Log out
              </button>

              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          ) : (
            /* Logged out */
            <div className="flex gap-4">
              <Link to="/login">
                <p className="text-xl font-bold text-purple-600">Log in</p>
              </Link>

              <Link to="/register">
                <p className="text-xl font-bold text-purple-600">Register</p>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col bg-white shadow-lg rounded-md p-4 gap-4">
          {token && (
            <>
              <Link to="/new-task" onClick={() => setIsMenuOpen(false)}>
                New task
              </Link>

              <Link to="/tasks" onClick={() => setIsMenuOpen(false)}>
                All tasks
              </Link>

              <Link to="/notes" onClick={() => setIsMenuOpen(false)}>
                Notes
              </Link>
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="text-left text-red-500 font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Log in
              </Link>

              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
