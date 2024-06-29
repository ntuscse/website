import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import Link from "next/link";


export const HomeHero = () => {
  return (
    <Flex
      minH="100vh"
      backgroundImage="/hero/tile-background.png"
      backgroundSize={["100%", "100%", "75%", "50%"]}
      backgroundPosition="center center"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {/* Header */}
      <Box marginTop={24} marginBottom={["0px", "0px", "0px", "32px"]}>
        <Link href="/">
          <Text
            as="header"
            role="heading"
            fontSize={["32px", "48px", "48px", "64px"]}
            fontWeight="semibold"
            background={linearGradientBrand}
            backgroundClip="text"
            color="transparent"
            _hover={{ letterSpacing: 6 }}
            transitionDuration="0.3s"
          >
          </Text>
        </Link>
      </Box>

      {/* Center Content */}
      <Flex
        position="relative"
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="center"
        mx="18px"
        zIndex={1}
      >
        {/* Links #1 */}
        <Flex
          order={[2, 2, 2, 1]}
          maxWidth={["100%", "100%", "100%", "25%"]}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          fontSize={["20px", "24px", "24px", "24px"]}
          fontWeight="semibold"
          background={linearGradientBrand}
          backgroundClip="text"
          color="transparent"
          paddingY={["0px", "0px", "0px", "24px"]}
        >
          {/*<Link href="/about">*/}
          <Text
            textAlign="center"
            my={["8px", "8px", "8px", "0px"]}
            // cursor="pointer"
          >
            10,000+
            <br />
            Undergraduates
          </Text>
          {/*</Link>*/}
          {/*<Link href="/join">*/}
          <Text
            textAlign="center"
            my={["8px", "8px", "8px", "0px"]}
            // cursor="pointer"
          >
            8 Sub-Committees
          </Text>
          {/*</Link>*/}
        </Flex>

        {/* Main Hero Image */}
        <Flex
          order={[1, 1, 1, 2]}
          justifyContent="center"
          alignItems="center"
          maxWidth={["100%", "100%", "100%", "50%"]}
          my="24px"
        >
          <Box
            position="relative"
            boxSize={["280px", "350px", "350px", "400px"]}
          >
            <Image
              src="/hero/open-doodles-book.png"
              alt="open doodles book image"
              fill={true}
            />
          </Box>
        </Flex>

        {/* Links #2 */}
        <Flex
          order={[3, 3, 3, 3]}
          maxWidth={["100%", "100%", "100%", "25%"]}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          fontSize={["20px", "24px", "24px", "24px"]}
          fontWeight="semibold"
          background={linearGradientBrand}
          backgroundClip="text"
          color="transparent"
          paddingY={["0px", "0px", "0px", "24px"]}
        >
          {/*<Link href="/events">*/}
          <Text
            textAlign="center"
            my={["8px", "8px", "8px", "0px"]}
            // cursor="pointer"
          >
            10+ events yearly
          </Text>
          {/*</Link>*/}

          <Link href="/academics">
            <Text
              textAlign="center"
              my={["8px", "8px", "8px", "0px"]}
              // cursor="pointer"
            >
              One-stop place for all your academic needs
            </Text>
          </Link>
        </Flex>
      </Flex>

      {/* Down Arrow Icon */}
      <Icon
        as={FaArrowDown}
        boxSize="30px"
        _hover={{
          cursor: "pointer",
        }}
        position="absolute"
        bottom={["24px", "24px", "24px", "48px"]}
        animation={`${arrowAnimation} 2s infinite`}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 100,
            behavior: "smooth",
          });
        }}
      />

      {/* Images of Students in the background */}
      <Box
        position="absolute"
        top="20%"
        left="-50px"
        boxSize={["175px", "200px", "250px", "300px"]}
        borderRadius="400px"
        borderWidth="6px"
        borderColor="brand.navy.medium"
        opacity="40%"
      >
        <Image
          src="/hero/students-1.png"
          alt="image of scse students"
          fill={true}
          style={{ borderRadius: "400px" }}
        />
      </Box>
      <Box
        position="absolute"
        bottom="-25px"
        right="-25px"
        boxSize={["175px", "200px", "250px", "300px"]}
        borderRadius="400px"
        borderWidth="6px"
        borderColor="brand.navy.medium"
        opacity="40%"
      >
        <Image
          src="/hero/students-2.png"
          alt="image of scse students"
          fill={true}
          style={{ borderRadius: "400px" }}
        />
      </Box>
    </Flex>
  );
};

const linearGradientBrand =
  "linear-gradient(90deg, #254876 13.43%, #DD616B 87.61%)";

const arrowAnimation = keyframes`
  0%   { transform: translateY(0px) }
  50%  { transform: translateY(8px); color: #DD616B }
  100% { transform: translateY(0px) }
`;
