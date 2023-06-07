import Link from 'next/link';
import React from 'react';
import { Box } from "@chakra-ui/react";

interface UpcomingEventRibbonProps {
  href: string;
}

export const UpcomingEventRibbon = ({ href }: UpcomingEventRibbonProps) => {
  return (
    <Box
      zIndex={1000}
      backgroundImage={"linear-gradient(to right, #DD616B, #254876)"}
      w={"max-content"}
      position={"fixed"}
      right={"-56px"}
      top={"50%"}
      paddingX={"12px"}
      paddingY={"8px"}
      color={"white"}
      fontWeight={"semibold"}
      style={{ 'rotate': '-90deg' }}
    >
      <Link
        href={href}
      >
        Upcoming Event
      </Link>
    </Box>
  );
};
