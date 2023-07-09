import { Flex, Spinner, Text } from "@chakra-ui/react";

export type LoadingScreenProps = {
    minH?: string;
    text: string;
};

export const LoadingScreen = ({ minH = "50vh", text = "" }: LoadingScreenProps) => {
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