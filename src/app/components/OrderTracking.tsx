import { motion } from 'motion/react';
import { CheckCircle, Clock, Package, Truck, MapPin, Phone } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface OrderTrackingProps {
  order: Order;
  onBackToHome: () => void;
}

const statusSteps: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { status: 'preparing', label: 'Preparing', icon: Package },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export function OrderTracking({ order, onBackToHome }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const currentStepIndex = statusSteps.findIndex((step) => step.status === currentStatus);

  // Simulate order status updates
  useEffect(() => {
    if (currentStatus === 'delivered') return;

    const timer = setTimeout(() => {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < statusSteps.length) {
        setCurrentStatus(statusSteps[nextIndex].status);
      }
    }, 5000); // Update every 5 seconds for demo

    return () => clearTimeout(timer);
  }, [currentStatus, currentStepIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4"
    >
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Order Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-10 h-10 text-success" />
          </motion.div>
          <h2 className="text-2xl mb-2">Order Placed Successfully!</h2>
          <p className="text-muted-foreground">Order ID: #{order.id}</p>
        </div>

        {/* Status Timeline */}
        <div className="relative mb-8">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 mb-6 relative"
              >
                {/* Connector Line */}
                {index < statusSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-12 bg-border">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: isCompleted ? '100%' : 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full bg-success"
                    />
                  </div>
                )}

                {/* Status Icon */}
                <motion.div
                  animate={{
                    scale: isCurrent ? [1, 1.1, 1] : 1,
                    backgroundColor: isCompleted ? '#14C38E' : '#F5F5F5',
                  }}
                  transition={{
                    scale: {
                      repeat: isCurrent ? Infinity : 0,
                      duration: 2,
                    },
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                    isCompleted ? 'bg-success' : 'bg-secondary'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                </motion.div>

                {/* Status Info */}
                <div className="flex-1">
                  <h4 className={isCompleted ? 'text-foreground' : 'text-muted-foreground'}>{step.label}</h4>
                  {isCurrent && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-primary"
                    >
                      In Progress...
                    </motion.p>
                  )}
                  {isCompleted && !isCurrent && (
                    <p className="text-sm text-success">Completed</p>
                  )}
                </div>

                {/* Estimated Time */}
                {isCurrent && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{order.estimatedDeliveryTime || '30-35 min'}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Delivery Details */}
        {currentStatus === 'out_for_delivery' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent p-4 rounded-xl mb-6"
          >
            <h3 className="mb-3">Delivery Executive</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  DE
                </div>
                <div>
                  <p>Delivery Executive</p>
                  <p className="text-sm text-muted-foreground">On the way</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </motion.div>
        )}

        {/* Delivery Address */}
        <div className="border-t pt-4 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <h4 className="mb-1">Delivery Address</h4>
              <p className="text-muted-foreground">{order.deliveryAddress}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-t pt-4 mb-6">
          <h4 className="mb-3">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between text-sm">
                <span>
                  {item.menuItem.name} x {item.quantity}
                </span>
                <span>₹{item.menuItem.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2 mt-2 border-t">
            <span>Total Paid</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {currentStatus === 'delivered' && (
          <Button onClick={onBackToHome} className="w-full">
            Back to Home
          </Button>
        )}
      </div>
    </motion.div>
  );
}
