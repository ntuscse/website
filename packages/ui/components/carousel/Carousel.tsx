import { Box } from "@chakra-ui/react";
import React from "react";
import { AnimatedCarousel, AnimatedCarouselProps } from "./AnimatedCarousel";

export interface CarouselProps extends AnimatedCarouselProps {}

export const Carousel = ({ items }: CarouselProps) => {
  return (
    <Box>
      <AnimatedCarousel items={items} mt={4} />
    </Box>
  );
};
