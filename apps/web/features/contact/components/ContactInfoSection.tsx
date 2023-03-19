import { Box, Grid, GridItem, Heading, Link, Text } from "@chakra-ui/react";

export const ContactInfoSection = () => {
  return (
    <Box w="100%" px="20px" py={{ base: "40px", md: "80px" }} bg="black">
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        maxW="1140px"
        mx="auto"
      >
        <GridItem
          p="20px"
          pb={{ base: "30px", md: "20px" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h4"
            size="lg"
            color="white"
            mb={{ base: "5px", md: "20px" }}
          >
            Email
          </Heading>
          <Link color="white">scse-it@e.ntu.edu.sg</Link>
        </GridItem>
        <GridItem
          p="20px"
          pb={{ base: "30px", md: "20px" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h4"
            size="lg"
            color="white"
            mb={{ base: "5px", md: "20px" }}
          >
            Address
          </Heading>
          <Text color="white">50 Nanyang Ave, Singapore 639798</Text>
        </GridItem>
      </Grid>
    </Box>
  )
};
