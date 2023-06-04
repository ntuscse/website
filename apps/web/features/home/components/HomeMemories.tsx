import { Box, Flex } from "@chakra-ui/react";
import { Carousel } from "ui";
import { FramedText } from "ui";
import { memoriesData } from "../api";

export const HomeMemories = () => {
  let bannerRatio = (396 / 873) * 100;
  let blueBannerRatioW = (1218 / 1440) * 100;
  let blueBannerRatioH = (304 / 873) * 100;

  return (
    <>
      <Flex // Outer box
        pos={"relative"}
        w={"100vw"}
        minH={"100vh"}
        // h={{ base: "873px" }}
        backgroundColor={"#EDEDED"}
        justify={"center"}
      >
        <Box // Banner image
          pos={"absolute"}
          //   zIndex={1}
          backgroundImage={"/home/home-memories-top-banner.png"}
          backgroundPosition={"top"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          w={"100%"}
          h={`${bannerRatio}%`}
        ></Box>
        <Flex // Blue background
          className="colored-background"
          zIndex={1}
          pos={"absolute"}
          direction={"column"}
          backgroundColor={"#0F2B50"}
          align={"center"}
          top={"258px"}
          h={`${blueBannerRatioH}%`}
          w={"80%"}
        >
          <Box pos={"relative"} top={"54px"}>
            <FramedText text={"Memories"} />
          </Box>
          <Box
            className="carousel-container"
            w="90%"
            pos={"absolute"}
            top={"189px"} // Carousel
          >
            <Carousel items={memoriesData}></Carousel>
          </Box>
        </Flex>
      </Flex>
    </>
    // <>
    //   <Flex
    //     className="memories-container"
    //     position={"relative"}
    //     background={"black"}
    //     direction={"column"}
    //     align={"center"}
    //     w={"full"}
    //     h={{ base: "873px", md: "500" }}
    //   >
    //     <Image

    //       src="/home/home-memories-top-banner.png"
    //       alt="home-memories-top-banner"
    //       // width={1440}
    //       // height={396}
    //     />
    //     <Box flex={"1"} height={477} width={1440}></Box>
    //   </Flex>
    // </>
  );
};
