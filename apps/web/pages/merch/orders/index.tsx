import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Image,
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Page } from "ui/components/merch";
import { Order, OrderStatus } from "types";
import { api } from "features/merch/services/api";
import { routes } from "features/merch/constants/routes";
import { QueryKeys } from "features/merch/constants/queryKeys";
import { displayPrice } from "features/merch/functions/currency";
import Link from "next/link";
import LoadingScreen from "ui/components/merch/skeleton/LoadingScreen";
import { getOrderStatusColor, renderOrderStatus } from "merch-helpers";
import OrderItem from "ui/components/merch/OrderItem";
import { MerchLayout } from "@/features/layout/components";
const OrderSummary: React.FC = () => {
  // Check if break point hit. KIV
  const isMobile: boolean =
    useBreakpointValue({ base: true, md: false }) || false;
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
        <div>
          <Flex
            display={{ base: "flex", md: "none" }}
            justifyContent="space-between"
          >
            <Flex flexDir="column" w="100%">
              <Badge
                width="fit-content"
                fontSize="sm"
                mb={2}
                color={getOrderStatusColor(
                  orderState?.status ?? OrderStatus.PENDING_PAYMENT
                )}
              >
                {renderOrderStatus(
                  orderState?.status ?? OrderStatus.PENDING_PAYMENT
                )}
              </Badge>
              <Heading size="md">Order Number</Heading>
              <Heading size="lg">{orderState?.id.split("-")[0]}</Heading>
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
          <Flex
            display={{ base: "none", md: "flex" }}
            justifyContent="space-between"
          >
            <Flex flexDir="column">
              <Flex alignItems="center" gap={6}>
                <Heading size="md">Order Number</Heading>
                <Badge
                  width="fit-content"
                  fontSize="sm"
                  color={getOrderStatusColor(
                    orderState?.status ?? OrderStatus.PENDING_PAYMENT
                  )}
                >
                  {renderOrderStatus(
                    orderState?.status ?? OrderStatus.PENDING_PAYMENT
                  )}
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
        </div>
        <Divider my={4} />
        {/*{orderState?.items.map((item) => (*/}
        {/*  <OrderItem data={item} isMobile={isMobile} />*/}
        {/*))}*/}

        {orderState ? (
          <OrderItem isMobile={isMobile} orderData={orderState} />
        ) : (
          <Text>Order Not Found</Text>
        )}

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
              {/*)}*/}0
            </Text>
            <Text fontSize="md">{displayPrice(total)}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        mt={6}
        alignItems="center"
        py={3}
        borderRadius="lg"
        borderWidth="1px"
        flexDirection="column"
        rowGap={4}
      >
        {/* TODO: QR Code generator based on Param. */}
        <Image
          src={
            orderState
              ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                  process.env.NEXT_PUBLIC_FRONTEND_URL ??
                  "http://localhost:3001"
                }/merch/orders/${orderState?.id}`
              : ""
          }
          alt="QRCode"
          width={150}
          height={150}
          sizes="(max-width: 768px)"
        />
        <Text fontWeight="bold">
          Please screenshot this QR code and show it at SCSE Lounge to collect
          your order. Alternatively, show the email receipt you have received.
        </Text>
        <Text>
          For any assistance, please contact our email address:
          merch@ntuscse.com
        </Text>
      </Flex>
    </>
  );
  const renderSummaryPage = () => {
    if (isLoading) return <LoadingScreen text="Fetching order detail" />;
    //rmb to change this v
    if (orderState === undefined || orderState === null) {
      return <LoadingScreen text="Order Does Not Exist" />;
    }
    return renderOrderSummary();
  };
  return (
    <MerchLayout>
      <Page>{renderSummaryPage()}</Page>
    </MerchLayout>
  );
};
export default OrderSummary;
