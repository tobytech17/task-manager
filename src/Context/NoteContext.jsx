import { useState, createContext } from "react";
import API from "../api";

export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [allNotes, setAllNotes] = useState([]);

  const createNote = async (formData) => {
    try {
      const response = await API.post(`/api/notes/`, formData);
      setAllNotes((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

  const getNotes = async () => {
    try {
      const response = await API.get(`/api/notes/`);
      setAllNotes(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };

  const updateNote = async (id, formData) => {
    try {
      const response = await API.put(`/api/notes/${id}`, formData);
      setAllNotes((prev) =>
        prev.map((note) => (note._id === id ? response.data : note)),
      );
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`);
      setAllNotes((prev) => prev.filter((note) => note._id !== id));
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
