import React, { useState } from "react";
import { useRouter } from 'next/router'
import {
  Flex,
  Heading,
  Text,
  Divider,
  Button,
  Input,
  Grid,
  GridItem,
  Badge,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselItem } from "ui/components/carousel";
import { EmptyProductView, MerchDetailSkeleton, Page, SizeChartDialog, SizeOption } from "ui/components/merch";
import { Product } from "types/lib/merch";
import { CartAction, CartActionType, useCartStore } from "features/merch/context/cart";
import { api } from "features/merch/services/api";
import { QueryKeys } from "features/merch/constants/queryKeys";
import { displayPrice } from "features/merch/functions/currency";
import { displayStock, getQtyInStock, isColorwayAvailable, isOutOfStock, isSizeAvailable } from "features/merch/functions/stock";
import { displayQtyInCart, getQtyInCart } from "features/merch/functions/cart";

const GroupTitle = ({ children }: any) => (
  <Heading fontSize="md" mb={2} color="grey" textTransform="uppercase">
    {children}
  </Heading>
);

export const MerchDetail: React.FC = () => {
  // Context hook.
  const { state: cartState, dispatch: cartDispatch } = useCartStore();
  const router = useRouter();
  const productId = (router.query.slug ?? "") as string;

  const [quantity, setQuantity] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColorway, setSelectedColorway] = useState<string | null>(null);
  const [maxQuantity, setMaxQuantity] = useState<number>(1); 

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: product, isLoading } = useQuery([QueryKeys.PRODUCT, productId], () => api.getProduct(productId), {
    onSuccess: (data: Product) => {
      setIsDisabled(!(data?.is_available === true));
    },
  });

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

  const updateMaxQuantity = (colorway: string, size: string) => {
    if (product) {
      const stockQty = getQtyInStock(product, colorway, size);
      const cartQty = getQtyInCart(cartState.items, product.id, colorway, size);
      const max = (stockQty > cartQty) ? stockQty - cartQty : 0;
      setMaxQuantity(max);
    }
  }

  const handleAddToCart = () => {
    if (!selectedColorway || !selectedSize) {
      return;
    }
    setIsDisabled(true);
    const payload: CartAction = {
      type: CartActionType.ADD_ITEM,
      payload: {
        productId,
        quantity,
        colorway: selectedColorway, 
        size: selectedSize, 
      },
    };
    cartDispatch(payload);
    setMaxQuantity(maxQuantity - quantity);
    setQuantity(1);
    setIsDisabled(false);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = `/cart`;
  };

  const ProductNameSection = (
    <Flex flexDirection="column" gap={1}>
      <Heading color="primary.600" fontSize={["xl", "2xl", "3xl", "4xl"]}>
        {product?.name}
        {!product?.is_available && (
          <Badge color="grey" ml={4} fontSize="md" variant="outline" display="inline">
            unavailable
          </Badge>
        )}
        {product && isOutOfStock(product) && (
          <Badge color="grey" ml={4} fontSize="md" variant="outline" display="inline">
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
      <Flex justifyContent="space-between" alignItems="center" mb={2} display="flex">
        <GroupTitle>Sizes</GroupTitle>
        {product?.size_chart && <Button size="sm" variant="unstyled" onClick={onOpen}>
          Size Chart
        </Button>}
      </Flex>
      <Flex gap={[4, 4]} flexWrap="wrap">
        {product?.sizes?.map((size, idx) => {
          return (
            <SizeOption
              key={idx.toString()}
              active={selectedSize === size}
              onClick={() => {
                setQuantity(1);
                if (size !== selectedSize) {
                  setSelectedSize(size);
                  if (selectedColorway) {
                    updateMaxQuantity(selectedColorway, size)
                  }
                }
                else {
                  setSelectedSize(null);
                }
              }}
              disabled={
                isDisabled || 
                (product ? 
                  (!isSizeAvailable(product, size)) : // size is not available for all colorways
                  false
                ) ||
                ((product && selectedColorway) ? 
                  (getQtyInStock(product, selectedColorway, size) === 0) : // size is not available for selected colorway
                  false
                ) 
              } 
            >
              <Text textTransform="uppercase" fontSize={{ base: "sm", md: "md" }}>
                {size}
              </Text>
            </SizeOption>
          );
        })}
      </Flex>
    </Flex>
  );

  const renderColorwaySection = (
    <Flex flexDirection="column" mt={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={2} display="flex">
        <GroupTitle>Colors</GroupTitle>
      </Flex>
      <Flex gap={[4, 4]} flexWrap="wrap">
        {product?.colors.map((colorway, idx) => {
          return (
            <SizeOption
              key={idx.toString()}
              active={selectedColorway === colorway}
              onClick={() => {
                setQuantity(1);
                if (colorway !== selectedColorway) {
                  setSelectedColorway(colorway);
                  if (selectedSize) {
                    updateMaxQuantity(colorway, selectedSize)
                  }
                }
                else {
                  setSelectedColorway(null);
                }
              }}
              width="auto"
              px={4}
              disabled={
                isDisabled || 
                (product ? 
                  (!isColorwayAvailable(product, colorway)) : // colorway is not available for all sizes
                  false
                ) ||
                ((product && selectedSize) ? 
                  (getQtyInStock(product, colorway, selectedSize) === 0) : // colorway is not available for selected size
                  false
                ) 
              } 
            >
              <Text textTransform="uppercase" fontSize={{ base: "sm", md: "md" }}>
                {colorway}
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
        <SizeOption disabled={isDisabled || !(selectedColorway && selectedSize) || quantity <= 1} active={false} onClick={() => handleQtyChangeCounter(false)}>
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
          disabled={isDisabled || !(selectedColorway && selectedSize) }
          onChange={handleQtyChangeInput}
        />
        <SizeOption disabled={isDisabled || !(selectedColorway && selectedSize) || quantity >= maxQuantity} active={false} onClick={() => handleQtyChangeCounter(true)}>
          +
        </SizeOption>
        <Center>
          <Text fontSize="m" fontWeight={500} color="primary.600"> 
            {(product && selectedColorway && selectedSize && (product.is_available === true)) ? displayStock(product, selectedColorway, selectedSize) : ""}
          </Text> 
        </Center>
      </Flex>
      <Flex flexDirection="column" mt={2}>
        <Text fontSize="m" fontWeight={300} color="primary.400"> 
          {(product && selectedColorway && selectedSize) ? displayQtyInCart(cartState.items, product.id, selectedColorway, selectedSize) : ""}
        </Text> 
        <Text fontSize="m" fontWeight={300} color="primary.400"> 
          {(product && selectedColorway && selectedSize && (maxQuantity === 0)) ? "You have reached the maximum purchase quantity."  : ""}
        </Text> 
      </Flex>
    </Flex>
  );

  const purchaseButtons = (
    <Flex gap={4} flexWrap="wrap">
      <Button flex={1} borderRadius={0} variant="outline" onClick={handleAddToCart} disabled={isDisabled || !(selectedColorway && selectedSize) || (maxQuantity === 0)}>
        ADD TO CART
      </Button>
      <Button flex={1} borderRadius={0} onClick={handleBuyNow} disabled={isDisabled || !(selectedColorway && selectedSize) || (maxQuantity === 0)}>
        BUY NOW
      </Button>
    </Flex>
  );

  // const renderDescription = (
  //   <Flex flexDirection="column" gap={2}>
  //     <GroupTitle>Description</GroupTitle>
  //     <Box whiteSpace="pre-line" fontSize={{ base: "sm", md: "md" }}>
  //       {`Keep cool all summer in these versatile pants, the neat shape slims the legs and flatters the bottom. A great staple garment to add to your wardrobe. The luxurious washed linen is comfortable, breathable and soft. The 7/8 Length leg can be worn rolled up to a crop pant. Style with our Broderie Anglaise or Fray Top.\n
  // \n
  // *100% European Linen\n*Contrast stripe lined pockets\n*Stitched inseam pockets\n`
  //         .split("\n")
  //         ?.map((line, idx) => {
  //           if (line) {
  //             return line.trim().startsWith("*") ? <li key={idx.toString()}>{line.trim().substring(1)}</li> : line;
  //           }
  //           return <br key={idx.toString()} />;
  //         })}
  //     </Box>
  //   </Flex>
  // );

  const renderMerchDetails = () => {
    return (
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}>
        <GridItem colSpan={2} px={[0, 4]}>
          <Carousel
            items={(product?.images ?? []).map<CarouselItem>((image) => {
                    return {
                        imageSrc: image,
                        href: "#0", // no link
                        altText: "Image for " + (product?.name ?? "product")
                    };
                })
            }
        />
        </GridItem>
        <GridItem colSpan={3} px={[0, 4]}>
          {ProductNameSection}
          <Divider mt={4} mb={6} />
          {renderSizeSection}
          {renderColorwaySection}
          {renderQuantitySection}
          <Divider my={6} />
          {purchaseButtons}
          {/* <Divider my={6} /> */}
          {/* {renderDescription} */}
        </GridItem>
        <SizeChartDialog sizeChart={product?.size_chart} onClose={onClose} isOpen={isOpen} />
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