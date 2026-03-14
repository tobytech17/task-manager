import { useState, createContext } from "react";
import axios from "axios";
import API from "../api";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [allTask, setAllTask] = useState([]);

  const createTask = async (formData) => {
    try {
      const response = await API.post(`/api/tasks/`, formData);
      // update state immediately after creating
      setAllTask((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const getTasks = async () => {
    try {
      const response = await API.get(`/api/tasks/`);
      setAllTask(response.data); // save tasks in state
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const updateTask = async (id, formData) => {
    try {
      const response = await API.put(`/api/tasks/${id}`, formData);
      // update state with the modified task
      setAllTask((prev) =>
        prev.map((task) => (task._id === id ? response.data : task)),
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      // remove from state
      setAllTask((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{ allTask, createTask, getTasks, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
