import { ReactNode } from "react";
import { Flex, FlexProps, Box } from "@chakra-ui/react";

type PageProps = FlexProps & {
  children: ReactNode;
  hideHeader?: boolean;
  contentWidth?: string;
  contentPadding?: number[];
};

export const Page = ({
  children,
  contentWidth = "1400px",
  contentPadding = [4, 6, 8],
  ...props
}: PageProps) => {
  return (
    <Flex pt="2.5em" flexDirection="column" {...props}>
      <Box w="100%" h="3em"></Box>
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
