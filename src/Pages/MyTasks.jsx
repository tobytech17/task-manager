import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { TaskContext } from "../Context/TaskContext";
import TaskCard from "../Components/TaskCard";
export default function NewTask() {
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-4 px-6 md:px-20 mb-8">
        <p className="text-2xl md:text-4xl font-semibold">My Task</p>
        <button
          onClick={addNewTask}
          className="text-purple-400 bg-white font-semibold text-lg md:text-xl cursor-pointer"
        >
          + Add New Task
        </button>
      </div>

      <div className="flex flex-col gap-4 py-4">
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
          <p className="text-purple-600 text-center">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </Layout>
  );
}
