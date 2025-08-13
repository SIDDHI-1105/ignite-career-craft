import { Search, Filter, MapPin, Building, Clock, DollarSign, BookmarkPlus, Eye, Users, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                <span>2,847 new jobs today</span>
              </div>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Search Section */}
        <div className="mb-8 bg-gradient-card rounded-2xl p-8 shadow-lg border border-border/50">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Discover Your Next Opportunity</h2>
            <p className="text-muted-foreground text-lg">Join thousands of professionals finding their perfect match</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Job title, keywords, or company..." 
                className="pl-12 h-14 text-lg bg-background border-border/50 focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div className="md:w-64 relative">
              <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Location or remote" 
                className="pl-12 h-14 text-lg bg-background border-border/50 focus:border-primary focus:ring-primary/20"
              />
            </div>
            <Button size="lg" className="h-14 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <Search className="h-5 w-5 mr-2" />
              Search Jobs
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-elevated sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Filter className="h-5 w-5 text-primary" />
                  Smart Filters
                </CardTitle>
                <p className="text-sm text-muted-foreground">Refine your search</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Job Title
                  </label>
                  <Input placeholder="e.g. Software Engineer" className="border-border/50 focus:border-primary" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Company
                  </label>
                  <Input placeholder="e.g. Google, Apple" className="border-border/50 focus:border-primary" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Location
                  </label>
                  <Input placeholder="e.g. San Francisco, Remote" className="border-border/50 focus:border-primary" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Experience Level
                  </label>
                  <Select>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Job Type
                  </label>
                  <Select>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Salary Range
                  </label>
                  <Select>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50k">$0 - $50k</SelectItem>
                      <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                      <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                      <SelectItem value="150k+">$150k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            {/* Job Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Featured Jobs</h2>
                <p className="text-muted-foreground">5 perfect matches found for you</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  <Star className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date Posted</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Job Cards */}
            <div className="space-y-6">
              {/* Premium Job Card */}
              <Card className="card-elevated hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-card">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20">Featured</Badge>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          <Star className="h-3 w-3 mr-1" />
                          Top Match
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                        Senior Software Engineer
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" />
                          TechCorp
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          San Francisco, CA
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Full-time
                        </span>
                        <span className="flex items-center gap-2 font-semibold text-foreground">
                          <DollarSign className="h-4 w-4 text-success" />
                          $120k - $180k
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        Join our innovative team building next-generation applications with React, Node.js, and cutting-edge technologies. 
                        Competitive benefits, equity, and remote-friendly culture.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                        <Badge variant="secondary">Remote OK</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-6">
                      <Button className="bg-gradient-primary hover:shadow-glow">
                        Apply Now
                        <ArrowRight className="h-4 w-4 ml-2" />
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

              {/* Regular Job Cards */}
              {[
                {
                  title: "Frontend Developer",
                  company: "StartupXYZ",
                  location: "Remote",
                  type: "Full-time",
                  salary: "$90k - $130k",
                  description: "Build beautiful user interfaces with modern React, TypeScript, and Tailwind CSS. Join our passionate team creating the future of web applications.",
                  skills: ["React", "TypeScript", "Tailwind", "Next.js"],
                  featured: false
                },
                {
                  title: "Product Manager",
                  company: "InnovateCo",
                  location: "New York, NY",
                  type: "Full-time",
                  salary: "$110k - $160k",
                  description: "Drive product strategy and roadmap for our core platform. Collaborate with engineering, design, and business teams to deliver exceptional experiences.",
                  skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
                  featured: false
                },
                {
                  title: "Data Scientist",
                  company: "DataFlow",
                  location: "Austin, TX",
                  type: "Full-time",
                  salary: "$100k - $150k",
                  description: "Analyze complex datasets and build machine learning models to drive business insights. Work with Python, SQL, and modern ML frameworks.",
                  skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
                  featured: false
                },
                {
                  title: "UX Designer",
                  company: "DesignStudio",
                  location: "Los Angeles, CA",
                  type: "Contract",
                  salary: "$80k - $120k",
                  description: "Create intuitive and engaging user experiences for mobile and web applications. Strong portfolio showcasing design thinking required.",
                  skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
                  featured: false
                }
              ].map((job, index) => (
                <Card key={index} className="card-elevated hover:shadow-xl transition-all duration-300 hover:border-primary/20">
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
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-2 font-semibold text-foreground">
                            <DollarSign className="h-4 w-4 text-success" />
                            {job.salary}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
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

            {/* Load More Section */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
                Load More Jobs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;