import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
  exposedHeaders: ["X-Has-More", "X-Total-Count"],
}));
app.use(express.json());

// Simple in-memory cache for total counts to reduce API calls
// Keyed by the filter combination; TTL 5 minutes
const totalCountCache = new Map(); // key -> { count, ts }
const TOTAL_CACHE_TTL_MS = 5 * 60 * 1000;

app.get("/jobs", async (req, res) => {
  try {
    const query = req.query.q || "Software Engineer";
    const location = req.query.location || "India";
  const companyFilter = (req.query.company || "").toString();
  const typeFilter = (req.query.type || "").toString();
  const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
  const pageSize = Number(req.query.pageSize) > 0 ? Number(req.query.pageSize) : 10;
  const salaryMinFilter = isNaN(Number(req.query.salaryMin)) ? null : Number(req.query.salaryMin);
  const salaryMaxFilter = isNaN(Number(req.query.salaryMax)) ? null : Number(req.query.salaryMax);

    // If no API key is set, return mock data so frontend can work locally
    if (!process.env.RAPIDAPI_KEY) {
      const mock = [
        {
          title: "Software Engineer",
          company: "Acme Corp",
          location: "Remote",
      description: "Build and ship delightful features with React and Node.js.",
      applyLink: "https://example.com/apply/1",
      salaryMin: 120000,
      salaryMax: 180000,
      salaryCurrency: "$",
      employmentType: "Full-time",
      skills: ["React", "TypeScript", "Node.js", "Remote OK"],
        },
        {
          title: "Frontend Developer",
          company: "Globex",
          location: "Lagos, NG",
      description: "Implement UI with Tailwind and TypeScript.",
      applyLink: "https://example.com/apply/2",
      salaryMin: 6000000,
      salaryMax: 9000000,
      salaryCurrency: "₦",
      employmentType: "Contract",
      skills: ["Tailwind", "TypeScript", "Vite"],
        },
      ];
      // Apply filters to mock data
      let filtered = mock;
      if (companyFilter) {
        const cf = companyFilter.toLowerCase();
        filtered = filtered.filter(j => j.company?.toLowerCase().includes(cf));
      }
      if (typeFilter) {
        const tf = typeFilter.toLowerCase();
        filtered = filtered.filter(j => j.employmentType?.toLowerCase() === tf);
      }
      if (salaryMinFilter !== null || salaryMaxFilter !== null) {
        filtered = filtered.filter(j => {
          const jMin = j.salaryMin ?? j.salaryMax ?? null;
          const jMax = j.salaryMax ?? j.salaryMin ?? null;
          if (jMin === null && jMax === null) return false;
          if (salaryMinFilter !== null && jMax !== null && jMax < salaryMinFilter) return false;
          if (salaryMaxFilter !== null && jMin !== null && jMin > salaryMaxFilter) return false;
          return true;
        });
      }
  // Simple pagination over mock
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);
  const hasMore = start + pageSize < filtered.length;
  res.set("X-Has-More", String(hasMore));
  res.set("X-Total-Count", String(filtered.length));
  console.log("Sending", paged.length, "MOCK jobs to frontend (no RAPIDAPI_KEY set)");
  return res.json(paged);
    }

    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: { query: `${query} in ${location}`, page, num_pages: 1 },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    let jobsArray = (response.data.data || []).map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_country,
      description: job.job_description,
      applyLink: job.job_apply_link,
      salaryMin: job.job_min_salary ?? null,
      salaryMax: job.job_max_salary ?? null,
      salaryCurrency: job.job_salary_currency ?? null,
      employmentType: job.job_employment_type ?? null,
      skills: job.job_required_skills || (job.job_highlights?.Qualifications ?? []),
    }));

  // Apply filters server-side
    if (companyFilter) {
      const cf = companyFilter.toLowerCase();
      jobsArray = jobsArray.filter(j => j.company?.toLowerCase().includes(cf));
    }
    if (typeFilter) {
      const tf = typeFilter.toLowerCase();
      jobsArray = jobsArray.filter(j => j.employmentType?.toLowerCase() === tf);
    }
  if (salaryMinFilter !== null || salaryMaxFilter !== null) {
      jobsArray = jobsArray.filter(j => {
        const jMin = j.salaryMin ?? j.salaryMax ?? null;
        const jMax = j.salaryMax ?? j.salaryMin ?? null;
        if (jMin === null && jMax === null) return false;
        if (salaryMinFilter !== null && jMax !== null && jMax < salaryMinFilter) return false;
        if (salaryMaxFilter !== null && jMin !== null && jMin > salaryMaxFilter) return false;
        return true;
      });
    }
  // Compute a better total count by aggregating multiple pages (cached)
  const cacheKey = JSON.stringify({ query, location, companyFilter, typeFilter, salaryMinFilter, salaryMaxFilter });
  const now = Date.now();
  let cached = totalCountCache.get(cacheKey);
  if (!cached || (now - cached.ts) > TOTAL_CACHE_TTL_MS) {
    const aggPages = Math.max(1, Math.min(5, Number(req.query.aggregatePages) || 3));
    let aggregated = [];
    for (let p = 1; p <= aggPages; p++) {
      try {
        const r = await axios.get("https://jsearch.p.rapidapi.com/search", {
          params: { query: `${query} in ${location}`, page: p, num_pages: 1 },
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
          }
        });
        const pageItems = (r.data?.data || []).map(job => ({
          title: job.job_title,
          company: job.employer_name,
          location: job.job_city || job.job_country,
          description: job.job_description,
          applyLink: job.job_apply_link,
          salaryMin: job.job_min_salary ?? null,
          salaryMax: job.job_max_salary ?? null,
          salaryCurrency: job.job_salary_currency ?? null,
          employmentType: job.job_employment_type ?? null,
          skills: job.job_required_skills || (job.job_highlights?.Qualifications ?? []),
        }));
        aggregated = aggregated.concat(pageItems);
        if (!Array.isArray(pageItems) || pageItems.length < 10) break; // early stop if last page reached
      } catch (e) {
        break;
      }
    }
    let filteredAgg = aggregated;
    if (companyFilter) {
      const cf = companyFilter.toLowerCase();
      filteredAgg = filteredAgg.filter(j => j.company?.toLowerCase().includes(cf));
    }
    if (typeFilter) {
      const tf = typeFilter.toLowerCase();
      filteredAgg = filteredAgg.filter(j => j.employmentType?.toLowerCase() === tf);
    }
    if (salaryMinFilter !== null || salaryMaxFilter !== null) {
      filteredAgg = filteredAgg.filter(j => {
        const jMin = j.salaryMin ?? j.salaryMax ?? null;
        const jMax = j.salaryMax ?? j.salaryMin ?? null;
        if (jMin === null && jMax === null) return false;
        if (salaryMinFilter !== null && jMax !== null && jMax < salaryMinFilter) return false;
        if (salaryMaxFilter !== null && jMin !== null && jMin > salaryMaxFilter) return false;
        return true;
      });
    }
    cached = { count: filteredAgg.length, ts: now };
    totalCountCache.set(cacheKey, cached);
  }

  const pageSizeLive = 10; // JSearch typically returns 10 items per page
  const effectiveHasMore = cached ? (cached.count > (page * pageSizeLive)) : ((jobsArray?.length || 0) >= pageSizeLive);
  if (cached) res.set("X-Total-Count", String(cached.count));
  res.set("X-Has-More", String(effectiveHasMore));
  console.log("Sending", jobsArray.length, "jobs to frontend; total:", cached?.count ?? "n/a");
  return res.json(jobsArray);
  } catch (error) {
    console.error("Upstream fetch failed, sending mock jobs:", error?.message || error);
    const fallback = [
      {
        title: "Senior Software Engineer",
        company: "TechCorp",
        location: "San Francisco, CA",
        description: "Join our innovative team building next-gen apps with React and Node.js.",
        applyLink: "https://example.com/apply/3",
        salaryMin: 120000,
        salaryMax: 180000,
        salaryCurrency: "$",
        employmentType: "Full-time",
        skills: ["React", "TypeScript", "Node.js", "Remote OK"],
      },
    ];
    res.json(fallback);
  }
});

// ✅ Add this part
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
