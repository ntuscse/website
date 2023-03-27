import { ReactNode } from "react";
import { Flex, FlexProps, Box } from "@chakra-ui/react";
import { CartHeader } from "./CartHeader";

type PageProps = FlexProps & {
  children: ReactNode;
  hideHeader?: boolean;
  contentWidth?: string;
  contentPadding?: number[];
};

export const Page = ({
  children,
  hideHeader = false,
  contentWidth = "1400px",
  contentPadding = [4, 6, 8],
  ...props
}: PageProps) => {
  return (
    <Flex flexDirection="column" {...props}>
      {!hideHeader && <CartHeader />}
      <Box
        w="100%"
        flexDir="column"
        mt={[6, 10]}
        mx="auto"
        minHeight="75vh"
        maxWidth={contentWidth}
        px={contentPadding}
      >
        {children}
      </Box>
    </Flex>
  );
};