import { motion } from 'motion/react';
import { Star, Clock, MapPin } from 'lucide-react';
import { Restaurant } from '../types';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {restaurant.promoted && (
            <Badge className="absolute top-2 left-2 bg-primary text-white">
              Promoted
            </Badge>
          )}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white px-4 py-2 bg-black/70 rounded-lg">
                Currently Closed
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-1 truncate">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-2 truncate">
            {restaurant.cuisine.join(', ')}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#14C38E] text-[#14C38E]" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              ₹{restaurant.priceForTwo} for two
            </p>
          </div>

          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                {restaurant.offers.slice(0, 2).map((offer, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-primary text-primary">
                    {offer}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
