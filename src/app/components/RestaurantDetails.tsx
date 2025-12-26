import { motion } from 'motion/react';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Restaurant, MenuItem } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  onAddToCart: (itemId: string) => void;
  onBack: () => void;
}

export function RestaurantDetails({
  restaurant,
  menuItems,
  onAddToCart,
  onBack
}: RestaurantDetailsProps) {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Restaurants
        </Button>

        {/* Restaurant Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="mb-2 text-white">{restaurant.name}</h1>
              <p className="opacity-90">
                {restaurant.cuisine.join(', ')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-5 h-5 fill-[#14C38E] text-[#14C38E]" />
                  <span>{restaurant.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-5 h-5 text-foreground" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <p className="text-sm text-muted-foreground">Delivery Time</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin className="w-5 h-5 text-foreground" />
                  <span>{restaurant.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground">Distance</p>
              </div>
            </div>

            {restaurant.offers && restaurant.offers.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm mb-2 text-muted-foreground">Available Offers</p>
                <div className="flex gap-2 flex-wrap">
                  {restaurant.offers.map((offer, index) => (
                    <Badge key={index} variant="outline" className="border-primary text-primary">
                      {offer}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Menu */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="mb-4">
              {category}
            </h2>
            <div className="space-y-4">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={() => onAddToCart(item.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}