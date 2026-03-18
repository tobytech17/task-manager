import React from "react";
import { Routes, Route } from "react-router-dom";
import CoverPage from "./Pages/CoverPage";
import MyTasks from "./Pages/MyTasks";
import NewTask from "./Pages/NewTask";
import EditTask from "./Pages/EditTask";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notes from "./Pages/Notes";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-task"
          element={
            <ProtectedRoute>
              <NewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
