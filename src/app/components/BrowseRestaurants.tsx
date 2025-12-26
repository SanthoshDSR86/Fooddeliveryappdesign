import { motion } from 'motion/react';
import { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';
import { Badge } from './ui/badge';

interface BrowseRestaurantsProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurantId: string) => void;
}

export function BrowseRestaurants({ restaurants, onRestaurantClick }: BrowseRestaurantsProps) {
  const categories = ['All', 'Fast Food', 'Indian', 'Pizza', 'Chinese', 'Healthy', 'Desserts'];

  return (
    <div className="pt-32 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-foreground">What's on your mind?</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best restaurants near you and get your favorite food delivered in minutes
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <Badge
                key={category}
                variant={index === 0 ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  index === 0
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'hover:bg-secondary'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Promoted Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-foreground">Top Picks For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.promoted)
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => onRestaurantClick(restaurant.id)}
                />
              ))}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <h2 className="mb-6 text-foreground">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RestaurantCard
                  restaurant={restaurant}
                  onClick={() => onRestaurantClick(restaurant.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
