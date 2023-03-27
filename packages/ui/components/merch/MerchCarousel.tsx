import "swiper/css";
import "swiper/less/autoplay";
import { Flex, Box, Image } from "@chakra-ui/react";
import { Controller } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import React, { ReactElement, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export type Slide = {
  id: string;
  component: ReactElement;
};

export type MarkerProps = {
  index: number;
  slideIndex: number;
  slideTo: (index: number) => void;
};

type CarouselProps = {
  images: string[];
};

const Marker: React.FC<MarkerProps> = (props: MarkerProps) => {
  // Swiper Ref
  const swiper = useSwiper();
  const { index, slideIndex, slideTo } = props;

  // Click Handler
  const handleClick = () => {
    slideTo(index);
    swiper.slideTo(index);
  };

  return (
    <Box
      width="12px"
      height="12px"
      borderWidth="3px"
      borderRadius="6px"
      cursor="pointer"
      onClick={handleClick}
      borderColor="primary.600"
      backgroundColor={slideIndex === index ? "primary.600" : "white"}
    />
  );
};

const Controllerer = ({ length }: { length: number }) => {
  const swiper = useSwiper();
  const [curIndex, setCurIndex] = useState<number>(0);
  const slideLeft = () => {
    swiper.slidePrev();
    if (curIndex - 1 < 0) {
      setCurIndex(length - 1);
    } else {
      setCurIndex((curIndex - 1) % length);
    }
  };
  const slideRight = () => {
    swiper.slideNext();
    setCurIndex((curIndex + 1) % length);
  };
  const slideTo = (index: number): void => {
    setCurIndex(index);
  };

  if (length < 2) return null

  return (
    <Flex justifyContent="space-between">
      <ChevronLeftIcon w={8} h={8} cursor="pointer" onClick={slideLeft} />
      <Flex alignItems="center" gap={2}>
        {Array(length)
          .fill(null)
          .map((url, index) => (
            <Marker key={index.toString()} index={index} slideIndex={curIndex} slideTo={slideTo} />
          ))}
      </Flex>
      <ChevronRightIcon w={8} h={8} cursor="pointer" onClick={slideRight} />
    </Flex>
  );
};

export const MerchCarousel = ({ images }: CarouselProps) => {
  const [controlledSwiper, setControlledSwiper] = useState<any>(null);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Box maxWidth="100%" pointerEvents="none">
        <Swiper
          loop
          onSwiper={setControlledSwiper}
          modules={[Controller]}
          style={{ display: "block", width: "100%", position: "relative" }}
        >
          {images.map((url, idx) => (
            <SwiperSlide key={(idx + 1).toString()}>
              <Image objectFit="cover" borderRadius={4} src={url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box maxWidth="100%" my={4}>
        <Swiper loop slidesPerView={1} controller={{ control: controlledSwiper }} modules={[Controller]}>
          {images.map((url, idx) => (
            <SwiperSlide key={(idx + 1).toString()} />
          ))}
          <Controllerer length={images.length} />
        </Swiper>
      </Box>
    </Flex>
  );
};

