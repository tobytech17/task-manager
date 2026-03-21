import { useState, createContext, useEffect } from "react";
import API from "../api";

export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [allNotes, setAllNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await API.get(`/api/notes/`);
      setAllNotes([...response.data]); // save notes in state
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };
  //Auto fetch notes when app loads if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getNotes();
    }
  }, []);

  const createNote = async (formData) => {
    try {
      const response = await API.post(`/api/notes/`, formData);
      setAllNotes((prev) => [response.data, ...prev]); // add new note to state immediately
      return response.data;
    } catch (error) {
      console.error("Error creating note:", error);
      console.error("Server response:", error.response?.data);
      console.error("Status:", error.response?.status);
      throw error;
    }
  };

  // const createNote = async (formData) => {
  //   try {
  //     const response = await API.post(`/api/notes/`, formData);
  //     await getNotes();
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error creating note:", error);
  //     console.error("Server response:", error.response?.data);
  //     console.error("Status:", error.response?.status);
  //     throw error;
  //   }
  // };

  const updateNote = async (id, formData) => {
    try {
      const response = await API.put(`/api/notes/${id}`, formData);
      await getNotes();
      // setAllNotes((prev) =>
      //   prev.map((note) => (note._id === id ? response.data : note)),
      // );
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`);
      await getNotes();
      // setAllNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  return (
    <NoteContext.Provider
      value={{ allNotes, createNote, getNotes, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
}
