import { Box, FlexProps, Text } from "@chakra-ui/react";
interface FramedTextProps extends FlexProps {
  text: String;
  fontSize?: number;
}
export const FramedText = ({ text, fontSize }: FramedTextProps) => {
  return (
    <Box
      className="framed-text-container"
      position="relative"
      paddingX={{ base: "16px" }}
      textAlign="center"
      textColor={"white"}
    >
      <Text
        fontSize={fontSize || ["32px", "48px", "48px", "58px"]}
        transitionDuration="0.3s"
      >
        {text}
      </Text>
      <Box
        position="absolute"
        top={[0, 2]}
        left={0}
        width={{ base: "40px" }}
        height={{ base: "40px" }}
        borderTop="2px solid #DD616B"
        borderRight="2px solid #DD616B"
        transform="rotate(270deg)"
      />
      <Box
        position="absolute"
        bottom={[0, 2]}
        right={0}
        width={{ base: "40px" }}
        height={{ base: "40px" }}
        borderBottom="2px solid #DD616B"
        borderLeft="2px solid #DD616B"
        transform="rotate(270deg)"
      />
    </Box>
  );
};
