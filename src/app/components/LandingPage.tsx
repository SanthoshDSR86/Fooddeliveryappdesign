import { motion } from 'motion/react';
import { Search, MapPin, Clock, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LandingPageProps {
  onGetStarted: () => void;
  onSelectRole: (role: 'customer' | 'restaurant' | 'delivery') => void;
}

export function LandingPage({ onGetStarted, onSelectRole }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const features = [
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less',
    },
    {
      icon: Star,
      title: 'Top Restaurants',
      description: 'Order from the best restaurants in your area',
    },
    {
      icon: TrendingUp,
      title: 'Live Tracking',
      description: 'Track your order in real-time from kitchen to doorstep',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent to-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl mb-4">
              Order food from your
              <span className="text-primary"> favorite restaurants</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Fast delivery • Live tracking • Amazing offers
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-3"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-xl">
                  <Search className="w-5 h-5 text-primary flex-shrink-0" />
                  <Input
                    placeholder="Search for restaurants or dishes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                </div>
                <Button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary h-12 px-8"
                >
                  Search
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Join Our Platform</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're a customer, restaurant partner, or delivery executive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-md text-center cursor-pointer hover:shadow-xl transition-all"
              onClick={() => onSelectRole('customer')}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">I'm a Customer</h3>
              <p className="text-muted-foreground mb-6">
                Order food from your favorite restaurants
              </p>
              <Button className="w-full">Get Started</Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-md text-center cursor-pointer hover:shadow-xl transition-all"
              onClick={() => onSelectRole('restaurant')}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">I'm a Restaurant</h3>
              <p className="text-muted-foreground mb-6">
                Manage orders and grow your business
              </p>
              <Button className="w-full">Partner With Us</Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-md text-center cursor-pointer hover:shadow-xl transition-all"
              onClick={() => onSelectRole('delivery')}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">I'm a Delivery Partner</h3>
              <p className="text-muted-foreground mb-6">
                Earn money by delivering food
              </p>
              <Button className="w-full">Join Now</Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl text-primary mb-2">1000+</p>
              <p className="text-muted-foreground">Restaurants</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-4xl text-primary mb-2">50K+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-4xl text-primary mb-2">5000+</p>
              <p className="text-muted-foreground">Delivery Partners</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-4xl text-primary mb-2">100K+</p>
              <p className="text-muted-foreground">Orders Delivered</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
