import { ReactNode } from "react";
import { Flex, FlexProps, Text, Divider } from "@chakra-ui/react";

type CartCardProps = FlexProps & {
  title?: string;
  children: ReactNode;
};

export const CartCard = ({ children, title, ...props }: CartCardProps) => {
  return (
    <Flex px={3} py={4} gap={4} flexDir="column" borderWidth="1px" borderRadius="lg" {...props}>
      <Text fontWeight={600}>{title} </Text>
      <Divider />
      {children}
    </Flex>
  );
};
