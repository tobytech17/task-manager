import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { TaskContext } from "../Context/TaskContext";
import TaskCard from "../Components/TaskCard";
export default function MyTask() {
  const { allTask, getTasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const addNewTask = (e) => {
    e.preventDefault();
    navigate("/new-task");
  };
  // Fetch tasks when this component mounts
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <Layout>
      <div className="flex flex-row justify-between items-center py-4 px-4 sm:px-8 md:px-14 lg:px-20 mb-6 sm:mb-8">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          My Task
        </p>
        <button
          onClick={addNewTask}
          className="text-purple-400 bg-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer whitespace-nowrap"
        >
          + Add New Task
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 py-2 sm:py-4 px-2 sm:px-0 ">
        {allTask.length > 0 ? (
          allTask.map((task) => (
            <TaskCard
              key={task._id} // assuming MongoDB, otherwise use task.id
              _id={task._id}
              title={task.title}
              description={task.description}
              tag={task.tag}
            />
          ))
        ) : (
          <p className="text-purple-600 text-center text-sm sm:text-base">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </Layout>
  );
}
