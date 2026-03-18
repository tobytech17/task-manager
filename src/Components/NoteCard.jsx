import React, { useContext, useState } from "react";
import { NoteContext } from "../Context/NoteContext";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
export default function NoteCard({ _id, title, content }) {
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title, content });

  const handleDelete = async () => {
    try {
      await deleteNote(_id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await updateNote(_id, editData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="mx-auto py-4 border border-gray-400 w-[95%] sm:w-[90%] rounded-md">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center mb-4 w-full px-4 sm:px-6 md:px-8">
          <p className="font-semibold text-sm sm:text-base text-purple-600">
            Note
          </p>
          <div className="flex flex-row gap-2 sm:gap-3">
            <button
              onClick={handleEdit}
              className="text-white bg-purple-400 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md flex items-center gap-1.5 cursor-pointer text-sm sm:text-base"
            >
              <FaRegEdit size={16} />
              <span>{isEditing ? "Save" : "Edit"}</span>
            </button>
            <button
              onClick={handleDelete}
              className="text-purple-400 border border-purple-400 bg-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md flex items-center gap-1.5 cursor-pointer text-sm sm:text-base"
            >
              <IoTrashOutline size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        <hr className="w-full border-t border-gray-400 mb-4" />

        <div className="px-4 sm:px-6 md:px-8 flex flex-col gap-2 sm:gap-3">
          {isEditing ? (
            <>
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="border border-gray-400 rounded-md px-4 py-2 text-xl font-semibold w-full"
              />
              <textarea
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                className="border border-gray-400 rounded-md px-4 py-2 text-gray-600 w-full h-32 resize-none"
              />
            </>
          ) : (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold wrap-break-word whitespace-normal">
                {title}
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg wrap-break-word whitespace-normal">
                {content}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
