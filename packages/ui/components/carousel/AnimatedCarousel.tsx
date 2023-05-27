import {
  Box,
  Flex,
  FlexProps,
  keyframes,
  SystemStyleObject,
} from "@chakra-ui/react";
import { Image } from "../image";
import Link from "next/link";

export type AnimatedCarouselItem = {
  imageSrc: string;
  href: string;
  altText: string;
} 

export interface AnimatedCarouselProps extends FlexProps {
  items: Array<AnimatedCarouselItem>;
}

const CarouselSlides = ({ items }: AnimatedCarouselProps) => {
  return (
    <>
      {items.map(({ imageSrc, altText, href }) => (
        <Box key={altText} width="250px" height="100px" mx={4}>
          {" "}
          {/* slide */}
          <Link href={href}>
            <Image
              height={100}
              width={250}
              src={imageSrc}
              alt={altText}
              style={{
                objectFit: "contain",
                height: "100px",
                width: "250px",
              }}
            />
          </Link>
        </Box>
      ))}
    </>
  );
};

const sideGradient: SystemStyleObject = {
  bgGradient: "linear(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)",
  content: `""`,
  height: "100px",
  position: "absolute",
  width: "200px",
  zIndex: 2,
};

export const AnimatedCarousel = ({ items, ...props }: AnimatedCarouselProps) => {
  const scroll = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(calc(-250px * ${items.length} ))
  }
`;
  const scrollAnimation = `${scroll} 40s linear infinite`;

  return (
    <Flex
      maxWidth="100vw"
      height="100px"
      margin="auto"
      position="relative"
      overflow="hidden"
      _before={{ ...sideGradient, left: 0, top: 0 }}
      _after={{
        ...sideGradient,
        right: 0,
        top: 0,
        transform: "rotateZ(180deg)",
      }}
      {...props}
    >
      <Flex
        height="100px"
        alignItems="center"
        width={`calc(250px * ${items.length * 2})`}
        animation={scrollAnimation}
      >
        {/* render slides twice for infinite effect */}
        <CarouselSlides items={items} />
        <CarouselSlides items={items} />
      </Flex>
    </Flex>
  );
};
