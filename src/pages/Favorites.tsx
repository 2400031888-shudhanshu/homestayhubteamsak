import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import HomestayCard from '@/components/HomestayCard';
import AttractionCard from '@/components/AttractionCard';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useAppContext();

  const homestayFavorites = favorites.filter(f => f.type === 'homestay');
  const attractionFavorites = favorites.filter(f => f.type === 'attraction');

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <h1 className="text-5xl font-display font-bold">My Favorites</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Your saved homestays and attractions
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring and save your favorite homestays and attractions
              </p>
              <Link to="/homestays">
                <Button variant="adventure">Browse Homestays</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Homestays */}
              {homestayFavorites.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-display font-bold mb-6">
                    Favorite Homestays ({homestayFavorites.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {homestayFavorites.map((fav) => (
                      <Link key={fav.id} to={`/homestay/${fav.id}`}>
                        <HomestayCard {...fav.data} />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Attractions */}
              {attractionFavorites.length > 0 && (
                <section>
                  <h2 className="text-3xl font-display font-bold mb-6">
                    Favorite Attractions ({attractionFavorites.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {attractionFavorites.map((fav) => (
                      <AttractionCard key={fav.id} {...fav.data} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
