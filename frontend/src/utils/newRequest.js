import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5000/api/notes/",
});

export default newRequest;
