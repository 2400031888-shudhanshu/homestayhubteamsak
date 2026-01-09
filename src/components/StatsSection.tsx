import { Users, Home, MapPin, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Home,
      number: "10,000+",
      label: "Verified Homestays",
      description: "Across 50+ countries"
    },
    {
      icon: Users,
      number: "500K+",
      label: "Happy Travelers",
      description: "Authentic experiences"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Average Rating",
      description: "From our community"
    },
    {
      icon: MapPin,
      number: "2,000+",
      label: "Local Guides",
      description: "Expert recommendations"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-mesh">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our global community of adventurers discovering authentic local experiences
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-sunset rounded-2xl flex items-center justify-center mx-auto shadow-premium group-hover:shadow-glow transition-spring group-hover:scale-110">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-sunset opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-smooth" />
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2 font-display">
                {stat.number}
              </h3>
              <p className="text-lg font-semibold text-primary mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;