import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { MdArrowBackIos } from "react-icons/md";
import { TaskContext } from "../Context/TaskContext";

function EditTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateTask, allTask } = useContext(TaskContext);

  useEffect(() => {
    const task = allTask.find((t) => t._id === id);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        tag: task.tag,
      });
    }
  }, [id, allTask]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    const { title, description, tag } = formData;
    if (!title || !description || !tag) {
      setError("Please fill all fields");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;
    try {
      await updateTask(id, formData);
      // console.log("Task updated:", formData);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <form
        className="flex flex-col justify-center items-center gap-12 container mx-auto"
        onSubmit={handleSubmit}
      >
        <Link to="/new-task">
          <div className="w-80 md:w-160 lg:w-240 xl:w-275 text-left">
            <p className="font-semibold text-4xl flex">
              <MdArrowBackIos size={45} /> Edit Task
            </p>
          </div>
        </Link>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Task
          </span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            className="border border-gray-400 w-full h-14 rounded-sm px-8"
            placeholder="E.g. Project Defence, Assignment..."
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Description
          </span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="border border-gray-400 w-full h-40 rounded-sm px-8 py-4 resize-none"
            placeholder="Briefly describe your task..."
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Tags
          </span>
          <select
            name="tag"
            value={formData.tag}
            onChange={handleOnChange}
            className="border border-gray-400 w-full py-4 rounded-sm px-8"
          >
            <option value="">Select a tag</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
          </select>
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <button
          type="submit"
          className="w-80 md:w-160 lg:w-240 xl:w-275 bg-purple-600 rounded-md py-4 px-4 text-white cursor-pointer"
        >
          Update
        </button>
      </form>
    </Layout>
  );
}

export default EditTask;
