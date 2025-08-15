import axios from "axios";

export const fetchJobs = async () => {
  const res = await axios.get("/api/jobs");
  return res.data;
};
