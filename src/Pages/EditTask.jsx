import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import nav from "../assets/nav.png";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const res = await API.get(`/tasks/${id}`);

    setTitle(res.data.title);
    setDescription(res.data.description);
    setTag(res.data.tag);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    await API.put(`/tasks/${id}`, {
      title,
      description,
      tag,
    });

    navigate("/tasks");
  };

  return (
    <div>
      <img src={nav} alt="header" className="w-full" />
      <h1>Edit Task</h1>

      <form onSubmit={updateTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option>Urgent</option>
          <option>Important</option>
        </select>

        <button type="submit">Done</button>
      </form>
    </div>
  );
}

export default EditTask;
