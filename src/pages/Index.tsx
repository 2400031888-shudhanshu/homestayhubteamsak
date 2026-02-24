import { Link } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import { MapPin, Compass, Home } from "lucide-react";

import homestayImage from "@/assets/hero-homestay.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-14">
        <HeroSection />
      </div>
      
      {/* User Findings and Project Prototype Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                User Findings and Project Prototype
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Our platform connects travelers with homestay options and provides
                information about nearby tourist attractions, offering personalized
                recommendations and local insights to enhance your travel experience.
              </p>
              
              {/* Feature Cards */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4 shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Compass className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Personalized</p>
                    <p className="font-semibold text-foreground text-sm">Recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4 shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Discover Nearby</p>
                    <p className="font-semibold text-foreground text-sm">Places</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Image */}
            <div className="hidden md:block">
              <img
                src={homestayImage}
                alt="Homestay property"
                className="w-full h-64 object-cover rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="py-6 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Home className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Homestay Finder</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 Homestay Finder. Connecting travelers with authentic stays.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
