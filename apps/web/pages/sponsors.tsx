import { FooterContentButton, Image } from "ui";
import { sponsorsImageData } from "@/pages/api/sponsors";
import { Box, Divider, Heading, Link, SimpleGrid, VStack } from "@chakra-ui/react";
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
        <Box>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            spacing={["30px", "50px", "150px"]}
            marginBottom="5rem"
            marginTop="3rem"
          >
            {sponsorsImageData.map(({ imageSrc, altText, href }) => (
              <Box key={altText} width="250px" height="100px" mx={4}>
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
        </Box>
      </VStack>
      <FooterContentButton
        href="./contact"
        label="Contact Us"
        title="Want to sponsor us or work on a event together?"
      />
    </>
  );
};

export default Sponsors;
