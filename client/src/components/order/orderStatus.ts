import type { Order } from '../../types/order';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export function getOrderStatus(order: Order): OrderStatus {
  if (!order.isPaid) return 'pending';
  if (order.isPaid && !order.isDelivered) return 'processing';
  if (order.isDelivered) return 'delivered';
  return 'pending';
}
