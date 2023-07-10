import React from "react";
import Link from "next/link";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Input,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Box,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { CartItem, Product } from "types";
import { displayPrice, getQtyInStock } from "web/features/merch/functions";
import { routes } from "web/features/merch/constants";

export type CartItemProps = {
  isMobile: boolean;
  data: CartItem;
  productInfo?: Product;
  isLoading: boolean;
  onRemove: (productId: string, size: string, color: string) => void;
  onQuantityChange: (productId: string, size: string, color: string, qty: number) => void;
};

const MIN_ITEM_CNT = 1;

export const CartItemCard: React.FC<CartItemProps> = ({ isMobile, data, onRemove, onQuantityChange, productInfo }) => {
  const MAX_ITEM_CNT = productInfo ? getQtyInStock(productInfo, data.color, data.size) : 1;
  const handleQtyChangeCounter = (isAdd: boolean) => {
    const value = isAdd ? 1 : -1;
    if (!isAdd && data.quantity === MIN_ITEM_CNT) {
      onRemove(data.id, data.size, data.color);
      return;
    }
    if (isAdd && data.quantity === MAX_ITEM_CNT) return;
    onQuantityChange(data.id, data.size, data.color, data.quantity + value);
  };

  const handleQtyChangeInput = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    if (Number.isNaN(parseInt(target.value, 10))) {
      onQuantityChange(data.id, data.size, data.color, MIN_ITEM_CNT);
    } else {
      const value = parseInt(target.value, 10);
      if (value <= 0) {
        onRemove(data.id, data.size, data.color);
      } else if (value > MAX_ITEM_CNT) {
        onQuantityChange(data.id, data.size, data.color, MAX_ITEM_CNT);
      } else {
        onQuantityChange(data.id, data.size, data.color, value);
      }
    }
  };
  const unitPrice = displayPrice(productInfo?.price ?? 0);
  const subTotalPrice = displayPrice((productInfo?.price ?? 0) * data.quantity);

  const quantityInput = (
    <Flex flexDirection="column" gap={1}>
      <InputGroup size="xs">
        <InputLeftAddon style={{ cursor: "pointer" }} onClick={() => handleQtyChangeCounter(false)}>
          -
        </InputLeftAddon>
        <Input
          type="tel"
          pattern="[0-9]*"
          textAlign="center"
          value={data.quantity}
          placeholder="Item Count"
          onChange={handleQtyChangeInput}
        />
        <InputRightAddon style={(data.quantity < MAX_ITEM_CNT) ? { cursor: "pointer" } : { cursor: "not-allowed", opacity: 0.4 }} onClick={() => handleQtyChangeCounter(true)}>
          +
        </InputRightAddon>
      </InputGroup>
      <Center>
        <Text fontSize="xs" fontWeight={300} color="primary.400">
            In stock: {MAX_ITEM_CNT}
        </Text>
      </Center>
    </Flex>
  );
  const desktopView = (
    <Grid templateColumns="5fr repeat(3, 2fr) 1fr" rowGap={2}>
      <GridItem display="flex">
        <Box boxShadow="sm" maxWidth={[125, 100]}>
          <Link href={[routes.PRODUCT , productInfo?.id].join('/')}>
            <Image
              src={productInfo?.images?.[0]}
              fallbackSrc="https://via.placeholder.com/100"
              boxSize="70"
              objectFit="contain"
              borderRadius="md"
            />
          </Link>
        </Box>
        <Flex flexDir="column" fontWeight="600" fontSize={["sm", "md"]} ml={2}>
          <Link href={[routes.PRODUCT , productInfo?.id].join('/')}>
            <Text color="primary.600" noOfLines={2}>
              {productInfo?.name}
            </Text>
          </Link>
          <Flex color="grey">
            <Flex>Size:</Flex>
            <Text ml={1} textTransform="uppercase">
              {data.size}
            </Text>
          </Flex>
          <Flex color="grey">
            <Flex>Color:</Flex>
            <Text ml={1}>
              {data.color}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Text fontSize={["sm", "md"]} fontWeight={500}>
          {unitPrice}
        </Text>
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        {quantityInput}
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Text fontSize={["sm", "md"]} fontWeight={500}>
          {subTotalPrice}
        </Text>
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Button size="sm" variant="link" onClick={() => onRemove(data.id, data.size, data.color)}>
          <DeleteIcon h={4} w={4} _hover={{ color: "brand.red.medium" }} />
        </Button>
      </GridItem>
    </Grid>
  );

  const mobileView = (
    <Flex flex={1} justifyContent="center">
      <Box boxShadow="sm" borderRadius={5} maxW={150}>
        <Image w="100%" borderRadius={5} src={productInfo?.images?.[0]} fallbackSrc="https://via.placeholder.com/100" />
      </Box>
      <Flex flexDir="column" fontWeight="600" fontSize={["xs", "sm"]} ml={4} gap={2}>
        <Flex justifyContent="space-between" gap={1}>
          <Text noOfLines={2} color="primary.600">
            {productInfo?.name}
          </Text>
          <Button size="sm" variant="link" onClick={() => onRemove(data.id, data.size, data.color)}>
            <SmallCloseIcon h={5} w={5} _hover={{ color: "brand.red.medium" }} />
          </Button>
        </Flex>
        <Flex color="grey" direction="column">
          <Flex>
            Size:{" "}
            <Text textTransform="uppercase">
              {data.size}
            </Text>
          </Flex>
          <Box>
          Color:{" "}
            {data.color}
          </Box>
        </Flex>
        <Text fontWeight={500}>Unit Price: {unitPrice}</Text>
        {quantityInput}
        <Text fontWeight={500}>Subtotal: {subTotalPrice}</Text>
      </Flex>
    </Flex>
  );
  return <Flex my="4">{!isMobile ? desktopView : mobileView}</Flex>;
};
