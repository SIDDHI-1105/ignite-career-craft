import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/jobs", async (req, res) => {
  try {
    const query = req.query.q || "Software Engineer";
    const location = req.query.location || "India";

    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: { query: `${query} in ${location}`, page: 1, num_pages: 1 },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    const jobsArray = (response.data.data || []).map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_country,
      description: job.job_description,
      applyLink: job.job_apply_link
    }));

    console.log("Sending", jobsArray.length, "jobs to frontend");
    res.json(jobsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ✅ Add this part
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
