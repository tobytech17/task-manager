import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./Context/TaskContext.jsx";
import { NoteProvider } from "./Context/NoteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>,
);
