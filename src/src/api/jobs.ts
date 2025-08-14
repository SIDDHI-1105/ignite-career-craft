import axios from "axios";

export const fetchJobs = async () => {
  const res = await axios.get("http://localhost:3000/api/jobs"); // replace with your backend endpoint
  return res.data;
};
