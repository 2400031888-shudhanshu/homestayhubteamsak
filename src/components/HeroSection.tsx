import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Home } from "lucide-react";
import heroImage from "@/assets/hero-bali-terraces.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
            Discover Authentic
            <span className="block bg-gradient-to-r from-warmth via-gold to-coral bg-clip-text text-transparent animate-glow">
              Homestay Experiences
            </span>
          </h1>
          <p className="text-xl md:text-3xl mb-8 font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
            Connect with local hosts and explore hidden gems in your destination. 
            <span className="block mt-2 text-warmth font-medium">Experience travel like a local, not a tourist.</span>
          </p>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="animate-scale-in delay-300">
          <div className="bg-white/10 backdrop-blur-glass rounded-3xl p-8 mb-10 max-w-3xl mx-auto shadow-glass border border-white/20 hover:bg-white/15 transition-smooth">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 w-6 h-6 animate-float" />
                <Input 
                  placeholder="Where do you want to stay?"
                  className="pl-12 h-14 bg-white/10 border-white/30 text-white text-lg placeholder:text-white/70 focus:bg-white/20 focus:border-white/50 transition-smooth rounded-2xl"
                />
              </div>
              <Button variant="adventure" size="lg" className="px-10 h-14 text-lg font-semibold rounded-2xl">
                <Search className="w-6 h-6 mr-3" />
                Search Homestays
              </Button>
            </div>
            <div className="flex items-center justify-center mt-6 text-white/60 text-sm">
              <span>Popular: </span>
              <div className="flex gap-2 ml-2">
                {["Bali", "Nepal", "Thailand", "Peru"].map((place) => (
                  <button 
                    key={place}
                    className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-smooth text-white/80 hover:text-white"
                  >
                    {place}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="animate-slide-up delay-500">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-medium rounded-2xl group">
              <Users className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              I'm a Tourist
            </Button>
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-medium rounded-2xl group">
              <Home className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              I'm a Host
            </Button>
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-medium rounded-2xl group">
              <MapPin className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              I'm a Local Guide
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
          <div className="w-1.5 h-4 bg-gradient-to-b from-white/80 to-transparent rounded-full mt-3 animate-pulse" />
        </div>
        <p className="text-xs mt-2 text-white/60 font-light">Explore</p>
      </div>
    </section>
  );
};

export default HeroSection;