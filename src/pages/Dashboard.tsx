import React, { useEffect, useState } from "react";
import {
  Search, Filter, MapPin, Building, Clock,
  BookmarkPlus, Eye, Users, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewJob, setPreviewJob] = useState<any | null>(null);
  const { toast } = useToast();
  const [hasMore, setHasMore] = useState<boolean | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const PAGE_SIZE = 10;

  const loadJobs = (q?: string, loc?: string, cmp?: string, t?: string, sal?: string, pg?: number, append = false) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (loc) params.set("location", loc);
    if (cmp) params.set("company", cmp);
    if (t) params.set("type", t);
    if (sal) {
      const [min, max] = sal.split("-").map(s => s.trim());
      if (min) params.set("salaryMin", min.replace(/k/i, "000"));
      if (max) params.set("salaryMax", max.replace(/k/i, "000"));
    }
    if (pg && pg > 1) params.set("page", String(pg));
    params.set("pageSize", String(PAGE_SIZE));
    return fetch(`/api/jobs${params.toString() ? `?${params.toString()}` : ""}`)
      .then(async (res) => {
        const hasMoreHeaderRaw = res.headers.get('X-Has-More');
        const hasMoreHeader = hasMoreHeaderRaw === 'true' ? true : hasMoreHeaderRaw === 'false' ? false : null;
        const totalHeader = res.headers.get('X-Total-Count');
        setTotalCount(totalHeader ? Number(totalHeader) : null);
        const json = await res.json();
        // Fallback: if header missing, infer from page size
        if (hasMoreHeader === null) {
          const inferred = Array.isArray(json) ? json.length >= PAGE_SIZE : false;
          setHasMore(inferred);
        } else {
          setHasMore(hasMoreHeader);
        }
        return json;
      })
      .then(data => {
        setJobs(prev => {
          const combined = append ? [...prev, ...data] : data;
          const seen = new Set<string>();
          const dedup: any[] = [];
          for (const j of combined) {
            const id = `${j.title}|${j.company}|${j.location}|${j.applyLink ?? ''}`;
            if (!seen.has(id)) {
              seen.add(id);
              dedup.push(j);
            }
          }
          return dedup;
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
  loadJobs();
  }, []);

  // Saved jobs persistence
  useEffect(() => {
    const raw = localStorage.getItem('savedJobs');
    if (raw) {
      try { setSaved(new Set(JSON.parse(raw))); } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(Array.from(saved)));
  }, [saved]);

  const jobId = (job: any) => `${job.title}|${job.company}|${job.location}|${job.applyLink ?? ''}`;
  const isSaved = (job: any) => saved.has(jobId(job));
  const toggleSave = (job: any) => {
    const id = jobId(job);
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast({ title: 'Removed', description: 'Job removed from saved.' });
      } else {
        next.add(id);
        toast({ title: 'Saved', description: 'Job added to saved.' });
      }
      return next;
    });
  };

  const openPreview = (job: any) => { setPreviewJob(job); setPreviewOpen(true); };
  const closePreview = () => { setPreviewOpen(false); setPreviewJob(null); };

  const formatCurrency = (codeOrSymbol?: string) => {
    if (!codeOrSymbol) return "";
    const map: Record<string, string> = { USD: "$", NGN: "₦", EUR: "€", GBP: "£", INR: "₹" };
    return map[codeOrSymbol] || codeOrSymbol;
  };

  const formatK = (n?: number, currency?: string) => {
    if (typeof n !== 'number') return '';
    if (currency === 'INR' || currency === '₹') {
      return n.toLocaleString('en-IN');
    }
    if (n >= 1000) return `${Math.round(n / 1000)}k`;
    return `${n}`;
  };

  // Convert non-INR salaries to INR using static approximate rates.
  const FX_TO_INR: Record<string, number> = {
    USD: 83,
    EUR: 92,
    GBP: 105,
    NGN: 0.055, // approx; if values look odd, we'll fall back to original currency
  };
  const toINR = (amount?: number, currency?: string): number | undefined => {
    if (typeof amount !== 'number') return undefined;
    if (!currency || currency === 'INR' || currency === '₹') return amount;
    const rate = FX_TO_INR[currency];
    if (!rate) return undefined;
    return Math.round(amount * rate);
  };
  const formatINR = (n?: number) => {
    if (typeof n !== 'number') return '';
    return n.toLocaleString('en-IN');
  };

  // Normalize employment type and detect remote roles via location text
  const normalizeEmploymentType = (type?: string, loc?: string): string | undefined => {
    const isRemote = (loc || '').toLowerCase().includes('remote');
    if (isRemote) return 'Remote';
    if (!type) return undefined;
    const t = type.toLowerCase();
    if (t.includes('full')) return 'Full-time';
    if (t.includes('part')) return 'Part-time';
    if (t.includes('contract')) return 'Contract';
    if (t.includes('intern')) return 'Internship';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">JobSearch</h1>
              <p className="text-sm text-muted-foreground">Find your dream job</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{(totalCount ?? jobs.length)} jobs found</span>
            </div>
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold mb-1">Smart Filters</h3>
              <p className="text-sm text-muted-foreground mb-6">Refine your search</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <Input placeholder="e.g. Software Engineer" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input placeholder="e.g. Google, Apple" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input placeholder="e.g. San Francisco, Remote" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Experience Level</label>
                  <Select onValueChange={(v) => {/* placeholder for level */}}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Salary Range</label>
          <Select value={salaryRange} onValueChange={setSalaryRange}>
                    <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="300000-600000">₹3L - ₹6L</SelectItem>
                        <SelectItem value="600000-1200000">₹6L - ₹12L</SelectItem>
                        <SelectItem value="1200000-2400000">₹12L - ₹24L</SelectItem>
            <SelectItem value="2400000-999999999">₹24L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full mt-2" onClick={() => { setLoading(true); setPage(1); setHasMore(null); loadJobs(query, location, company, type, salaryRange, 1, false); }}>Apply Filters</Button>
              </div>
            </div>
          </div>

          {/* Main Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Featured Jobs</h2>
            </div>

            {loading ? (
              <p>Loading jobs...</p>
            ) : (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <Card
                    key={index}
                    className="card-elevated hover:shadow-xl transition-all duration-300 hover:border-primary/20"
                  >
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                            {job.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3 gap-4">
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                              <span className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-primary" />
                                {job.company}
                              </span>
                              <span className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                {job.location}
                              </span>
                              {normalizeEmploymentType(job.employmentType, job.location) && (
                                <span className="flex items-center gap-2">
                                  {normalizeEmploymentType(job.employmentType, job.location)}
                                </span>
                              )}
                            </div>
                            {(() => {
                              const inrMin = toINR(job.salaryMin, job.salaryCurrency);
                              const inrMax = toINR(job.salaryMax, job.salaryCurrency);
                              const hasAny = typeof job.salaryMin === 'number' || typeof job.salaryMax === 'number';
                              const hasINR = typeof inrMin === 'number' || typeof inrMax === 'number';
                              if (!hasAny) return null;
                              const cls = 'text-emerald-600 font-semibold';
                              const text = hasINR
                                ? `₹ ${formatINR(inrMin)}${inrMin && inrMax ? ' - ' : ''}${formatINR(inrMax)}`
                                : `${formatCurrency(job.salaryCurrency)} ${formatK(job.salaryMin, job.salaryCurrency)}${(job.salaryMin && job.salaryMax) ? ' - ' : ''}${formatK(job.salaryMax, job.salaryCurrency)}`;
                              return <div className={`shrink-0 ${cls}`}>{text}</div>;
                            })()}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2 clamp-2">
                            {job.description || "No description available."}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            {(() => {
                              const base: string[] = Array.isArray(job.skills) ? job.skills : [];
                              let items: string[] = base;
                              if (!items || items.length === 0) {
                                const desc: string = (job.description || '').toString().toLowerCase();
                                const candidates = [
                                  'react','typescript','javascript','node.js','node','python','java','c++','c#','go','ruby','php',
                                  'sql','nosql','mysql','postgresql','mongodb','tensorflow','pytorch','scikit-learn','ml','machine learning',
                                  'aws','azure','gcp','docker','kubernetes','git','graphql','rest','tailwind','vite','next.js','react native'
                                ];
                                const found = candidates.filter(k => desc.includes(k));
                                items = found;
                              }
                              items = (items || []).slice(0, 6);
                              if (!items.length) return null;
                              return (
                                <>
                                  <span className="text-xs font-medium text-muted-foreground mr-1">Top skills:</span>
                                  {items.map((s: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="rounded-full px-3 py-1 text-sm font-medium">
                                      {s}
                                    </Badge>
                                  ))}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 ml-6 items-end">
                          <Button
                            variant="outline"
                            className="hover:bg-primary hover:text-primary-foreground"
                            onClick={() => { if (job.applyLink) window.open(job.applyLink, "_blank", "noopener,noreferrer"); }}
                            disabled={!job.applyLink}
                          >
                            Apply
                          </Button>
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleSave(job)}
                                  aria-label={isSaved(job) ? 'Unsave job' : 'Save job'}
                                  className={isSaved(job) ? 'border-primary text-primary' : ''}
                                >
                                  <BookmarkPlus className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>{isSaved(job) ? 'Saved' : 'Save'}</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openPreview(job)}
                                  aria-label="Quick view"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Preview</TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {hasMore === false ? (
                  <p className="text-center text-sm text-muted-foreground py-6">No more jobs available right now.</p>
                ) : (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={() => {
                        const next = page + 1;
                        setPage(next);
                        setLoadingMore(true);
                        loadJobs(query, location, company, type, salaryRange, next, true)
                          ?.finally(() => setLoadingMore(false));
                      }}
                      disabled={loadingMore}
                      className="group rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-5 shadow hover:opacity-90"
                      aria-busy={loadingMore}
                    >
                      <span className="mr-3">{loadingMore ? 'Loading…' : 'Load More Jobs'}</span>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
  </div>
  <Dialog open={previewOpen} onOpenChange={(o) => { if (!o) closePreview(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{previewJob?.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-4 text-sm mt-2 text-muted-foreground">
              {previewJob?.company && <span className="flex items-center gap-1"><Building className="h-4 w-4 text-primary" />{previewJob.company}</span>}
              {previewJob?.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{previewJob.location}</span>}
              {previewJob?.employmentType && <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" />{previewJob.employmentType}</span>}
            </div>
          </DialogDescription>
        </DialogHeader>
        {(previewJob?.salaryMin || previewJob?.salaryMax) && (
          <div className="text-sm font-semibold text-emerald-600">
            {formatCurrency(previewJob?.salaryCurrency)} {formatK(previewJob?.salaryMin, previewJob?.salaryCurrency)}{(previewJob?.salaryMin && previewJob?.salaryMax) ? " - " : ""}{formatK(previewJob?.salaryMax, previewJob?.salaryCurrency)}
          </div>
        )}
        {Array.isArray(previewJob?.skills) && previewJob.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewJob.skills.slice(0, 10).map((s: string, i: number) => <Badge key={i} variant="secondary">{s}</Badge>)}
          </div>
        )}
        <div className="max-h-64 overflow-auto text-sm leading-relaxed mt-3 whitespace-pre-line">
          {previewJob?.description || "No description available."}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={closePreview}>Close</Button>
          <Button onClick={() => { if (previewJob?.applyLink) window.open(previewJob.applyLink, '_blank', 'noopener,noreferrer'); }}>Apply Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Dashboard;
