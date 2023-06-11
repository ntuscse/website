import React from "react";
import Link from 'next/link';
import { Center, Flex, Heading, Button } from "@chakra-ui/react";
import { routes } from "web/features/merch/constants";

export const CartEmptyView: React.FC = () => (
  <Center minH="40vh" width="100%">
    <Flex flexDirection="column" gap={8} alignItems="center">
      <Heading fontSize="2xl" fontWeight="semibold">There are no items currently in your cart.</Heading>
      <Link href={routes.HOME}>
        <Button 
          size="md" 
          fontWeight="semibold" 
          flexShrink={1} 
          borderRadius={0}
          _hover={{ bg: "primary-blue" }}
        >
          CONTINUE SHOPPING
        </Button>
      </Link>
    </Flex>
  </Center>
);