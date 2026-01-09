import { useState } from "react";
import { MapPin, Plane, Calendar, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import destination images
import santoriniSunset from "@/assets/santorini-sunset.jpg";
import machuPicchu from "@/assets/machu-picchu.jpg";
import moroccanRiad from "@/assets/moroccan-riad.jpg";
import keralaBackwaters from "@/assets/kerala-backwaters.jpg";
import japaneseRyokan from "@/assets/japanese-ryokan.jpg";

interface Destination {
  id: string;
  image: string;
  name: string;
  country: string;
  description: string;
  homestayCount: number;
  startingPrice: number;
  tags: string[];
}

const destinations: Destination[] = [
  {
    id: "1",
    image: santoriniSunset,
    name: "Santorini",
    country: "Greece",
    description: "Experience Mediterranean magic with stunning sunsets and whitewashed villages perched on volcanic cliffs.",
    homestayCount: 124,
    startingPrice: 65,
    tags: ["Romantic", "Beach", "Photography"]
  },
  {
    id: "2",
    image: machuPicchu,
    name: "Cusco Region",
    country: "Peru",
    description: "Gateway to Machu Picchu with rich Incan heritage, ancient ruins, and warm local hospitality.",
    homestayCount: 89,
    startingPrice: 28,
    tags: ["Adventure", "History", "Trekking"]
  },
  {
    id: "3",
    image: moroccanRiad,
    name: "Marrakech",
    country: "Morocco",
    description: "Stay in traditional riads with ornate courtyards, vibrant souks, and authentic Moroccan cuisine.",
    homestayCount: 156,
    startingPrice: 42,
    tags: ["Cultural", "Food", "Architecture"]
  },
  {
    id: "4",
    image: keralaBackwaters,
    name: "Kerala",
    country: "India",
    description: "Float through serene backwaters on traditional houseboats surrounded by lush coconut groves.",
    homestayCount: 203,
    startingPrice: 22,
    tags: ["Nature", "Wellness", "Unique Stays"]
  },
  {
    id: "5",
    image: japaneseRyokan,
    name: "Kyoto",
    country: "Japan",
    description: "Experience traditional Japanese hospitality in historic ryokans with tatami rooms and zen gardens.",
    homestayCount: 78,
    startingPrice: 85,
    tags: ["Cultural", "Peaceful", "Traditional"]
  }
];

const DestinationsSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 via-background to-muted/20 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 text-primary mr-3 animate-float" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Dream Destinations
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Where Will You <span className="bg-gradient-to-r from-primary via-warmth to-gold bg-clip-text text-transparent">Wander</span> Next?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover handpicked destinations with authentic homestays that immerse you in local culture
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Large Card */}
          <div 
            className="lg:col-span-2 lg:row-span-2 relative group cursor-pointer"
            onMouseEnter={() => setHoveredId(destinations[0].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-premium">
              <img 
                src={destinations[0].image} 
                alt={destinations[0].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              
              {/* Favorite Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(destinations[0].id); }}
                className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-smooth z-10"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors ${favorites.includes(destinations[0].id) ? 'fill-primary text-primary' : 'text-white'}`} 
                />
              </button>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  {destinations[0].tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-white/80 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{destinations[0].country}</span>
                </div>
                <h3 className="text-4xl font-display font-bold mb-3">{destinations[0].name}</h3>
                <p className={`text-white/80 mb-4 max-w-lg transition-all duration-500 ${hoveredId === destinations[0].id ? 'opacity-100' : 'opacity-70'}`}>
                  {destinations[0].description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-2xl font-bold">${destinations[0].startingPrice}</span>
                      <span className="text-white/70">/night</span>
                    </div>
                    <div className="text-white/70">
                      {destinations[0].homestayCount} homestays
                    </div>
                  </div>
                  <Button 
                    variant="glass" 
                    className={`transition-all duration-500 ${hoveredId === destinations[0].id ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                  >
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller Cards */}
          {destinations.slice(1).map((destination, index) => (
            <div 
              key={destination.id}
              className="relative group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-travel hover:shadow-premium transition-spring">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Favorite Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(destination.id); }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-smooth z-10 opacity-0 group-hover:opacity-100"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${favorites.includes(destination.id) ? 'fill-primary text-primary' : 'text-white'}`} 
                  />
                </button>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center text-white/70 text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">{destination.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">${destination.startingPrice}</span>
                      <span className="text-white/70 text-sm">/night</span>
                    </div>
                    <span className="text-white/70 text-sm">
                      {destination.homestayCount} stays
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Inspiration Banner */}
        <div className="bg-gradient-sunset rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <Calendar className="w-6 h-6 mr-2" />
                <span className="font-semibold">Plan Your Next Adventure</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Ready to explore the world?
              </h3>
              <p className="text-white/80 max-w-lg">
                Join over 500,000 travelers who have found their perfect homestay experience
              </p>
            </div>
            <Button variant="glass" size="lg" className="px-10 h-14 text-lg font-semibold whitespace-nowrap">
              View All Destinations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
