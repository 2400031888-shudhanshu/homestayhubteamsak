import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import HomestayCard from '@/components/HomestayCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppContext } from '@/contexts/AppContext';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import mountainVillage from '@/assets/mountain-village.jpg';
import coastalHomestay from '@/assets/coastal-homestay.jpg';

const Homestays = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { addToSearchHistory } = useAppContext();

  // Mock data with API integration ready
  const homestays = [
    {
      id: '1',
      image: mountainVillage,
      title: 'Mountain Village Retreat',
      location: 'Himalayan Foothills, Nepal',
      rating: 4.9,
      price: 35,
      host: 'Karma Sherpa',
      guests: 4,
      amenities: ['WiFi', 'Mountain View', 'Local Meals', 'Trekking Guide']
    },
    {
      id: '2',
      image: coastalHomestay,
      title: 'Coastal Paradise Home',
      location: 'Bali, Indonesia',
      rating: 4.8,
      price: 45,
      host: 'Made Sutrisna',
      guests: 6,
      amenities: ['Beach Access', 'WiFi', 'Surfboard', 'Cooking Class']
    },
    {
      id: '3',
      image: mountainVillage,
      title: 'Traditional Village House',
      location: 'Chiang Mai, Thailand',
      rating: 4.7,
      price: 28,
      host: 'Niran Patel',
      guests: 3,
      amenities: ['WiFi', 'Rice Paddy View', 'Bike Rental', 'Cooking Class']
    },
    {
      id: '4',
      image: coastalHomestay,
      title: 'Lakeside Cottage',
      location: 'Pokhara, Nepal',
      rating: 4.9,
      price: 40,
      host: 'Sita Gurung',
      guests: 5,
      amenities: ['Lake View', 'WiFi', 'Kayaking', 'Bonfire Area']
    }
  ];

  const filteredHomestays = homestays.filter(homestay => {
    const matchesSearch = homestay.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         homestay.location.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesPrice = homestay.price >= priceRange[0] && homestay.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  useEffect(() => {
    if (debouncedSearch) {
      addToSearchHistory(debouncedSearch);
    }
  }, [debouncedSearch, addToSearchHistory]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">Find Your Perfect Homestay</h1>
            <p className="text-xl text-muted-foreground">Discover authentic accommodations around the world</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl shadow-travel p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by location or homestay name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
              <Button variant="outline" className="h-12">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredHomestays.length} homestays found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHomestays.map((homestay) => (
              <Link key={homestay.id} to={`/homestay/${homestay.id}`}>
                <HomestayCard {...homestay} />
              </Link>
            ))}
          </div>

          {filteredHomestays.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No homestays found matching your criteria</p>
              <Button onClick={() => setSearchQuery('')} className="mt-4">Clear Search</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Homestays;
