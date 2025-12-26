import { motion } from 'motion/react';
import { ShoppingCart, User, House, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FloatingNavProps {
  cartItemCount: number;
  currentView: string;
  onViewChange: (view: string) => void;
  onLoginClick: () => void;
  userRole?: string;
}

export function FloatingNav({ cartItemCount, currentView, onViewChange, onLoginClick, userRole }: FloatingNavProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-border px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('browse')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-[#ff9a3c] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🍽️</span>
            </div>
            <h1 className="text-primary">FoodExpress</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for restaurants and food..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {userRole && (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={currentView === 'browse' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange('browse')}
                  className={currentView === 'browse' ? 'bg-primary hover:bg-primary/90' : ''}
                >
                  <House className="w-4 h-4 mr-2" />
                  Browse
                </Button>
                {userRole === 'restaurant' && (
                  <Button
                    variant={currentView === 'restaurant-dashboard' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onViewChange('restaurant-dashboard')}
                    className={currentView === 'restaurant-dashboard' ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    Restaurant
                  </Button>
                )}
                {userRole === 'delivery' && (
                  <Button
                    variant={currentView === 'delivery-dashboard' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onViewChange('delivery-dashboard')}
                    className={currentView === 'delivery-dashboard' ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    Deliveries
                  </Button>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => onViewChange('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onLoginClick}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
