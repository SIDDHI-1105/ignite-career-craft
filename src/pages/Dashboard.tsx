import React, { useEffect, useState } from "react";
import {
  Search, Filter, MapPin, Building, Clock, DollarSign,
  BookmarkPlus, Eye, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/") // your backend endpoint
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
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
              <span>{jobs.length} jobs found</span>
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
            {/* Keep your filter UI here */}
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
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-primary" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              {job.location}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {job.description || "No description available."}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 ml-6">
                          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                            Apply
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <BookmarkPlus className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
