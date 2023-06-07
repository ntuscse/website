import { Box, Flex } from "@chakra-ui/react";
import { FramedText} from "ui";
import { memoriesData } from "../api";
import { HomeMemoriesCarousel } from "@/features/home/components/HomeMemoriesCarousel";

export const HomeMemories = () => {
  return (
    <>
      <Flex // Outer box
        pos={"relative"}
        h={"90vh"}
        backgroundColor={"brand.navy.dark"}
        flexDir={"column"}
        justify={"center"}
      >
        <Flex // Top Section
          pos={"relative"}
          w={"100%"}
          h={"45%"}
          flexDir={"column"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <Box // Banner image
            pos={"absolute"}
            backgroundImage={"/home/home-memories-top-banner.png"}
            backgroundPosition={"top"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            w={"100%"}
            h={"100%"}
          />
          <Box
            pos={"relative"}
            backgroundColor={"brand.navy.dark"}
            h={"max-content"}
            w={"max-content"}
            paddingX={"64px"}
            paddingY={"24px"}
            borderRadius={"37px 37px 0px 0px"}
            borderBottom={"1px dashed #FFFFFF"}
          >
            <FramedText text={"Memories"} textColor={'white'} />
          </Box>
        </Flex>
        <Flex h={["55%", "55%", "65%", "65%"]} w={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Box w={"85%"} height={"35vh"}>
            <HomeMemoriesCarousel images={memoriesData} autoSlide />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
