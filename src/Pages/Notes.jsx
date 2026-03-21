import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { NoteContext } from "../Context/NoteContext";
import NoteCard from "../Components/NoteCard";
import { toast } from "react-toastify";

export default function Notes() {
  const { createNote, updateNote, deleteNote, getNotes } =
    useContext(NoteContext);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetch();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const newNote = await createNote(formData);
      setNotes((prev) => [newNote, ...prev]);
      setFormData({ title: "", content: "" });
      toast.success("Note created successfully!");
    } catch (error) {
      setError("Error creating note");
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      setError("Error deleting note");
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = async (id, editData) => {
    try {
      const updated = await updateNote(id, editData);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? updated : note)),
      );
      toast.success("Note updated successfully!");
    } catch (error) {
      setError("Error updating note");
      toast.error("Failed to update note");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col px-4 sm:px-8 md:px-14 lg:px-20 py-6 gap-8">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          My Notes
        </p>

        {/* Create Note Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-gray-300 rounded-md p-6"
        >
          <p className="text-lg font-semibold text-purple-600">Add New Note</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Note title"
            className="border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            className="border border-gray-400 rounded-md px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Note"}
          </button>
        </form>

        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes by title or content..."
          className=" w-full border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Notes List */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                _id={note._id}
                title={note.title}
                content={note.content}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p className="text-purple-600 text-center text-sm sm:text-base">
              {search
                ? "No notes match your search."
                : "No notes yet. Add one above!"}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
