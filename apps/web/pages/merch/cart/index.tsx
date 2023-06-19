import React, { useRef, useState, FC, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  Divider,
  useDisclosure,
  Grid,
  GridItem,
  Text,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Joi from "joi";
import {
  CartAction,
  CartActionType,
  useCartStore,
} from "features/merch/context/cart";
import {
  CartCard,
  CartEmptyView,
  CartHeader,
  CartItemCard,
  CartRemoveModal,
  LoadingScreen,
  Page,
} from "ui/components/merch";
import { api } from "features/merch/services/api";
import { routes, QueryKeys } from "features/merch/constants";
import { displayPrice } from "features/merch/functions";
import { calculatePricing } from "merch-helpers";
import { useRouter } from "next/router";

type ValidationType = {
  error: boolean;
  isLoading: boolean;
};

const Cart: FC = () => {
  // Context hook.
  const cartContext = useCartStore();
  const { state: cartState, dispatch: cartDispatch } = cartContext;

  const router = useRouter();
  const [reroute, setReroute] = useState<boolean>(false);

  // Email input for billing.
  const [validation, setValidation] = useState<ValidationType>({
    isLoading: false,
    error: false,
  });

  // Calculation of pricing
  const [isCartLoading, setIsCartLoading] = useState(true);
  const { data: products, isLoading: isProductsQueryLoading } = useQuery(
    [QueryKeys.PRODUCTS],
    () => api.getProducts(),
    {
      onSuccess: () => {
        setIsCartLoading(false);
      }
    }
  );

  // Voucher section
  // const [voucherInput, setVoucherInput] = useState("");
  // const [voucherError, setVoucherError] = useState<boolean>(false);

  const pricedCart = products ? calculatePricing(products, cartState.cart, undefined) : null;

  const emailValidator = Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email");

  // Removal Modal cartStates
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toBeRemoved = useRef({ productId: "", size: "", color: "" });

  // Check if break point hit.
  const isMobile: boolean =
    useBreakpointValue({ base: true, md: false }) || false;

  // Apply voucher - TODO
  // const { mutate: applyVoucher, isLoading: voucherLoading } = useMutation(
  //   () => api.postQuotation(cartState.cart, voucherInput),
  //   {
  //     onMutate: () => {
  //       setPriceLoading(true);
  //     },
  //     onSuccess: (data: PricedCart) => {
  //       setPriceInfo(data.total);
  //       if (data.price.discount > 0) {
  //         // Voucher is valid
  //         cartDispatch({ type: CartActionType.VALID_VOUCHER, payload: voucherInput });
  //         setVoucherError(false);
  //         setVoucherInput("");
  //       } else {
  //         setVoucherError(true);
  //       }
  //     },
  //     onSettled: () => {
  //       setPriceLoading(false);
  //     },
  //   }
  // );

  // const handleRemoveVoucher = () => {
  //   setVoucherInput("");
  //   cartDispatch({ type: CartActionType.REMOVE_VOUCHER, payload: null });
  //   applyVoucher();
  // };

  // Update Cart Item by Size & Id (To be changed next time: BE)
  const removeItem = (productId: string, size: string, color: string) => {
    cartDispatch({
      type: CartActionType.REMOVE_ITEM,
      payload: { id: productId, size: size, color: color },
    });
    onClose();
  };

  // Set modal's ref value to size & productId pair.
  const handleRemoveItem = (productId: string, size: string, color: string) => {
    onOpen();
    toBeRemoved.current.size = size;
    toBeRemoved.current.color = color;
    toBeRemoved.current.productId = productId;
  };

  // Update Cart Item by Size & Id (To be changed next time: BE)
  const onQuantityChange = (
    productId: string,
    size: string,
    color: string,
    qty: number
  ) => {
    const action: CartAction = {
      type: CartActionType.UPDATE_QUANTITY,
      payload: { id: productId, size: size, color: color, quantity: qty },
    };
    cartDispatch(action);
  };

  const handleToCheckout = async () => {
    setValidation({ isLoading: true, error: false });
    try {
      await emailValidator.validateAsync(cartState.billingEmail);
      cartDispatch({
        type: CartActionType.UPDATE_BILLING_EMAIL,
        payload: cartState.billingEmail,
      });
      setReroute(true);
    } catch (error: any) {
      setValidation({ isLoading: false, error: true });
    }
  };

  const CartHeading = (
    <Heading textAlign="center" mb={[4, 6, 12]} size="xl">
      Your Cart
    </Heading>
  );

  const PriceInfoSection = (
    <CartCard title="Order Summary" mt={[2, 4]}>
      {!pricedCart ? (
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Spinner />
          <Text mt={2}>Calculating your cart price</Text>
        </Flex>
      ) : (
        <>
          <Flex flexDir="column" gap={[2, 3]}>
            <Flex justifyContent="space-between" fontSize={["sm", "md"]}>
              <Text>Item(s) subtotal</Text>
              <Text>{displayPrice(pricedCart.subtotal)}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontSize={["sm", "md"]}>
              <Text>Voucher Discount</Text>
              <Text noOfLines={1}>{displayPrice(pricedCart.discount)}</Text>
            </Flex>
            <Divider />
            <Flex
              justifyContent="space-between"
              fontSize={["sm", "md"]}
              fontWeight={600}
            >
              <Text>Total</Text>
              <Text>{displayPrice(pricedCart.total)}</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex flexDirection="column" rowGap={2}>
            <Input
              required
              placeholder="Name"
              value={cartState.name}
              id="name"
              type="text"
              onChange={(event) => {
                cartDispatch({
                  type: CartActionType.UPDATE_NAME,
                  payload: event.target.value,
                });
              }}
              variant="outline"
            />

            <Input
              required
              placeholder="Billing email address"
              value={cartState.billingEmail}
              id="email"
              type="text"
              onChange={(event) => {
                cartDispatch({
                  type: CartActionType.UPDATE_BILLING_EMAIL,
                  payload: event.target.value,
                });
              }}
              variant="outline"
            />
            <Text fontSize="sm" color="red">
              {validation.error && "*Invalid email format"}
            </Text>

            <Button
              width="100%"
              onClick={handleToCheckout}
              _hover={{ bg: "primary-blue" }}
              isLoading={validation.isLoading}
              disabled={
                cartState.billingEmail.length === 0 ||
                cartState.name.length === 0 ||
                validation.isLoading
              }
            >
              CHECK OUT
            </Button>

            <Link href={routes.HOME}>
              <Button width="100%" variant="outline">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </Flex>
        </>
      )}
    </CartCard>
  );
  /* TODO
  const VoucherSection = (
    <CartCard title="Voucher">
      <FormControl>
        <Flex gap={2}>
          <Input
            size="sm"
            flex={1}
            id="voucher-code"
            value={voucherInput}
            disabled={voucherLoading}
            placeholder="Voucher Code"
            onChange={(e: React.FormEvent<EventTarget>) => {
              const target = e.target as HTMLInputElement;
              setVoucherInput(target.value);
            }}
          />
          <Button
            px={4}
            size="sm"
            isLoading={voucherLoading}
            variant="outline"
            disabled={voucherInput.length === 0 || priceLoading || voucherLoading}
            onClick={() => applyVoucher()}
          >
            Apply
          </Button>
        </Flex>
        <FormHelperText>
          {!cartState.voucher ? (
            <Text>Apply your voucher code!</Text>
          ) : (
            <Text textAlign="right">
              {voucherError && <Text color="red.500">Invalid voucher</Text>}
              {cartState.voucher && priceInfo.discount > 0 && (
                <Flex justifyContent="flex-end">
                  <Text color="green.500">Applied Voucher</Text>
                  <Button ml={1} variant="link" onClick={handleRemoveVoucher}>
                    <LinkIcon height={3} width={3} />
                  </Button>
                </Flex>
              )}
            </Text>
          )}
        </FormHelperText>
      </FormControl>
    </CartCard>
  );
*/
  const renderCartView = () => (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(6, 1fr)" }}>
      <GridItem colSpan={4} px={[0, 4]}>
        {!isMobile && <CartHeader />}
        {cartState.cart.items.map((item, index) => (
          <>
            <CartItemCard
              key={item.id + item.size}
              data={item}
              productInfo={products?.find((product) => product.id === item.id)}
              isLoading={isProductsQueryLoading}
              isMobile={isMobile}
              onRemove={handleRemoveItem}
              onQuantityChange={onQuantityChange}
            />
            {index !== cartState.cart.items.length - 1 && <Divider />}
          </>
        ))}
      </GridItem>
      <GridItem colSpan={2} px={[0, 4]}>
        {/* {VoucherSection} TODO*/}
        {PriceInfoSection}
        <CartCard title="Collection Details" mt={[2, 4]} mb={[2, 4]}>
          <Text fontSize={["xs", "sm"]}>
            An email will be sent to you closer to the collection date. Our
            collection venue is at 50 Nanyang Ave, #32 Block N4 #02a, Singapore
            639798.
          </Text>
        </CartCard>
      </GridItem>
      <CartRemoveModal
        isOpen={isOpen}
        onClose={onClose}
        removeItem={() =>
          removeItem(
            toBeRemoved.current.productId,
            toBeRemoved.current.size,
            toBeRemoved.current.color
          )
        }
      />
    </Grid>
  );

  const renderCartContent = () => {
    if (isCartLoading) {
      return <LoadingScreen text="Fetching Cart Details" />;
    }
    if (cartState.cart.items.length === 0) {
      return <CartEmptyView />;
    }
    return renderCartView();
  };

  useEffect(() => {
    if (reroute) {
      router.push(routes.CHECKOUT);
    }
  }, [reroute]);

  return (
    <Page>
      {CartHeading}
      {renderCartContent()}
    </Page>
  );
};

export default Cart;
