import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/user",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});
