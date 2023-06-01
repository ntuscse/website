import React from "react";
import { Flex, Grid, GridItem, Image, Text, Divider, Box } from "@chakra-ui/react";
import { displayPrice } from "web/features/merch/functions/currency";
import { Order } from "types";

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
  {orderData.items.map((data) => {
  return (
    <>
      <Flex my="4" justifyContent="center">
        <Box boxShadow="sm" borderRadius={5} maxW={isMobile ? 150 : 100}>
          <Image w="100%" borderRadius={5} src={data?.image} fallbackSrc="https://via.placeholder.com/100" />
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
    </>
  );});
    return null;
}}

export default OrderItem;
