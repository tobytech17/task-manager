import React, { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TaskContext } from "../Context/TaskContext";
export default function TaskCard({ _id, title, description, tag }) {
  const { deleteTask } = useContext(TaskContext);

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      await deleteTask(_id);
      // console.log("Task deleted:", _id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-auto py-4  border border-gray-400 w-[90%] rounded-md">
      <div className="flex flex-col w-full ">
        <div className="flex flex-col md:flex-row justify-between text-right md:items-center mb-4 w-full px-8">
          <p
            className={`font-semibold px-3 py-1 rounded-md inline-block
              ${tag === "urgent" ? "text-red-600" : ""}
              ${tag === "important" ? "text-green-600" : ""}`}
          >
            {tag}
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={`/edit/${_id}`}>
              <button className="text-white bg-purple-400 py-2 px-4 rounded-md flex gap-2 cursor-pointer">
                <FaRegEdit size={20} /> Edit
              </button>
            </Link>
            <button
              onClick={handleOnClick}
              className="text-purple-400 border border-purple-400 bg-white py-2 px-4 rounded-md flex gap-2 cursor-pointer"
            >
              <IoTrashOutline size={20} /> Delete
            </button>
          </div>
        </div>

        <hr className="w-full border-t border-gray-400 mb-4" />

        <div className="px-8 flex flex-col gap-4">
          <p className="text-4xl font-semibold wrap-break-word whitespace-normal">
            {title}
          </p>
          <p className="text-gray-600 text-xl wrap-break-word whitespace-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
