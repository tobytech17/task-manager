import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="border-b border-b-gray-400 ">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-4 ">
        <Link to="/" className="shrink-0">
          <div className="w-39.25 h-10.25">
            <img src={logo} alt="Logo" className="h-full w-auto" />
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/new-task">
            <p className="text-xl font-bold">New task</p>
          </Link>
          <Link to="/tasks">
            <p className="text-xl font-bold">All tasks</p>
          </Link>
          <img src={avatar} alt="User Avatar" className="" />
        </nav>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col bg-white shadow-lg rounded-md p-4 gap-4">
          <Link
            to="/new-task"
            onClick={() => setIsMenuOpen(false)}
            className=""
          >
            New task
          </Link>
          <Link to="/tasks" onClick={() => setIsMenuOpen(false)} className="">
            All tasks
          </Link>
          <img src={avatar} alt="User Avatar" className="" />
        </div>
      )}
    </header>
  );
}
