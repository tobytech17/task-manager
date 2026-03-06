import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import nav from "../assets/nav.png";

function NewTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/tasks", {
      title,
      description,
      tag,
    });

    navigate("/tasks");
  };

  return (
    <div>
      <img src={nav} alt="header" className="w-full" />
      <h1>New Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
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

export default NewTask;
