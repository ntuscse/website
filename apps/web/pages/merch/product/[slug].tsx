/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Badge,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EmptyProductView,
  MerchCarousel,
  MerchDetailSkeleton,
  Page,
  SizeChartDialog,
  SizeOption,
} from "ui/components/merch";
import { Product } from "types/lib/merch";
import {
  CartAction,
  CartActionType,
  useCartStore,
} from "features/merch/context/cart";
import { routes } from "features/merch/constants";
import {
  displayPrice,
  displayQtyInCart,
  displayStock,
  getQtyInCart,
  getQtyInStock,
  isColorAvailable,
  isOutOfStock,
  isSizeAvailable,
} from "features/merch/functions";
import { trpc } from "@/lib/trpc";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

const GroupTitle = ({ children }: any) => (
  <Heading fontSize="md" mb={2} color="grey" textTransform="uppercase">
    {children}
  </Heading>
);

const MerchDetail = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Context hook.
  const { state: cartState, dispatch: cartDispatch } = useCartStore();
  const router = useRouter();
  const id = (router.query.slug ?? "") as string;

  const [quantity, setQuantity] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxQuantity, setMaxQuantity] = useState<number>(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  const { data, isLoading } = trpc.getProduct.useQuery(
    {
      id,
    },
    {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      initialData: props.product, // ssr magic
    }
  );

  const product = data as Product;

  //* In/decrement quantity
  const handleQtyChangeCounter = (isAdd = true) => {
    const value = isAdd ? 1 : -1;
    if (!isAdd && quantity === 1) return;
    if (isAdd && quantity >= maxQuantity) return;
    setQuantity(quantity + value);
  };

  //* Manual input quantity.
  const handleQtyChangeInput = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    if (Number.isNaN(parseInt(target.value, 10))) {
      setQuantity(1);
      return;
    }
    const value = parseInt(target.value, 10);
    if (value <= 0) {
      setQuantity(1);
    } else if (value > maxQuantity) {
      setQuantity(maxQuantity);
    } else {
      setQuantity(value);
    }
  };

  const updateMaxQuantity = (color: string, size: string) => {
    if (product) {
      const stockQty = getQtyInStock(product, color, size);
      const cartQty = getQtyInCart(
        cartState.cart.items,
        product.id,
        color,
        size
      );
      const max = stockQty > cartQty ? stockQty - cartQty : 0;
      setMaxQuantity(max);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return;
    }
    setIsDisabled(true);
    const payload: CartAction = {
      type: CartActionType.ADD_ITEM,
      payload: {
        id,
        quantity,
        color: selectedColor,
        size: selectedSize,
      },
    };
    cartDispatch(payload);
    setMaxQuantity(maxQuantity - quantity);
    setQuantity(1);
    setIsDisabled(false);
  };

  const handleBuyNow = async () => {
    handleAddToCart();
    await router.push(routes.CART);
  };

  const ProductNameSection = (
    <Flex flexDirection="column" gap={1}>
      <Heading color="primary.600" fontSize={["xl", "2xl", "3xl", "4xl"]}>
        {product?.name}
        {!product?.is_available && (
          <Badge
            color="grey"
            ml={4}
            fontSize="md"
            variant="outline"
            display="inline"
          >
            unavailable
          </Badge>
        )}
        {product && isOutOfStock(product) && (
          <Badge
            color="grey"
            ml={4}
            fontSize="md"
            variant="outline"
            display="inline"
          >
            out of stock
          </Badge>
        )}
      </Heading>
      <Text fontSize="xl" fontWeight={600} color="primary.600">
        {displayPrice(product?.price ?? 0)}
      </Text>
    </Flex>
  );

  const renderSizeSection = (
    <Flex flexDirection="column">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        display="flex"
      >
        <GroupTitle>Sizes</GroupTitle>
        {product?.size_chart && (
          <Button size="sm" variant="unstyled" onClick={onOpen}>
            Size Chart
          </Button>
        )}
      </Flex>
      <Flex gap={[4, 4]} flexWrap="wrap">
        {product?.sizes?.map((size, idx) => {
          return (
            <SizeOption
              key={idx.toString()}
              active={(selectedSize === size).toString()}
              onClick={() => {
                setQuantity(1);
                if (size !== selectedSize) {
                  setSelectedSize(size);
                  if (selectedColor) {
                    updateMaxQuantity(selectedColor, size);
                  }
                } else {
                  setSelectedSize(null);
                }
              }}
              disabled={
                isDisabled ||
                (product
                  ? !isSizeAvailable(product, size) // size is not available for all colors
                  : false) ||
                (product && selectedColor
                  ? getQtyInStock(product, selectedColor, size) === 0 // size is not available for selected color
                  : false)
              }
            >
              <Text
                textTransform="uppercase"
                fontSize={{ base: "sm", md: "md" }}
              >
                {size}
              </Text>
            </SizeOption>
          );
        })}
      </Flex>
    </Flex>
  );

  const renderColorSection = (
    <Flex flexDirection="column" mt={4}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        display="flex"
      >
        <GroupTitle>Colors</GroupTitle>
      </Flex>
      <Flex gap={[4, 4]} flexWrap="wrap">
        {product?.colors?.map((color, idx) => {
          return (
            <SizeOption
              key={idx.toString()}
              active={(selectedColor === color).toString()}
              onClick={() => {
                setQuantity(1);
                if (color !== selectedColor) {
                  setSelectedColor(color);
                  if (selectedSize) {
                    updateMaxQuantity(color, selectedSize);
                  }
                } else {
                  setSelectedColor(null);
                }
              }}
              width="auto"
              px={4}
              disabled={
                isDisabled ||
                (product
                  ? !isColorAvailable(product, color) // color is not available for all sizes
                  : false) ||
                (product && selectedSize
                  ? getQtyInStock(product, color, selectedSize) === 0 // color is not available for selected size
                  : false)
              }
            >
              <Text
                textTransform="uppercase"
                fontSize={{ base: "sm", md: "md" }}
              >
                {color}
              </Text>
            </SizeOption>
          );
        })}
      </Flex>
    </Flex>
  );

  const renderQuantitySection = (
    <Flex flexDirection="column" mt={8}>
      <GroupTitle>Quantity</GroupTitle>
      <Flex gap={4}>
        <SizeOption
          key={"decrement_qty"}
          disabled={
            isDisabled || !(selectedColor && selectedSize) || quantity <= 1
          }
          active={false.toString()}
          onClick={() => handleQtyChangeCounter(false)}
        >
          -
        </SizeOption>
        <Input
          type="tel"
          pattern="[0-9]*"
          max={maxQuantity}
          textAlign="center"
          value={quantity}
          borderRadius={0}
          maxWidth={100}
          placeholder="Item Count"
          disabled={isDisabled || !(selectedColor && selectedSize)}
          onChange={handleQtyChangeInput}
        />
        <SizeOption
          key={"increment_qty"}
          disabled={
            isDisabled ||
            !(selectedColor && selectedSize) ||
            quantity >= maxQuantity
          }
          active={false.toString()}
          onClick={() => handleQtyChangeCounter(true)}
        >
          +
        </SizeOption>
        <Center>
          <Text fontSize="m" fontWeight={500} color="primary.600">
            {product && selectedColor && selectedSize && product.is_available
              ? displayStock(product, selectedColor, selectedSize)
              : ""}
          </Text>
        </Center>
      </Flex>
      <Flex flexDirection="column" mt={2}>
        <Text fontSize="m" fontWeight={300} color="primary.400">
          {product && selectedColor && selectedSize
            ? displayQtyInCart(
                cartState.cart.items,
                product.id,
                selectedColor,
                selectedSize
              )
            : ""}
        </Text>
        <Text fontSize="m" fontWeight={300} color="primary.400">
          {product && selectedColor && selectedSize && maxQuantity === 0
            ? "You have reached the maximum purchase quantity."
            : ""}
        </Text>
      </Flex>
    </Flex>
  );

  const purchaseButtons = (
    <Flex gap={6} flexWrap="wrap">
      <Button
        bg="gray.200"
        _hover={{ bg: "gray.300" }}
        flex={1}
        borderRadius={0}
        variant="outline"
        onClick={handleAddToCart}
        disabled={
          isDisabled || !(selectedColor && selectedSize) || maxQuantity === 0
        }
      >
        ADD TO CART
      </Button>
      <Button
        bg="red.600"
        _hover={{ bg: "red.500" }}
        flex={1}
        borderRadius={0}
        onClick={handleBuyNow}
        disabled={
          isDisabled || !(selectedColor && selectedSize) || maxQuantity === 0
        }
      >
        BUY NOW
      </Button>
    </Flex>
  );

  const renderMerchDetails = () => {
    return (
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}>
        <GridItem colSpan={2} px={[0, 4]}>
          <MerchCarousel images={product?.images ?? []} />
        </GridItem>
        <GridItem colSpan={3} px={[0, 4]}>
          {ProductNameSection}
          <Divider mt={4} mb={6} />
          {renderSizeSection}
          {renderColorSection}
          {renderQuantitySection}
          <Divider my={6} />
          {purchaseButtons}
          <Divider my={6} />
          {/* {renderDescription} */}
        </GridItem>
        <SizeChartDialog
          sizeChart={product?.size_chart}
          onClose={onClose}
          isOpen={isOpen}
        />
      </Grid>
    );
  };

  const renderMerchPage = () => {
    if (isLoading) return <MerchDetailSkeleton />;
    if (product === undefined || product === null) return <EmptyProductView />;
    return renderMerchDetails();
  };

  return <Page>{renderMerchPage()}</Page>;
};

export default MerchDetail;

export const getStaticProps: GetStaticProps<{
  slug: string;
  product: Product | undefined;
}> = async ({ params }) => {
  console.log("generating static props for /merch/product/[slug]");
  console.log("params", JSON.stringify(params));

  // TODO: replace this with trpc/react-query call
  if (!process.env.NEXT_PUBLIC_MERCH_API_ORIGIN) {
    throw new Error("NEXT_PUBLIC_MERCH_API_ORIGIN is not defined");
  }
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_MERCH_API_ORIGIN
    }/trpc/getProduct?batch=1&input=${encodeURIComponent(
      JSON.stringify({ "0": { id: params?.slug } })
    )}`
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const product = (await res.json())[0].result.data as Product;

  return {
    props: {
      slug: params?.slug as string,
      product: product,
    },
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  console.log("generating static paths for /merch/product/[slug]");

  // TODO: replace this with trpc/react-query call
  if (!process.env.NEXT_PUBLIC_MERCH_API_ORIGIN) {
    throw new Error("NEXT_PUBLIC_MERCH_API_ORIGIN is not defined");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MERCH_API_ORIGIN}/trpc/getProducts`
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const products = (await res.json()).result.data.products as Product[];

  return {
    paths: products.map((product) => ({
      params: {
        slug: product.id,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: "blocking",
  };
};
