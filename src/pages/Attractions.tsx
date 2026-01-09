import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import AttractionCard from '@/components/AttractionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import templeAttraction from '@/assets/temple-attraction.jpg';
import mountainVillage from '@/assets/mountain-village.jpg';

const Attractions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const attractions = [
    {
      id: '1',
      image: templeAttraction,
      title: 'Sacred Temple Complex',
      location: 'Ancient City Center',
      duration: '2-3 hours',
      rating: 4.7,
      category: 'Cultural',
      description: 'Experience the spiritual heart of the city with centuries-old architecture.'
    },
    {
      id: '2',
      image: mountainVillage,
      title: 'Mountain Hiking Trail',
      location: 'National Park',
      duration: '4-5 hours',
      rating: 4.9,
      category: 'Adventure',
      description: 'Challenging trek with breathtaking panoramic views.'
    },
    {
      id: '3',
      image: templeAttraction,
      title: 'Traditional Market',
      location: 'Downtown',
      duration: '1-2 hours',
      rating: 4.5,
      category: 'Cultural',
      description: 'Vibrant local market with authentic street food and crafts.'
    },
    {
      id: '4',
      image: mountainVillage,
      title: 'Waterfall Adventure',
      location: 'Forest Reserve',
      duration: '3-4 hours',
      rating: 4.8,
      category: 'Nature',
      description: 'Hidden waterfall perfect for swimming and photography.'
    }
  ];

  const categories = ['all', 'Cultural', 'Adventure', 'Nature', 'Food'];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">Explore Local Attractions</h1>
            <p className="text-xl text-muted-foreground">Discover the best places to visit recommended by locals</p>
          </div>

          {/* Search */}
          <div className="bg-card rounded-2xl shadow-travel p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="px-4 py-2 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredAttractions.length} attractions found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} {...attraction} />
            ))}
          </div>

          {filteredAttractions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No attractions found</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Attractions;
