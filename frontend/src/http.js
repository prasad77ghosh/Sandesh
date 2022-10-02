import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});
