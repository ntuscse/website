import { AnimatedCarousel, AnimatedCarouselProps, AnimatedCarouselItem } from "./AnimatedCarousel";

export type CarouselItem = AnimatedCarouselItem;
export interface CarouselProps extends AnimatedCarouselProps {}

export const Carousel = ({ items }: CarouselProps) => {
  return (
    <>
      <AnimatedCarousel items={items} mt={4} />
    </>
  );
};
