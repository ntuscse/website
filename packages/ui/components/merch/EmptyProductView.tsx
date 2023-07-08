import React, { useEffect } from "react";
import { Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "web/features/merch/constants";

export const EmptyProductView: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(routes.HOME).catch((err) => console.error(err));
    }, 3000);
  }, []);

  return (
    <Center minH="50vh" width="100%">
      <Flex flexDirection="column" gap={8} alignItems="center">
        <Heading fontSize="2xl">The item does not exist...</Heading>
        <Spinner />
        <Text>Redirecting you in 3 seconds...</Text>
      </Flex>
    </Center>
  );
};
