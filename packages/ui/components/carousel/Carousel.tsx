import { Box } from "@chakra-ui/react";
import { AnimatedCarousel, AnimatedCarouselProps, AnimatedCarouselItem } from "./AnimatedCarousel";

export type CarouselItem = AnimatedCarouselItem;
export interface CarouselProps extends AnimatedCarouselProps {};

export const Carousel = ({ items }: CarouselProps) => {
  return (
    <Box>
      <AnimatedCarousel items={items} mt={4} />
    </Box>
  );
};
