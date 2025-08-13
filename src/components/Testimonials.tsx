import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "JobPilot's AI matching system found me the perfect role in just 2 weeks. The platform understood exactly what I was looking for and connected me with amazing opportunities.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "InnovateLabs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The career guidance and market insights helped me negotiate a 30% salary increase. This platform truly understands the modern job market.",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "UX Designer",
      company: "DesignStudio",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "I love how easy it is to apply to multiple positions and track my applications. The interface is intuitive and the job recommendations are spot-on.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Loved by
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            See what our community of successful job seekers has to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-elevated group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="text-primary/20 mb-4">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-border/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Trusted by professionals at</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Google', 'Microsoft', 'Apple', 'Amazon'].map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-muted-foreground">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;