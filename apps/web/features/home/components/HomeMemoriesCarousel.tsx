import { useState, useEffect } from "react";
import { Box, Flex, Icon, Image, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaCameraRetro } from "react-icons/fa";
import { keyframes } from "@emotion/react";

export interface HomeMemoriesCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export const HomeMemoriesCarousel = (props: HomeMemoriesCarouselProps) => {
  const {
    images,
    autoSlide = false,
    autoSlideInterval = 5000,
  } = props;

  const imageEndOffset = useBreakpointValue({ base: 1, sm: 2, md: 3 }) ?? 1;
  const imageWidth = useBreakpointValue({ base: 100, sm: 50, md: 33 }) ?? 100;

  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? images?.length - imageEndOffset : curr - 1));
  const next = () => setCurr((curr) => (curr === images?.length - imageEndOffset ? 0 : curr + 1));

  // Auto Slide
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  return (
    <Flex
      position={"relative"}
      w={"100%"}
      h={"100%"}
      flexDir={"row"}
    >
      <Icon
        as={FaCameraRetro}
        position={"absolute"}
        zIndex={10}
        boxSize={"48px"}
        background={"brand.navy.dark"}
        transform={"rotate(-30deg) translateY(-18px) translateX(36px)"}
        animation={`${cameraAnimation} 2s infinite`}
      />
      {/* Left Arrow */}
      <Flex
        zIndex={2}
        backgroundColor={"brand.navy.dark"}
        alignItems={"center"}
        paddingRight={"8px"}
      >
        <Icon
          as={FaChevronLeft}
          onClick={prev}
          boxSize={["24px", "32px", "32px", "32px"]}
          color={"white"}
          cursor={"pointer"}
        />
      </Flex>

      {/* Images */}
      <Flex
        overflow={"hidden"}>
        <Flex
          zIndex={1}
          transition={"ease-out"}
          transitionDuration={"500ms"}
          transform={`translateX(-${curr * imageWidth}%)`}
          h={"100%"}
        >
          {images.map(image => (
            // eslint-disable-next-line @next/next/no-img-element
            <Box
              key={image.alt}
              minWidth={`${imageWidth}%`}
              maxWidth={`${imageWidth}%`}
              overflow={"hidden"}
            >
              <Image
                src={image.src}
                alt={image.alt}
                paddingX={"4px"}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                _hover={{
                  // transform: 'scale(1.1)',
                  paddingX: '24px',
                  paddingY: '12px'
                }}
                transition={"ease-in-out"}
                transitionDuration={"100ms"}
              />
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Right Arrow */}
      <Flex
        zIndex={2}
        backgroundColor={"brand.navy.dark"}
        alignItems={"center"}
        paddingLeft={"8px"}
      >
        <Icon
          as={FaChevronRight}
          onClick={next}
          boxSize={["24px", "32px", "32px", "32px"]}
          color={"white"}
          cursor={"pointer"}
        />
      </Flex>
    </Flex>
  )
}

const cameraAnimation = keyframes`
  0%   { color: #EF8891 }
  50%  { color: #DD616B }
  100% { color: #EF8891 }
`;
