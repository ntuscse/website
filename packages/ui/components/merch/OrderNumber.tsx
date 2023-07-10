import React from 'react';
import { Badge, Flex, Heading, Text } from "@chakra-ui/react";
import { Order, OrderStatus } from "types";
import { getOrderStatusColor, renderOrderStatus } from "merch-helpers";

interface OrderNumberProps {
  orderState: Order | null;
}

const OrderNumber: React.FC<OrderNumberProps> = ({ orderState }) => (
  <div><div>
    <Flex display= { { base: "flex", md: "none" } } justifyContent="space-between">
      <Flex flexDir="column" w="100%">
        <Badge
          width="fit-content"
          fontSize="sm"
          mb={2}
          color={getOrderStatusColor(orderState?.status ?? OrderStatus.PENDING_PAYMENT)}
        >
          {renderOrderStatus(orderState?.status ?? OrderStatus.PENDING_PAYMENT)}
        </Badge>
        <Heading size="md">Order Number</Heading>
        <Heading size="lg">
          {orderState?.id.split("-")[0]}
        </Heading>
        <Flex alignItems="center" mb={2}>
          <Text fontSize="sm">{orderState?.id}</Text>
        </Flex>
        <Text fontSize="sm" color="grey">
          Order date:{" "}
          {orderState?.transaction_time
            ? new Date(`${orderState.transaction_time}`).toLocaleString(
              "en-sg"
            )
            : ""}
        </Text>
        {/*<Text>Last update: {orderState?.lastUpdate}</Text>*/}
      </Flex>
    </Flex>
  </div>
    <div>
      <Flex display= { { base: "none", md: "flex" } } justifyContent="space-between">
        <Flex flexDir="column">
          <Flex alignItems="center" gap={6}>
            <Heading size="md">Order Number</Heading>
            <Badge
              width="fit-content"
              fontSize="sm"
              color={getOrderStatusColor(orderState?.status ?? OrderStatus.PENDING_PAYMENT)}
            >
              {renderOrderStatus(orderState?.status ?? OrderStatus.PENDING_PAYMENT)}
            </Badge>
          </Flex>
          <Heading size="lg" mb={2}>
            {orderState?.id.split("-")[0]}
          </Heading>
          <Flex alignItems="center">
            <Text fontSize="sm">{orderState?.id}</Text>
          </Flex>
        </Flex>
        <Flex flexDir="column" fontSize="sm" color="grey">
          <Text>
            Order date:{" "}
            {orderState?.transaction_time
              ? new Date(`${orderState.transaction_time}`).toLocaleString(
                "en-sg"
              )
              : ""}
          </Text>
          {/*<Text>Last update: {orderState?.lastUpdate}</Text>*/}
        </Flex>
      </Flex>
    </div></div>
);

export default OrderNumber;
