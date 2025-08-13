import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const benefits = [
    "Free to join and use",
    "AI-powered job matching",
    "Access to exclusive opportunities",
    "Career guidance and support"
  ];

  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have already found their dream jobs. 
            Start your journey today and discover opportunities that match your ambitions.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center md:justify-start space-x-3 text-white/90 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 group">
              Start Your Job Search
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="text-3xl font-bold text-white mb-2">14 Days</div>
              <div className="text-white/80 text-sm">Average Time to Hire</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-3xl font-bold text-white mb-2">$85K</div>
              <div className="text-white/80 text-sm">Average Salary Increase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default CallToAction;