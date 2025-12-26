import { motion } from 'motion/react';
import { Tag, Copy } from 'lucide-react';
import { Coupon } from '../types';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface CouponListProps {
  coupons: Coupon[];
  onApplyCoupon: (code: string) => void;
}

export function CouponList({ coupons, onApplyCoupon }: CouponListProps) {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  return (
    <div className="grid gap-4">
      {coupons.map((coupon, index) => (
        <motion.div
          key={coupon.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border-2 border-dashed border-primary/30 rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-primary">{coupon.code}</h4>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                <p className="text-xs text-muted-foreground">
                  Min order: ₹{coupon.minOrderValue}
                  {coupon.maxDiscount && ` • Max discount: ₹${coupon.maxDiscount}`}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => onApplyCoupon(coupon.code)}
              className="bg-primary hover:bg-primary/90"
            >
              Apply
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
