import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Wifi, Car } from "lucide-react";
import { formatPrice } from "@/lib/currency";

interface HomestayCardProps {
  image: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  host: string;
  guests: number;
  amenities: string[];
  className?: string;
}

const HomestayCard = ({
  image,
  title,
  location,
  rating,
  price,
  host,
  guests,
  amenities,
  className = "",
}: HomestayCardProps) => {
  return (
    <div className={`bg-gradient-card rounded-3xl shadow-travel hover:shadow-premium transition-spring overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] ${className}`}>
      {/* Enhanced Image */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-spring"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/95 text-foreground shadow-soft border-0 backdrop-blur-sm">
            <Star className="w-4 h-4 mr-1 fill-current text-amber-400" />
            <span className="font-semibold">{rating}</span>
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-premium text-white shadow-soft border-0">
            Featured
          </Badge>
        </div>
      </div>
      
      {/* Enhanced Content */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-display font-semibold text-card-foreground group-hover:text-primary transition-smooth leading-tight">
            {title}
          </h3>
          <div className="text-right">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-primary">{formatPrice(price).usd}</span>
              <span className="text-muted-foreground text-sm ml-1">/night</span>
            </div>
            <div className="text-sm text-muted-foreground/80 font-medium">
              {formatPrice(price).inr}
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">Hosted by {host} • Up to {guests} guests</span>
        </div>
        
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
              {amenity === 'Parking' && <Car className="w-3 h-3 mr-1" />}
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <Button variant="booking" className="w-full h-12 text-base font-semibold rounded-xl group">
          <span className="group-hover:scale-105 transition-transform">View Details & Book</span>
          <div className="ml-2 group-hover:translate-x-1 transition-transform">→</div>
        </Button>
      </div>
    </div>
  );
};

export default HomestayCard;