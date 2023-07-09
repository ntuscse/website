import React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export type LoadingScreenType = {
  minH?: string;
  text: string;
};
const LoadingScreen: React.FC<LoadingScreenType> = (props) => {
  const { minH = "50vh", text = "" } = props;
  return (
    <Flex
      minH={minH}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={8}
    >
      <Spinner thickness="4px" speed="0.65s" size="xl" />
      <Text>{text}</Text>
    </Flex>
  );
};

export default LoadingScreen;
