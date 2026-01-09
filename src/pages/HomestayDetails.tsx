import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, Star, MapPin, Users, Wifi, ChevronLeft, Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import mountainVillage from '@/assets/mountain-village.jpg';

const HomestayDetails = () => {
  const { id } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useAppContext();
  const { toast } = useToast();
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Mock data - would come from API
  const homestay = {
    id: id || '1',
    image: mountainVillage,
    title: 'Mountain Village Retreat',
    location: 'Himalayan Foothills, Nepal',
    rating: 4.9,
    reviews: 127,
    price: 35,
    host: 'Karma Sherpa',
    hostImage: mountainVillage,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Mountain View', 'Local Meals', 'Trekking Guide', 'Hot Shower', 'Garden'],
    description: 'Experience authentic mountain life in our traditional homestay. Wake up to stunning Himalayan views and enjoy home-cooked meals made with organic vegetables from our garden.',
    house_rules: ['Check-in after 2 PM', 'Check-out before 11 AM', 'No smoking', 'No parties'],
  };

  const favorite = isFavorite(homestay.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(homestay.id);
      toast({ title: 'Removed from favorites' });
    } else {
      addFavorite({ id: homestay.id, type: 'homestay', data: homestay });
      toast({ title: 'Added to favorites', description: 'You can view your favorites anytime' });
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      toast({ title: 'Please select dates', variant: 'destructive' });
      return;
    }
    toast({ 
      title: 'Booking Request Sent!', 
      description: `${homestay.host} will review your booking for ${guests} guests.` 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <Link to="/homestays">
            <Button variant="ghost" className="mb-6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Homestays
            </Button>
          </Link>

          {/* Image Gallery */}
          <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
            <img src={homestay.image} alt={homestay.title} className="w-full h-full object-cover" />
            <Button
              variant="glass"
              size="icon"
              className="absolute top-4 right-4"
              onClick={handleFavoriteToggle}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-display font-bold mb-4">{homestay.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-semibold">{homestay.rating}</span>
                    <span className="ml-1">({homestay.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    {homestay.location}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="bg-card rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">About this homestay</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{homestay.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{homestay.maxGuests} Guests</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-2xl mb-2">🛏️</div>
                    <div className="font-semibold">{homestay.bedrooms} Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-2xl mb-2">🚿</div>
                    <div className="font-semibold">{homestay.bathrooms} Bathroom</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <Wifi className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">WiFi</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-card rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {homestay.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="bg-card rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4">House Rules</h2>
                <ul className="space-y-2">
                  {homestay.house_rules.map((rule, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <span className="mr-2">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-premium sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold text-primary">{formatPrice(homestay.price).usd}</span>
                    <span className="text-muted-foreground ml-2">/night</span>
                  </div>
                  <div className="text-lg text-muted-foreground font-medium">
                    {formatPrice(homestay.price).inr} /night
                  </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background"
                    >
                      {[...Array(homestay.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" variant="booking" className="w-full h-12">
                    <Calendar className="w-4 h-4 mr-2" />
                    Request to Book
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center">
                    <img 
                      src={homestay.hostImage} 
                      alt={homestay.host}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-semibold">Hosted by {homestay.host}</div>
                      <div className="text-sm text-muted-foreground">Superhost</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomestayDetails;
