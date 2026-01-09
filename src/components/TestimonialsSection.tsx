import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      location: "San Francisco, USA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "The homestay in Nepal changed my perspective on travel. Living with a local family gave me insights no hotel could provide. The mountain views from their kitchen were priceless!",
      trip: "Nepal Mountain Adventure"
    },
    {
      name: "Marco Rodriguez",
      location: "Madrid, Spain", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "HomestayHub connected me with the most amazing host in Bali. Not only did I have a beautiful place to stay, but I learned to cook traditional dishes and discovered hidden beaches.",
      trip: "Bali Cultural Immersion"
    },
    {
      name: "Amara Okafor",
      location: "Lagos, Nigeria",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "As a solo female traveler, I was initially nervous. But my host family in Thailand treated me like their daughter. I felt safe, welcomed, and truly part of the community.",
      trip: "Thailand Solo Journey"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4">
            Stories from Our Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from travelers who chose authentic homestay adventures
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-card rounded-3xl p-8 shadow-floating hover:shadow-premium transition-spring hover:-translate-y-2 group animate-slide-up border border-warmth/10"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-gradient-premium rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                <Quote className="w-6 h-6 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              {/* Trip Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-gradient-sunset/10 text-primary text-sm rounded-full border border-primary/20">
                  {testimonial.trip}
                </span>
              </div>
              
              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;