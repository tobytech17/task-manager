import React, { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TaskContext } from "../Context/TaskContext";
import { toast } from "react-toastify";
export default function TaskCard({ _id, title, description, tag }) {
  const { deleteTask } = useContext(TaskContext);

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      await deleteTask(_id);
      // console.log("Task deleted:", _id);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };
  return (
    <div className="mx-auto py-4  border border-gray-400 w-[95%] sm:w-[90%] rounded-md">
      <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between items-center mb-4 w-full px-4 sm:px-6 md:px-8">
          <p
            className={`font-semibold px-3 py-1 rounded-md text-sm sm:text-base
              ${tag === "urgent" ? "text-red-600" : ""}
              ${tag === "important" ? "text-green-600" : ""}`}
          >
            {tag}
          </p>
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4">
            <Link to={`/edit/${_id}`}>
              <button className="text-white bg-purple-400 py-1.5 sm:py-2  px-3 sm:px-4 rounded-md flex items-center  gap-1.5 sm:gap-2 cursor-pointer text-sm sm:text-base">
                <FaRegEdit size={16} className="sm:hidden" />
                <FaRegEdit size={20} className="hidden sm:block" />
                <span>Edit</span>
              </button>
            </Link>
            <button
              onClick={handleOnClick}
              className="text-purple-400 border border-purple-400 bg-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md flex items-center gap-1.5 sm:gap-2 cursor-pointer text-sm sm:text-base"
            >
              <IoTrashOutline size={16} className="sm:hidden" />
              <IoTrashOutline size={20} className="hidden sm:block" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        <hr className="w-full border-t border-gray-400 mb-4" />

        <div className="px-4 sm:px-6 md:px-8 flex flex-col gap-2 sm:gap-3 md:gap-4">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold wrap-break-word whitespace-normal">
            {title}
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl  wrap-break-word whitespace-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
