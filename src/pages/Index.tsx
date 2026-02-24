import { Link } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import HomestayCard from "@/components/HomestayCard";
import AttractionCard from "@/components/AttractionCard";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DestinationsSection from "@/components/DestinationsSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MapPin, Star, Home, Sparkles, Globe } from "lucide-react";

// Import our generated images
import japaneseRyokan from "@/assets/japanese-ryokan.jpg";
import moroccanRiad from "@/assets/moroccan-riad.jpg";
import machuPicchu from "@/assets/machu-picchu.jpg";
import homestayDashboard from "@/assets/homestay-dashboard.jpg";

const Index = () => {
  // Sample homestay data
  const featuredHomestays = [
    {
      id: "1",
      image: japaneseRyokan,
      title: "Traditional Kyoto Ryokan",
      location: "Kyoto, Japan",
      rating: 4.9,
      price: 85,
      host: "Yamamoto-san",
      guests: 2,
      amenities: ["Onsen", "Tatami Room", "Kaiseki Meals", "Zen Garden"]
    },
    {
      id: "2",
      image: moroccanRiad,
      title: "Marrakech Heritage Riad",
      location: "Marrakech, Morocco", 
      rating: 4.8,
      price: 55,
      host: "Fatima Benali",
      guests: 4,
      amenities: ["Rooftop Terrace", "Traditional Hammam", "Courtyard", "Cooking Class"]
    }
  ];

  // Sample attraction data
  const nearbyAttractions = [
    {
      image: machuPicchu,
      title: "Machu Picchu Trail",
      location: "Sacred Valley, Peru",
      duration: "Full day",
      rating: 4.9,
      category: "Adventure",
      description: "Trek through the Andes to discover the ancient Incan citadel, a UNESCO World Heritage wonder."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />

      {/* Featured Dashboard Image */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <img
            src={homestayDashboard}
            alt="Charming mountain homestay with travel essentials"
            className="w-full rounded-3xl shadow-premium object-cover max-h-[500px]"
            loading="lazy"
          />
        </div>
      </section>

      <StatsSection />
      <DestinationsSection />
      
      {/* Enhanced Featured Homestays Section */}
      <section id="homestays" className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary mr-3" />
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">Featured Collection</span>
            </div>
            <h2 className="text-6xl font-display font-bold text-foreground mb-6">
              Handpicked Homestays
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover exceptional homestays that offer authentic local experiences, warm hospitality, and unforgettable memories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {featuredHomestays.map((homestay, index) => (
              <div key={homestay.id} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <Link to={`/homestay/${homestay.id}`}>
                  <HomestayCard {...homestay} />
                </Link>
              </div>
            ))}
            
            {/* Enhanced Browse More Card */}
            <div className="animate-slide-up bg-gradient-sunset rounded-3xl p-10 flex flex-col items-center justify-center text-white text-center shadow-premium hover:shadow-glow transition-spring hover:scale-105 relative overflow-hidden" style={{ animationDelay: "300ms" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Globe className="w-10 h-10 text-white animate-float" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3">10,000+ Homestays</h3>
                <p className="mb-8 opacity-90 text-lg leading-relaxed">Discover unique places to stay across 50+ countries worldwide</p>
                <Link to="/homestays">
                  <Button variant="glass" size="lg" className="px-8 h-12 font-semibold">
                    Browse All Homestays
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tourist Attractions Section */}
      <section id="attractions" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore Local Attractions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uncover hidden gems and must-visit places recommended by local hosts and guides
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nearbyAttractions.map((attraction, index) => (
              <AttractionCard key={index} {...attraction} />
            ))}
            
            {/* More attractions placeholder cards */}
            <div className="bg-card rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-travel">
              <MapPin className="w-12 h-12 mb-4 text-nature" />
              <h3 className="text-xl font-semibold mb-2">Adventure Tours</h3>
              <p className="text-muted-foreground mb-4">Guided outdoor activities</p>
              <Link to="/attractions">
                <Button variant="guide">Explore Tours</Button>
              </Link>
            </div>
            
            <div className="bg-card rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-travel">
              <Star className="w-12 h-12 mb-4 text-warmth" />
              <h3 className="text-xl font-semibold mb-2">Local Experiences</h3>
              <p className="text-muted-foreground mb-4">Authentic cultural activities</p>
              <Link to="/attractions">
                <Button variant="guide">Book Experience</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      {/* Enhanced User Roles Section */}
      <section className="py-24 px-4 bg-gradient-mesh">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-display font-bold text-foreground mb-6">
              Join Our Global Community
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you're exploring new cultures, sharing your home, or guiding adventurers, there's a perfect place for you in our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-10 rounded-3xl bg-gradient-card hover:shadow-premium transition-spring hover:-translate-y-2 group border border-trust/20 animate-slide-up">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-ocean rounded-3xl flex items-center justify-center mx-auto shadow-floating group-hover:shadow-glow transition-spring">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-ocean opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-smooth" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-foreground">For Adventurers</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Discover authentic homestays and immerse yourself in local cultures for truly transformative travel experiences
              </p>
              <Link to="/homestays">
                <Button variant="booking" size="lg" className="w-full h-12 text-base font-semibold">
                  Start Your Journey
                </Button>
              </Link>
            </div>
            
            <div className="text-center p-10 rounded-3xl bg-gradient-card hover:shadow-premium transition-spring hover:-translate-y-2 group border border-primary/20 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-sunset rounded-3xl flex items-center justify-center mx-auto shadow-floating group-hover:shadow-glow transition-spring">
                  <Home className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-sunset opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-smooth" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-foreground">For Hosts</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Open your home and share your culture with travelers seeking authentic, meaningful connections
              </p>
              <Button variant="adventure" size="lg" className="w-full h-12 text-base font-semibold">
                Become a Host
              </Button>
            </div>
            
            <div className="text-center p-10 rounded-3xl bg-gradient-card hover:shadow-premium transition-spring hover:-translate-y-2 group border border-nature/20 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-nature rounded-3xl flex items-center justify-center mx-auto shadow-floating group-hover:shadow-glow transition-spring">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-nature opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-smooth" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-foreground">For Local Guides</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Share your expertise and reveal the hidden gems that make your destination truly special
              </p>
              <Button variant="guide" size="lg" className="w-full h-12 text-base font-semibold">
                Join as Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-foreground via-foreground to-primary/20 text-white py-20 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-sunset rounded-2xl flex items-center justify-center shadow-glow">
                <Home className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-display font-bold">HomestayHub</span>
            </div>
            <p className="text-white/80 mb-8 text-xl max-w-2xl mx-auto leading-relaxed">
              Connecting travelers with authentic homestay experiences and local cultures worldwide
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-warmth">10K+</div>
                <div className="text-white/70 text-sm">Homestays</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warmth">500K+</div>
                <div className="text-white/70 text-sm">Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warmth">50+</div>
                <div className="text-white/70 text-sm">Countries</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-8 text-lg mb-8">
            <a href="#" className="hover:text-warmth transition-smooth hover:scale-105 transform">About Us</a>
            <a href="#" className="hover:text-warmth transition-smooth hover:scale-105 transform">How It Works</a>
            <a href="#" className="hover:text-warmth transition-smooth hover:scale-105 transform">Safety</a>
            <Link to="/contact" className="hover:text-warmth transition-smooth hover:scale-105 transform">Contact</Link>
            <a href="#" className="hover:text-warmth transition-smooth hover:scale-105 transform">Terms</a>
            <a href="#" className="hover:text-warmth transition-smooth hover:scale-105 transform">Privacy</a>
          </div>
          
          <div className="text-center text-white/60 text-sm">
            <p>© 2024 HomestayHub. Made with ❤️ for authentic travel experiences.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;