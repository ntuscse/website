import {
  Link,
  Box,
  Flex,
  FlexProps,
  keyframes,
  SimpleGrid,
  SystemStyleObject,
} from "@chakra-ui/react";
import { Image } from "../image";

export interface AnimatedCarouselProps extends FlexProps {
  items: Array<{
    imageSrc: string;
    href: string;
    altText: string;
  }>;
}

const CarouselSlides = ({ items }: AnimatedCarouselProps) => {
  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing={["30px", "50px", "150px"]}
        marginBottom={"5rem"}
        marginTop={"3rem"}
      >
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
      </SimpleGrid>
    </>
  );
};

const sideGradient: SystemStyleObject = {
  // background: `linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)`,
  bgGradient: "linear(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)",
  content: `""`,
  height: "100px",
  position: "absolute",
  width: "200px",
  zIndex: 2,
};

export const AnimatedCarousel = ({
  items,
  ...props
}: AnimatedCarouselProps) => {
  const scroll = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(calc(-250px * ${items.length} ))
  }
`;
  const scrollAnimation = `${scroll} 40s linear infinite`;
  return <CarouselSlides items={items} />;
};
