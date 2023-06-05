import { Divider, Heading, VStack } from "@chakra-ui/react";
import { sponsorsData, SponsorsGrid } from "@/features/sponsors";
const Sponsors = () => {
  return (
    <>
      <VStack pt={{ base: 5, lg: 10 }} minH="60vh" bg="#FFFFFF">
        <Heading>OUR SPONSORS</Heading>
        <Divider
          width="50%"
          marginTop="15px"
          marginBottom="15px"
          borderTop="1px"
          borderBottom="0px"
          borderColor="black"
        ></Divider>

        {/* Sponsors Grid */}
        <SponsorsGrid sponsorsData={sponsorsData} />
      </VStack>
    </>
  );
};

export default Sponsors;
