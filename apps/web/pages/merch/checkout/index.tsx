/* eslint-disable */

import { CartEmptyView, Page } from "ui/components/merch";
import { useCartStore } from "@/features/merch/context/cart";
import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/features/merch/context/checkout";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Badge,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys, routes } from "@/features/merch/constants";
import { api } from "@/features/merch/services/api";
import CheckoutSkeleton from "@/features/merch/components/checkout/Skeleton";
import Link from "next/link";
import { displayPrice } from "@/features/merch/functions";
import { useRouter } from "next/router";
import StripeForm from "@/features/merch/components/checkout/StripeForm";
import { CheckoutResponse } from "types";
import { MerchLayout } from "@/features/layout/components";

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { state: cartState } = useCartStore();
  const { setState: setCheckoutState } = useCheckoutStore();

  // Fetch and check if cart item is valid.
  const { mutate: initCheckout } = useMutation(
    () =>
      api.postCheckoutCart(
        cartState.cart,
        cartState.billingEmail,
        cartState.voucher
      ),
    {
      retry: false,
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data: CheckoutResponse) => {
        setCheckoutState(data);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (!cartState.billingEmail) {
      void router.push(routes.CART);
      return;
    }
    initCheckout();
  }, []);

  return (
    <Page>
      <Heading textAlign="center" mb={[4, 6, 12]} size="xl">
        Checkout
      </Heading>
      {isLoading ? (
        <CheckoutSkeleton />
      ) : cartState.cart.items.length === 0 ? (
        <CartEmptyView />
      ) : (
        <CheckoutView />
      )}
    </Page>
  );
};

const CheckoutView = () => {
  const { state: checkoutState } = useCheckoutStore();
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      rowGap={[4, 0]}
      columnGap={[0, 4]}
    >
      <GridItem px={[0, 4]} colSpan={1} mb={8}>
        {OrderSummary()}
      </GridItem>
      <GridItem px={[0, 4]} colSpan={1}>
        {checkoutState?.payment?.clientSecret && (
          <StripeForm clientSecret={checkoutState?.payment?.clientSecret} />
        )}
      </GridItem>
    </Grid>
  );
};

const OrderSummary = () => {
  const { state: cartState } = useCartStore();
  const { state: checkoutState } = useCheckoutStore();

  const noOfItems = cartState.cart.items.length;

  const { data: products } = useQuery(
    [QueryKeys.PRODUCTS],
    () => api.getProducts(),
    {}
  );

  return (
    <MerchLayout>
      <Page>
        <Box borderWidth={1} borderRadius="lg" p={[4, 6]} boxShadow="md">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize={["xl", "2xl", "3xl"]}>Order Summary</Heading>
            <Link href={routes.CART}>
              <Text fontSize={["md", "l"]}>{`${noOfItems} item(s) Edit`}</Text>
            </Link>
          </Flex>
          <Text fontSize="sm">{`Name: ${cartState.name}`}</Text>
          <Text fontSize="sm">{`Billing email: ${cartState.billingEmail}`}</Text>
          {cartState.cart.items?.map((item) => {
            const product = products?.find(({ id }) => id === item.id);
            const subtotal = (product?.price ?? -1) * item.quantity;
            return (
              <Flex key={item.id.toString()} mt={[4, 6]}>
                <Image
                  src={product?.images?.[0]}
                  fallbackSrc="https://via.placeholder.com/100"
                  boxSize="70"
                  objectFit="contain"
                  borderRadius="md"
                  alt={product?.name}
                />
                <Flex flexDirection="column" flex={1} ml={2}>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Text fontWeight={500} noOfLines={2}>
                      {product?.name}
                    </Text>
                    <Text fontWeight={500}>{displayPrice(subtotal)}</Text>
                  </Flex>
                  <Flex color="gray.600" alignItems="center">
                    <Text fontSize="sm">{`Color: ${item.color}`}</Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    color="gray.600"
                    alignItems="center"
                  >
                    <Flex alignItems="center">
                      <Text fontSize="sm">{`Qty x${item.quantity}`}</Text>
                      <Badge h="fit-content" w="fit-content" ml={2}>
                        <Text textTransform="uppercase">{item.size}</Text>
                      </Badge>
                    </Flex>
                    <Text>{displayPrice(product?.price ?? 0)} each</Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}

          <Divider mt={[4, 8]} mb={[2, 4]} />
          <Flex
            justifyContent="flex-end"
            mt={2}
            fontWeight={500}
            fontSize={["sm", "md", "l"]}
            gap={2}
            color="gray.700"
          >
            <Flex flexDir="column">
              {/* <Text>Subtotal:</Text> */}
              {/* <Text>Discount:</Text> */}
              <Text fontSize="lg">Grand total:</Text>
            </Flex>
            <Flex flexDir="column" textAlign="end">
              {/* <Text>{displayPrice(checkoutState?.price?.subtotal ?? 0)}</Text> */}
              {/* <Text>{displayPrice(checkoutState?.price?.discount ?? 0)}</Text> */}
              <Text fontSize="lg">
                {displayPrice(checkoutState?.price?.grandTotal ?? 0)}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Page>
    </MerchLayout>
  );
};

export default CheckoutPage;
