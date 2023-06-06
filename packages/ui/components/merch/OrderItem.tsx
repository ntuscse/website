import React from "react";
import { Flex, Grid, GridItem, Image, Text, Divider, Box } from "@chakra-ui/react";
import { displayPrice } from "web/features/merch/functions/currency";
import { Order } from "types";
// import { OrderStatus } from "web/pages/merch/order-summary/[slug]";
// export interface Order {
//   id: string;
//   items: {
//     id: string;
//     name: string;
//     category: string;
//     image?: string;
//     color: string;
//     size: string;
//     price: string;
//     quantity: number;
//   }[];
//   transaction_id: string;
//   transaction_time?: string;
//   payment_method: string;
//   customer_email: string;
//   status: OrderStatus;
// }
export type OrderItemProps = {
  isMobile: boolean;
  orderData: Order;
};

const OrderItem: React.FC<OrderItemProps> = (props: OrderItemProps) => {
  const { isMobile, orderData } = props;

  const flexItemConfig = {
    alignItems: "center",
    h: isMobile ? "auto" : 100,
    justifyContent: isMobile ? "start" : "center",
  };
  return (
    <>
      {orderData.items.map((data, index) => (
        <div key={index}>
          <Flex my="4" justifyContent="center">
            <Box boxShadow="sm" borderRadius={5} maxW={isMobile ? 150 : 100}>
              <Image w="100%" borderRadius={5} src={data?.image}  />
            </Box>
            <Grid flex={1} templateColumns={!isMobile ? "3fr repeat(3, 1fr)" : "1fr"} rowGap={2}>
              <GridItem pl="4">
                <Flex h={isMobile ? "auto" : 100} flexDir="column" fontWeight="600" fontSize={isMobile ? "sm" : "md"}>
                  <Text color="primary.600">{data?.name}</Text>
                  <Flex color="grey">
                    Size:
                    <Text ml={1} textTransform="uppercase">
                      {data.size}
                    </Text>
                  </Flex>
                  <Flex color="grey">
                    Color:
                    <Text ml={1} textTransform="uppercase">
                      {data.color}
                    </Text>
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem pl="4">
                <Flex {...flexItemConfig}>
                  <Text fontSize={isMobile ? "sm" : "md"} fontWeight={500}>
                    {isMobile && "Unit Price:"} {displayPrice(Number(data?.price) ?? 0)}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem pl="4">
                <Flex {...flexItemConfig}>
                  <Text fontSize={isMobile ? "sm" : "md"} fontWeight={500}>
                    {isMobile && "Quantity:"} x{data?.quantity ?? 0}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem pl="4">
                <Flex {...flexItemConfig}>
                  <Text fontSize={isMobile ? "sm" : "md"} fontWeight={500}>
                    {isMobile && "Subtotal:"} {displayPrice(Number(data.price) * data.quantity)}
                  </Text>
                </Flex>
              </GridItem>
            </Grid>
          </Flex>
          <Divider />
        </div>
      ))}
    </>
  );
}

export default OrderItem;
