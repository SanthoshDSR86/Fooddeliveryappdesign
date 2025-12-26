// Type definitions for the food delivery application

export type UserRole = 'customer' | 'restaurant' | 'delivery';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  address?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  distance: string;
  isOpen: boolean;
  promoted?: boolean;
  offers?: string[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  isVeg: boolean;
  isBestseller?: boolean;
  rating?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurantId: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrderValue: number;
  maxDiscount?: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  deliveryAddress: string;
  deliveryExecutiveId?: string;
  couponCode?: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
}

export interface DeliveryTask {
  id: string;
  orderId: string;
  restaurantName: string;
  restaurantAddress: string;
  customerName: string;
  customerAddress: string;
  status: 'assigned' | 'picked_up' | 'delivered';
  estimatedTime: string;
}
