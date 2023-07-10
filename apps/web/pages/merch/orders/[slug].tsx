import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Divider, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {  Page } from "ui/components/merch";
import { Order } from "types";
import { api } from "features/merch/services/api";
import { routes } from "features/merch/constants/routes";
import { QueryKeys } from "features/merch/constants/queryKeys";
import { displayPrice } from "features/merch/functions/currency";
import Link from "next/link"
import LoadingScreen from "ui/components/merch/skeleton/LoadingScreen";
import OrderItem from "ui/components/merch/OrderItem";
import QRCode from "ui/components/merch/QRCode";
import OrderNumber from "ui/components/merch/OrderNumber";
const OrderSummary: React.FC = () => {
// Check if break point hit. KIV
  const isMobile: boolean = useBreakpointValue({ base: true, md: false }) || false;
  const router = useRouter();
  const orderSlug = router.query.slug as string | undefined;

  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [orderState, setOrderState] = useState<Order | null>(null);
  // TODO: Fetch subtotal and total from server.
  const [total, setTotal] = useState(0);
  // Fetch and check if cart item is valid. Number(item.price) set to convert string to num
  const { isLoading } = useQuery(
    [QueryKeys.ORDER, orderSlug],
    () => api.getOrder(orderSlug ?? ""),
    {
      enabled: !!orderSlug,
      onSuccess: (data: Order) => {
        setOrderState(data);
        setTotal(
          data.items.reduce((acc, item) => {
            return item.price * item.quantity + acc;
          }, 0)
        );
        setShowThankYou(true);
      },
    }
  );

  const renderThankYouMessage = () => (
    <>
      <Heading size="xl">THANK YOU</Heading>
      <Text>Thank you for your purchase. We have received your order.</Text>
      <Link href={routes.HOME}>
        <Button borderRadius={0} size="sm">
          CONTINUE SHOPPING
        </Button>
      </Link>
      <Divider my={8} />
    </>
  );
  const renderOrderSummary = () => (
    <>
      <Flex flexDirection="column" alignItems="center" rowGap={3}>
        {showThankYou && renderThankYouMessage()}
      </Flex>

      <Flex
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        flexDir="column"
      >
        <OrderNumber orderState={orderState}/>
        <Divider my={4} />
        {/*{orderState?.items.map((item) => (*/}
        {/*  <OrderItem data={item} isMobile={isMobile} />*/}
        {/*))}*/}

        {orderState? <OrderItem  isMobile={isMobile} orderData={orderState}/>: <Text>Order Not Found</Text>}


        <Flex alignItems="end" flexDirection="row" gap={1} mt={4}>
          <Flex flexDir="column" flex={1} textAlign="end" fontWeight={500}>
            <Text>Item Subtotal:</Text>
            <Text>Voucher Discount:</Text>
            <Text>Total:</Text>
          </Flex>
          <Flex flexDir="column" textAlign="end">
            <Text fontSize="md"> {displayPrice(total)}</Text>
            <Text fontSize="md">
              {/*{displayPrice( TODO*/}
              {/*  (orderState?.billing?.subtotal ?? 0) -*/}
              {/*  (orderState?.billing?.total ?? 0)*/}
              {/*)}*/}
              0
            </Text>
            <Text fontSize="md">{displayPrice(total)}</Text>
          </Flex>
        </Flex>
      </Flex>

      <QRCode order={orderState}/>
    </>
  );
  const renderSummaryPage = () => {
    if (isLoading) return <LoadingScreen text="Fetching order detail" />;
    //rmb to change this v
    if (orderState === undefined || orderState === null){return <LoadingScreen text="Order Does Not Exist" />;}
    return renderOrderSummary();
  };
  return <Page>{renderSummaryPage()}</Page>;
}
export default OrderSummary
