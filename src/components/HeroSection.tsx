import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Home, Compass, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-cappadocia.jpg";

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
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-adventure/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-trust/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-10 w-24 h-24 bg-warmth/30 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-warmth animate-glow" />
            <span className="text-warmth font-medium tracking-widest uppercase text-sm">Discover • Experience • Connect</span>
            <Sparkles className="w-5 h-5 text-warmth animate-glow" />
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
            Journey Beyond
            <span className="block bg-gradient-to-r from-adventure via-warmth to-gold bg-clip-text text-transparent animate-glow">
              The Ordinary
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
            Unlock doors to authentic homes and hidden wonders across the globe.
            <span className="block mt-2 text-warmth font-medium">Your next adventure starts with a local connection.</span>
          </p>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="animate-scale-in delay-300">
          <div className="bg-white/10 backdrop-blur-glass rounded-3xl p-8 mb-10 max-w-3xl mx-auto shadow-glass border border-white/20 hover:bg-white/15 transition-smooth">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Compass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 w-6 h-6 animate-float" />
                <Input 
                  placeholder="Where will your journey take you?"
                  className="pl-12 h-14 bg-white/10 border-white/30 text-white text-lg placeholder:text-white/70 focus:bg-white/20 focus:border-white/50 transition-smooth rounded-2xl"
                />
              </div>
              <Button variant="adventure" size="lg" className="px-10 h-14 text-lg font-semibold rounded-2xl">
                <Search className="w-6 h-6 mr-3" />
                Explore Now
              </Button>
            </div>
            <div className="flex items-center justify-center mt-6 text-white/60 text-sm">
              <span>Trending: </span>
              <div className="flex gap-2 ml-2">
                {["Cappadocia", "Santorini", "Kyoto", "Marrakech"].map((place) => (
                  <button 
                    key={place}
                    className="px-4 py-1.5 bg-white/10 rounded-full hover:bg-adventure/40 transition-smooth text-white/80 hover:text-white border border-white/10 hover:border-adventure/50"
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
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-medium rounded-2xl group border-2 border-white/30 hover:border-trust/60 hover:bg-trust/20">
              <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-smooth" />
              I'm a Traveler
            </Button>
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-medium rounded-2xl group border-2 border-white/30 hover:border-adventure/60 hover:bg-adventure/20">
              <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-smooth" />
              I'm a Host
            </Button>
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-medium rounded-2xl group border-2 border-white/30 hover:border-nature/60 hover:bg-nature/20">
              <MapPin className="w-5 h-5 mr-3 group-hover:scale-110 transition-smooth" />
              I'm a Guide
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
          <div className="w-1.5 h-4 bg-gradient-to-b from-adventure to-transparent rounded-full mt-3 animate-pulse" />
        </div>
        <p className="text-xs mt-2 text-white/60 font-light tracking-wider">Explore</p>
      </div>
    </section>
  );
};

export default HeroSection;