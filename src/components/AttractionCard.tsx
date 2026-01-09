import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Camera, Star } from "lucide-react";

interface AttractionCardProps {
  image: string;
  title: string;
  location: string;
  duration: string;
  rating: number;
  category: string;
  description: string;
  className?: string;
}

const AttractionCard = ({
  image,
  title,
  location,
  duration,
  rating,
  category,
  description,
  className = "",
}: AttractionCardProps) => {
  return (
    <div className={`bg-card rounded-2xl shadow-travel hover:shadow-warm transition-smooth overflow-hidden group ${className}`}>
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-nature text-white">
            {category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
            {rating}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-smooth">
          {title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex gap-2">
          <Button variant="guide" className="flex-1">
            <MapPin className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          <Button variant="outline" size="icon">
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;