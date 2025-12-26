import { motion } from 'motion/react';
import { MapPin, Navigation, CheckCircle, Clock, Package } from 'lucide-react';
import { DeliveryTask } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DeliveryDashboardProps {
  tasks: DeliveryTask[];
  onPickup: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function DeliveryDashboard({ tasks, onPickup, onComplete }: DeliveryDashboardProps) {
  const assignedTasks = tasks.filter((task) => task.status === 'assigned');
  const pickedUpTasks = tasks.filter((task) => task.status === 'picked_up');
  const completedTasks = tasks.filter((task) => task.status === 'delivered');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Delivery Dashboard</h1>
        <p className="text-muted-foreground">Manage your delivery tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Assigned Tasks</span>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl">{assignedTasks.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">In Progress</span>
            <Package className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl">{pickedUpTasks.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Completed Today</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl">{completedTasks.length}</p>
        </motion.div>
      </div>

      {/* Assigned Tasks */}
      {assignedTasks.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h3 className="mb-4">Assigned Tasks ({assignedTasks.length})</h3>
          <div className="space-y-4">
            {assignedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 border-2 border-border rounded-xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4>Order #{task.orderId.slice(0, 8)}</h4>
                    <Badge variant="outline" className="mt-2">
                      Assigned
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{task.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup from</p>
                      <p>{task.restaurantName}</p>
                      <p className="text-sm text-muted-foreground">{task.restaurantAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deliver to</p>
                      <p>{task.customerName}</p>
                      <p className="text-sm text-muted-foreground">{task.customerAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button className="flex-1" onClick={() => onPickup(task.id)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Picked Up
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Tasks */}
      {pickedUpTasks.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h3 className="mb-4">In Progress ({pickedUpTasks.length})</h3>
          <div className="space-y-4">
            {pickedUpTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 border-2 border-primary/30 bg-accent rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4>Order #{task.orderId.slice(0, 8)}</h4>
                    <Badge className="bg-primary mt-2">In Progress</Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{task.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivering to</p>
                    <p>{task.customerName}</p>
                    <p className="text-sm text-muted-foreground">{task.customerAddress}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button className="flex-1 bg-success hover:bg-success/90" onClick={() => onComplete(task.id)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Delivered
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="mb-4">Completed Today ({completedTasks.length})</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-success/5 border border-success/20 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-success">Order #{task.orderId.slice(0, 8)}</h4>
                    <p className="text-sm text-muted-foreground">{task.customerAddress}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
