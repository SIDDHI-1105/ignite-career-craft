import { Search, Users, Target, TrendingUp, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Our advanced algorithm analyzes your skills, experience, and preferences to find the perfect job matches tailored just for you."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Network Building",
      description: "Connect with industry professionals, mentors, and peers to expand your network and unlock hidden opportunities."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Career Guidance",
      description: "Get personalized career advice, resume reviews, and interview preparation from industry experts and AI coaches."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Insights",
      description: "Access real-time salary data, industry trends, and growth opportunities to make informed career decisions."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Companies",
      description: "All companies on our platform are verified and vetted to ensure legitimate opportunities and fair hiring practices."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Applications",
      description: "Apply to multiple positions with one click using our smart application system and track your progress in real-time."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30" id="features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Powerful tools and features designed to accelerate your job search and connect you with opportunities that matter.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-feature group hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Ready to accelerate your career?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          <button className="btn-hero">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;