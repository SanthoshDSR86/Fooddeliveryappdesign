import { motion } from 'motion/react';
import { Plus, Star } from 'lucide-react';
import { MenuItem } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: () => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="p-4 border border-border rounded-xl hover:shadow-md transition-all bg-white"
    >
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-1">
            <div className={`w-4 h-4 mt-1 border-2 ${item.isVeg ? 'border-[#14C38E]' : 'border-[#FF4B4B]'} flex items-center justify-center`}>
              <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-[#14C38E]' : 'bg-[#FF4B4B]'}`} />
            </div>
            <div className="flex-1">
              <h4 className="flex items-center gap-2">
                {item.name}
                {item.isBestseller && (
                  <Badge className="bg-[#14C38E] text-white text-xs">
                    Bestseller
                  </Badge>
                )}
              </h4>
            </div>
          </div>

          {item.rating && (
            <div className="flex items-center gap-1 mb-2 text-sm">
              <Star className="w-3 h-3 fill-[#14C38E] text-[#14C38E]" />
              <span>{item.rating}</span>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {item.description}
          </p>

          <p className="text-primary">₹{item.price}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="flex flex-col items-end justify-between">
          <Button
            size="sm"
            onClick={onAddToCart}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}