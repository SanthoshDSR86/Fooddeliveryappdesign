import { motion } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Tag, Ticket } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { CouponList } from './CouponList';
import { mockCoupons } from '../data/mockData';
import { useState } from 'react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  appliedCoupon?: Coupon;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon
}: CartProps) {
  const [showCoupons, setShowCoupons] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discount) / 100;
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.discount;
    }
  }
  
  const total = subtotal + deliveryFee - discount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4"
    >
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl">Your Cart</h2>
              <p className="text-sm text-muted-foreground">{items.length} items</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some delicious food to get started!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.menuItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4>{item.menuItem.name}</h4>
                        <Badge variant={item.menuItem.isVeg ? 'default' : 'destructive'} className="mt-1">
                          {item.menuItem.isVeg ? 'VEG' : 'NON-VEG'}
                        </Badge>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="text-destructive hover:bg-destructive/10 p-1 rounded-lg transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-white rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-md transition-colors"
                        >
                          <Minus className="w-4 h-4 text-primary" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                      <span className="font-semibold">₹{item.menuItem.price * item.quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="border-t pt-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-primary" />
                <h3>Apply Coupon</h3>
              </div>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-success" />
                    <div>
                      <p className="font-medium text-success">{appliedCoupon.code}</p>
                      <p className="text-sm text-muted-foreground">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-destructive hover:bg-destructive/10 p-1 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        onApplyCoupon(e.currentTarget.value);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (input?.value) onApplyCoupon(input.value);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}
              
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCoupons(!showCoupons)}
                >
                  {showCoupons ? 'Hide Coupons' : 'Show Coupons'}
                </Button>
              </div>
              
              {showCoupons && (
                <div className="mt-2">
                  <CouponList
                    coupons={mockCoupons}
                    onApplyCoupon={onApplyCoupon}
                  />
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all hover:scale-[1.02]"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}