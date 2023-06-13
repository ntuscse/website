import {
  Box,
  Flex,
  HStack,
  Spacer,
  Show,
  Hide,
  Icon,
} from "@chakra-ui/react";
import Link from 'next/link';
import { routes } from "web/features/merch/constants";


export const CartHeader = () => {
  return (
    <Flex pos="sticky" zIndex={2} bg="#0e2b50" top={0} py={4} px={{ base: 4, md: 4, lg: 16 }} align="center">
      <Spacer />
      <Show below="xl">
        <Link href={routes.CART}>
          <Flex alignItems="center" gap={1} mr={4}>
            <Icon viewBox="0 0 24 24" boxSize={5}>
              <path fill="none" strokeWidth="1.5" stroke="white"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Icon>
          </Flex>
        </Link>
      </Show>
      <Hide below="xl">
        <HStack spacing={5} alignItems="center">
          <Link href={routes.CART}>
            <Box px={2} py={1} borderRadius={7}
            _hover={{ bg: "#426899", transition: "0.5s", color: "white" }}>
              <Flex alignItems="center" gap={1}>
              <Icon viewBox="0 0 24 24" boxSize={8}>
                <path fill="none" strokeWidth="1.5" stroke="white"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </Icon>
              </Flex>
            </Box>
          </Link>
        </HStack>
      </Hide>
    </Flex>
  );
};