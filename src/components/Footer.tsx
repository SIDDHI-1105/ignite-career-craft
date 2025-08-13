import { Search, MapPin, Mail, Phone, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Find Jobs", href: "#jobs" },
        { name: "Browse Companies", href: "#companies" },
        { name: "Salary Insights", href: "#salary" },
        { name: "Career Resources", href: "#resources" }
      ]
    },
    {
      title: "For Employers",
      links: [
        { name: "Post Jobs", href: "#post-jobs" },
        { name: "Find Candidates", href: "#candidates" },
        { name: "Employer Branding", href: "#branding" },
        { name: "Pricing", href: "#pricing" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Career Advice", href: "#advice" },
        { name: "Resume Builder", href: "#resume" },
        { name: "Interview Tips", href: "#interviews" },
        { name: "Blog", href: "#blog" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press", href: "#press" },
        { name: "Contact", href: "#contact" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">JobPilot</span>
              </div>
              
              <p className="text-white/80 leading-relaxed max-w-md">
                Connecting talented professionals with their dream careers through AI-powered matching and personalized career guidance.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white/80">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">123 Business Avenue, Tech City, TC 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">hello@jobpilot.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-white/10">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-white/80 text-sm">
              Get the latest job opportunities and career insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 JobPilot. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-white/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-white/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-white/60 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;