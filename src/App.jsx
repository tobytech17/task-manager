import React from "react";
import { Routes, Route } from "react-router-dom";
import CoverPage from "./Pages/CoverPage";
import MyTasks from "./Pages/MyTasks";
import NewTask from "./Pages/NewTask";
import EditTask from "./Pages/EditTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
