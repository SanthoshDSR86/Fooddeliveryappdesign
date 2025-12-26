import { Restaurant, MenuItem, Coupon } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Route',
    image: 'https://images.unsplash.com/photo-1728910758653-7e990e489cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjY3NDE3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: ['Indian', 'North Indian', 'Biryani'],
    rating: 4.5,
    deliveryTime: '25-30 min',
    priceForTwo: 400,
    distance: '2.5 km',
    isOpen: true,
    promoted: true,
    offers: ['50% off up to ₹100', 'Free delivery']
  },
  {
    id: '2',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY2NjY3OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.3,
    deliveryTime: '30-35 min',
    priceForTwo: 600,
    distance: '3.2 km',
    isOpen: true,
    offers: ['Buy 1 Get 1 Free']
  },
  {
    id: '3',
    name: 'Burger Barn',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NjY2NDM3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: ['Burgers', 'American', 'Fast Food'],
    rating: 4.2,
    deliveryTime: '20-25 min',
    priceForTwo: 350,
    distance: '1.8 km',
    isOpen: true,
    promoted: true,
    offers: ['20% off']
  },
  {
    id: '4',
    name: 'Wok Express',
    image: 'https://images.unsplash.com/photo-1529690678884-189e81f34ef6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZm9vZCUyMG5vb2RsZXN8ZW58MXx8fHwxNzY2NjU2NjA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: ['Chinese', 'Asian', 'Noodles'],
    rating: 4.1,
    deliveryTime: '35-40 min',
    priceForTwo: 450,
    distance: '4.5 km',
    isOpen: true
  },
  {
    id: '5',
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1624340209404-4f479dd59708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2NjY4MjAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: ['Healthy', 'Salads', 'Continental'],
    rating: 4.6,
    deliveryTime: '25-30 min',
    priceForTwo: 500,
    distance: '2.1 km',
    isOpen: true,
    offers: ['Free delivery']
  },
  {
    id: '6',
    name: 'Sweet Treats',
    image: 'https://images.unsplash.com/photo-1673551494246-0ea345ddbf86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwaWNlJTIwY3JlYW18ZW58MXx8fHwxNzY2NzQxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: ['Desserts', 'Ice Cream', 'Bakery'],
    rating: 4.4,
    deliveryTime: '15-20 min',
    priceForTwo: 300,
    distance: '1.2 km',
    isOpen: false
  }
];

export const mockMenuItems: MenuItem[] = [
  // Spice Route Menu
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    price: 350,
    category: 'Main Course',
    isVeg: false,
    isBestseller: true,
    rating: 4.7
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese in rich spiced gravy',
    price: 280,
    category: 'Main Course',
    isVeg: true,
    isBestseller: true,
    rating: 4.5
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with marinated chicken and spices',
    price: 320,
    category: 'Biryani',
    isVeg: false,
    isBestseller: true,
    rating: 4.8
  },
  {
    id: 'm4',
    restaurantId: '1',
    name: 'Garlic Naan',
    description: 'Soft flatbread topped with garlic and butter',
    price: 60,
    category: 'Breads',
    isVeg: true,
    rating: 4.3
  },
  {
    id: 'm5',
    restaurantId: '1',
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils in creamy tomato gravy',
    price: 220,
    category: 'Main Course',
    isVeg: true,
    rating: 4.4
  },
  // Pizza Paradise Menu
  {
    id: 'm6',
    restaurantId: '2',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 299,
    category: 'Pizza',
    isVeg: true,
    isBestseller: true,
    rating: 4.5
  },
  {
    id: 'm7',
    restaurantId: '2',
    name: 'Pepperoni Feast',
    description: 'Loaded with pepperoni and extra cheese',
    price: 449,
    category: 'Pizza',
    isVeg: false,
    isBestseller: true,
    rating: 4.6
  },
  {
    id: 'm8',
    restaurantId: '2',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and onions',
    price: 399,
    category: 'Pizza',
    isVeg: false,
    rating: 4.4
  },
  {
    id: 'm9',
    restaurantId: '2',
    name: 'Garlic Breadsticks',
    description: 'Crispy breadsticks with garlic butter and herbs',
    price: 120,
    category: 'Sides',
    isVeg: true,
    rating: 4.2
  },
  // Burger Barn Menu
  {
    id: 'm10',
    restaurantId: '3',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 249,
    category: 'Burgers',
    isVeg: false,
    isBestseller: true,
    rating: 4.5
  },
  {
    id: 'm11',
    restaurantId: '3',
    name: 'Veggie Delight Burger',
    description: 'Crispy veggie patty with fresh vegetables',
    price: 199,
    category: 'Burgers',
    isVeg: true,
    isBestseller: true,
    rating: 4.3
  },
  {
    id: 'm12',
    restaurantId: '3',
    name: 'Chicken Crispy Burger',
    description: 'Crunchy fried chicken with mayo and coleslaw',
    price: 229,
    category: 'Burgers',
    isVeg: false,
    rating: 4.4
  },
  {
    id: 'm13',
    restaurantId: '3',
    name: 'French Fries',
    description: 'Crispy golden fries with seasoning',
    price: 99,
    category: 'Sides',
    isVeg: true,
    rating: 4.2
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: 'c1',
    code: 'FIRST50',
    description: '50% off on your first order',
    discount: 50,
    discountType: 'percentage',
    minOrderValue: 200,
    maxDiscount: 100
  },
  {
    id: 'c2',
    code: 'WELCOME100',
    description: 'Flat ₹100 off',
    discount: 100,
    discountType: 'fixed',
    minOrderValue: 300
  },
  {
    id: 'c3',
    code: 'FREEDEL',
    description: 'Free delivery on orders above ₹199',
    discount: 40,
    discountType: 'fixed',
    minOrderValue: 199
  },
  {
    id: 'c4',
    code: 'SAVE20',
    description: '20% off up to ₹150',
    discount: 20,
    discountType: 'percentage',
    minOrderValue: 400,
    maxDiscount: 150
  }
];

// Mock initial orders for restaurant dashboard
export const mockOrders = [
  {
    id: 'ORD001',
    userId: 'user1',
    restaurantId: '1',
    items: [
      { menuItem: mockMenuItems[0], quantity: 2, restaurantId: '1' },
      { menuItem: mockMenuItems[2], quantity: 1, restaurantId: '1' }
    ],
    subtotal: 1020,
    deliveryFee: 40,
    discount: 0,
    total: 1060,
    status: 'pending' as const,
    deliveryAddress: '123 Main Street, Bangalore',
    createdAt: new Date().toLocaleString(),
    estimatedDeliveryTime: '30-35 min'
  },
  {
    id: 'ORD002',
    userId: 'user2',
    restaurantId: '1',
    items: [
      { menuItem: mockMenuItems[1], quantity: 1, restaurantId: '1' }
    ],
    subtotal: 280,
    deliveryFee: 40,
    discount: 0,
    total: 320,
    status: 'preparing' as const,
    deliveryAddress: '456 Park Avenue, Bangalore',
    createdAt: new Date(Date.now() - 10 * 60000).toLocaleString(),
    estimatedDeliveryTime: '25-30 min'
  }
];

// Mock delivery tasks
export const mockDeliveryTasks = [
  {
    id: 'TASK001',
    orderId: 'ORD002',
    restaurantName: 'Spice Route',
    restaurantAddress: '789 Food Plaza, Koramangala, Bangalore',
    customerName: 'John Doe',
    customerAddress: '456 Park Avenue, HSR Layout, Bangalore',
    status: 'assigned' as const,
    estimatedTime: '25 min'
  },
  {
    id: 'TASK002',
    orderId: 'ORD003',
    restaurantName: 'Pizza Paradise',
    restaurantAddress: '321 Pizza Street, Indiranagar, Bangalore',
    customerName: 'Jane Smith',
    customerAddress: '789 Lake View, Bellandur, Bangalore',
    status: 'assigned' as const,
    estimatedTime: '30 min'
  }
];