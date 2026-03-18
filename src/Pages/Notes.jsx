import React, { useContext, useEffect, useState, useRef } from "react";
import Layout from "../Components/Layout";
import { NoteContext } from "../Context/NoteContext";
import NoteCard from "../Components/NoteCard";
import { toast } from "react-toastify";

export default function Notes() {
  const { allNotes, getNotes, createNote } = useContext(NoteContext);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getNotes();
      hasFetched.current = true;
    }
  }, []);

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
    try {
      await createNote(formData);
      setFormData({ title: "", content: "" });
      toast.success("Note created successfully!");
    } catch (error) {
      setError("Error creating note");
      toast.error("Failed to create note");
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
            className="bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Add Note
          </button>
        </form>

        {/* Notes List */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {allNotes.length > 0 ? (
            allNotes.map((note) => (
              <NoteCard
                key={note._id}
                _id={note._id}
                title={note.title}
                content={note.content}
              />
            ))
          ) : (
            <p className="text-purple-600 text-center text-sm sm:text-base">
              No notes yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
