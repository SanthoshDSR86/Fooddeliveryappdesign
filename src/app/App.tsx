import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { FloatingNav } from './components/FloatingNav';
import { LandingPage } from './components/LandingPage';
import { BrowseRestaurants } from './components/BrowseRestaurants';
import { RestaurantDetails } from './components/RestaurantDetails';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderTracking } from './components/OrderTracking';
import { RestaurantDashboard } from './components/RestaurantDashboard';
import { DeliveryDashboard } from './components/DeliveryDashboard';
import { mockRestaurants, mockMenuItems, mockCoupons, mockOrders, mockDeliveryTasks } from './data/mockData';
import { CartItem, Order, UserRole, Coupon, DeliveryTask } from './types';

type View =
  | 'landing'
  | 'browse'
  | 'restaurant'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'restaurant-dashboard'
  | 'delivery-dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>();
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [deliveryTasks, setDeliveryTasks] = useState<DeliveryTask[]>(mockDeliveryTasks);

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'customer') {
      setCurrentView('browse');
    } else if (role === 'restaurant') {
      setCurrentView('restaurant-dashboard');
    } else if (role === 'delivery') {
      setCurrentView('delivery-dashboard');
    }
    toast.success(`Welcome! You're logged in as ${role}`);
  };

  const handleGetStarted = () => {
    if (!userRole) {
      setUserRole('customer');
    }
    setCurrentView('browse');
  };

  const handleRestaurantClick = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setCurrentView('restaurant');
  };

  const handleAddToCart = (itemId: string) => {
    const menuItem = mockMenuItems.find((item) => item.id === itemId);
    if (!menuItem) return;

    const existingItem = cartItems.find((item) => item.menuItem.id === itemId);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.menuItem.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { menuItem, quantity: 1, restaurantId: menuItem.restaurantId }]);
    }

    toast.success('Added to cart', {
      description: menuItem.name,
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCartItems(
      cartItems.map((item) => (item.menuItem.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.menuItem.id !== itemId));
    toast.success('Item removed from cart');
  };

  const handleApplyCoupon = (code: string) => {
    const coupon = mockCoupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
    if (coupon) {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      if (subtotal >= coupon.minOrderValue) {
        setAppliedCoupon(coupon);
        toast.success('Coupon applied!', {
          description: coupon.description,
        });
      } else {
        toast.error(`Minimum order value is ₹${coupon.minOrderValue}`);
      }
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(undefined);
    toast.success('Coupon removed');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCurrentView('checkout');
  };

  const handlePlaceOrder = (address: string, paymentMethod: string) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
    const deliveryFee = 40;
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

    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      userId: 'user1',
      restaurantId: cartItems[0].restaurantId,
      items: cartItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      status: 'confirmed',
      deliveryAddress: address,
      couponCode: appliedCoupon?.code,
      createdAt: new Date().toLocaleString(),
      estimatedDeliveryTime: '30-35 min',
    };

    setOrders([...orders, newOrder]);
    setCurrentOrder(newOrder);

    // Create delivery task
    const restaurant = mockRestaurants.find((r) => r.id === cartItems[0].restaurantId);
    if (restaurant) {
      const task: DeliveryTask = {
        id: `TASK${Date.now()}`,
        orderId: newOrder.id,
        restaurantName: restaurant.name,
        restaurantAddress: '123 Restaurant St, City',
        customerName: 'Customer',
        customerAddress: address,
        status: 'assigned',
        estimatedTime: '30 min',
      };
      setDeliveryTasks([...deliveryTasks, task]);
    }

    setCartItems([]);
    setAppliedCoupon(undefined);
    setCurrentView('tracking');

    toast.success('Order placed successfully!', {
      description: `Order ID: ${newOrder.id}`,
    });
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: 'preparing' } : order))
    );
    toast.success('Order accepted');
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: 'cancelled' } : order))
    );
    toast.error('Order rejected');
  };

  const handlePickupTask = (taskId: string) => {
    setDeliveryTasks(
      deliveryTasks.map((task) => (task.id === taskId ? { ...task, status: 'picked_up' } : task))
    );
    const task = deliveryTasks.find((t) => t.id === taskId);
    if (task) {
      setOrders(
        orders.map((order) =>
          order.id === task.orderId ? { ...order, status: 'out_for_delivery' } : order
        )
      );
    }
    toast.success('Order picked up');
  };

  const handleCompleteTask = (taskId: string) => {
    setDeliveryTasks(
      deliveryTasks.map((task) => (task.id === taskId ? { ...task, status: 'delivered' } : task))
    );
    const task = deliveryTasks.find((t) => t.id === taskId);
    if (task) {
      setOrders(
        orders.map((order) =>
          order.id === task.orderId ? { ...order, status: 'delivered' } : order
        )
      );
    }
    toast.success('Order delivered!');
  };

  const handleBackToHome = () => {
    setCurrentView('browse');
    setCurrentOrder(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />

      {currentView !== 'landing' && (
        <FloatingNav
          cartItemCount={cartItems.length}
          currentView={currentView}
          onViewChange={(view) => setCurrentView(view as View)}
          onLoginClick={() => toast.info('Login functionality - demo mode')}
          userRole={userRole || undefined}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={currentView !== 'landing' ? 'pt-24' : ''}
        >
          {currentView === 'landing' && (
            <LandingPage onGetStarted={handleGetStarted} onSelectRole={handleSelectRole} />
          )}

          {currentView === 'browse' && (
            <BrowseRestaurants
              restaurants={mockRestaurants}
              onRestaurantClick={handleRestaurantClick}
            />
          )}

          {currentView === 'restaurant' && selectedRestaurantId && (
            <RestaurantDetails
              restaurant={mockRestaurants.find((r) => r.id === selectedRestaurantId)!}
              menuItems={mockMenuItems.filter((item) => item.restaurantId === selectedRestaurantId)}
              onAddToCart={handleAddToCart}
              onBack={() => setCurrentView('browse')}
            />
          )}

          {currentView === 'cart' && (
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
          )}

          {currentView === 'checkout' && (
            <Checkout
              total={
                cartItems.reduce(
                  (sum, item) => sum + item.menuItem.price * item.quantity,
                  0
                ) +
                40 -
                (appliedCoupon
                  ? appliedCoupon.discountType === 'percentage'
                    ? Math.min(
                        (cartItems.reduce(
                          (sum, item) => sum + item.menuItem.price * item.quantity,
                          0
                        ) *
                          appliedCoupon.discount) /
                          100,
                        appliedCoupon.maxDiscount || Infinity
                      )
                    : appliedCoupon.discount
                  : 0)
              }
              onPlaceOrder={handlePlaceOrder}
            />
          )}

          {currentView === 'tracking' && currentOrder && (
            <OrderTracking order={currentOrder} onBackToHome={handleBackToHome} />
          )}

          {currentView === 'restaurant-dashboard' && (
            <RestaurantDashboard
              restaurantId="1"
              orders={orders}
              onAcceptOrder={handleAcceptOrder}
              onRejectOrder={handleRejectOrder}
            />
          )}

          {currentView === 'delivery-dashboard' && (
            <DeliveryDashboard
              tasks={deliveryTasks}
              onPickup={handlePickupTask}
              onComplete={handleCompleteTask}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}