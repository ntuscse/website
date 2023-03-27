import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type SizeOptionType = BoxProps & {
  active: boolean;
  disabled?: boolean;
  onClick: (param: any) => void;
};

export const SizeOption: React.FC<SizeOptionType> = (props) => {
  const { active = false, disabled = false, children } = props;
  return (
    <Box
      display="inline-block"
      userSelect="none"
      minWidth="40px"
      maxWidth="120px"
      height="40px"
      pl="10px"
      pr="10px"
      textAlign="center"
      fontWeight={500}
      lineHeight={10}
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? "none" : "all"}
      cursor={disabled ? "not-allowed" : "pointer"}
      borderWidth={1}
      borderColor="secondary.400"
      color={active ? "#FFF" : "secondary.400"}
      backgroundColor={active ? "red.600" : "#FFF"}
      _active={{ color: "#FFF", backgroundColor: "secondary.500" }}
      {...props}
    >
      {children}
    </Box>
  );
};
