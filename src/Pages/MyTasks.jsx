import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import nav from "../assets/nav.png";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <img src={nav} alt="header" className="w-full" />
      <h1>My Tasks</h1>

      <Link to="/new-task">Add New Task</Link>

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>{task.tag}</p>

          <Link to={`/edit/${task._id}`}>
            <button>Edit</button>
          </Link>

          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyTasks;
