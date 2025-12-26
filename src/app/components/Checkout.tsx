import { motion } from 'motion/react';
import { MapPin, CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useState } from 'react';

interface CheckoutProps {
  total: number;
  onPlaceOrder: (address: string, paymentMethod: string) => void;
}

export function Checkout({ total, onPlaceOrder }: CheckoutProps) {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      onPlaceOrder(address, paymentMethod);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4"
    >
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl mb-6">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Delivery Address */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3>Delivery Address</h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="House no, Street, Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="Pincode" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3>Payment Method</h3>
            </div>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Wallet className="w-5 h-5 text-primary" />
                  <div>
                    <p>UPI / QR</p>
                    <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                  </div>
                </Label>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p>Credit / Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                  </div>
                </Label>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p>Net Banking</p>
                    <p className="text-sm text-muted-foreground">All major banks supported</p>
                  </div>
                </Label>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p>Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay when you receive</p>
                  </div>
                </Label>
              </motion.div>
            </RadioGroup>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Amount to Pay</span>
              <span className="text-2xl">₹{total}</span>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all hover:scale-[1.02]"
            >
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
