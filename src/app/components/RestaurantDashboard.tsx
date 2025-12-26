import { motion } from 'motion/react';
import { useState } from 'react';
import { Package, TrendingUp, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../types';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RestaurantDashboardProps {
  restaurantId: string;
  orders: Order[];
  onAcceptOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
}

export function RestaurantDashboard({
  restaurantId,
  orders,
  onAcceptOrder,
  onRejectOrder,
}: RestaurantDashboardProps) {
  const [activeTab, setActiveTab] = useState('orders');

  const restaurantOrders = orders.filter((order) => order.restaurantId === restaurantId);
  const pendingOrders = restaurantOrders.filter((order) => order.status === 'pending');
  const activeOrders = restaurantOrders.filter((order) =>
    ['confirmed', 'preparing', 'ready'].includes(order.status)
  );
  const completedOrders = restaurantOrders.filter((order) => order.status === 'delivered');

  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  // Mock data for chart
  const chartData = [
    { day: 'Mon', orders: 45, revenue: 12500 },
    { day: 'Tue', orders: 52, revenue: 15200 },
    { day: 'Wed', orders: 38, revenue: 10800 },
    { day: 'Thu', orders: 61, revenue: 18900 },
    { day: 'Fri', orders: 73, revenue: 22100 },
    { day: 'Sat', orders: 89, revenue: 28500 },
    { day: 'Sun', orders: 67, revenue: 19800 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Restaurant Dashboard</h1>
        <p className="text-muted-foreground">Manage your orders and track performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Total Orders</span>
            <Package className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl">{restaurantOrders.length}</p>
          <p className="text-sm text-success mt-1">+12% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Revenue</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-success mt-1">+8% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Avg Order Value</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl">₹{Math.round(averageOrderValue)}</p>
          <p className="text-sm text-success mt-1">+5% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Pending Orders</span>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl">{pendingOrders.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Awaiting action</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="grid gap-4">
            {/* Pending Orders */}
            {pendingOrders.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="mb-4">Pending Orders ({pendingOrders.length})</h3>
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4>Order #{order.id.slice(0, 8)}</h4>
                          <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>

                      <div className="space-y-1 mb-4">
                        {order.items.map((item) => (
                          <p key={item.menuItem.id} className="text-sm">
                            {item.quantity}x {item.menuItem.name}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span>₹{order.total}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRejectOrder(order.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => onAcceptOrder(order.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="mb-4">Active Orders ({activeOrders.length})</h3>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border border-border rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4>Order #{order.id.slice(0, 8)}</h4>
                          <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                        </div>
                        <Badge className="bg-primary">{order.status}</Badge>
                      </div>

                      <div className="space-y-1 mb-4">
                        {order.items.map((item) => (
                          <p key={item.menuItem.id} className="text-sm">
                            {item.quantity}x {item.menuItem.name}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span>₹{order.total}</span>
                        <span className="text-sm text-muted-foreground">
                          {order.deliveryAddress}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="mb-4">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#FC8019" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
