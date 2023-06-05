import { OrderStatus } from 'types'
export const renderOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.ORDER_COMPLETED:
      return "Order Collected";
    case OrderStatus.PAYMENT_COMPLETED:
      return "Processing";
    case OrderStatus.PENDING_PAYMENT:
      return "Order Received";
    default:
      return "Item Delayed";
  }
};

export const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.ORDER_COMPLETED:
      return "green.500";
    case OrderStatus.PAYMENT_COMPLETED:
      return "primary.400";
    case OrderStatus.PENDING_PAYMENT:
      return "primary.600";
    default:
      return "red.500";
  }
};
