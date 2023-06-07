import { HomeHero, HomeWhoRWe } from "@/features/home";
import { HomeMemories } from "@/features/home";
import { Box, Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeWhoRWe />
      <HomeMemories />
      <Flex
        backgroundColor={"brand.navy.dark"}
        justifyContent={"center"}
        paddingY={["4px", "12px", "12px", "12px"]}
      >
        <Box
          width={["80%", "80%", "80%", "90%"]}
          border={"1px white solid"}
        ></Box>
      </Flex>
    </>
  );
};

export default Home;
