import axios from "axios";

const API = axios.create({
 baseURL: "https://server-task-manager-xpsw.onrender.com"
});

export default API;