import { Map, MapProps, Faq, FaqProps } from "ui";
import { Heading, Box, Text, Link, Grid, GridItem } from "@chakra-ui/react";

const Contact = () => {
  const mapProps: MapProps = {
    title: "Nanyang Technological University",
  };
  const faqProps: FaqProps = {
    heading: "Frequently Asked Questions",
    qnaList: [
      {
        question: "What is the level required?",
        answer:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
      {
        question: "Level required?",
        answer: "Lorem ipsum.",
      },
      {
        question: "What is the level required?",
        answer:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
      {
        question: "What is the level required?",
        answer:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. " +
          "The passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
      },
    ],
  };
  return (
    <div>
      <Box
        px="20px"
        pb={{ base: "10px", md: "50px" }}
        pt={{ base: "50px", md: "100px" }}
        textAlign="center"
      >
        <Heading
          role="heading"
          as="h1"
          size="xl"
          textTransform="uppercase"
          fontWeight="900"
          fontFamily="Roboto, Sans-serif"
        >
          Contact Us
        </Heading>
      </Box>
      <Map title={mapProps.title}></Map>
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
      <Box py={{ base: "40px", md: "80px" }} textAlign="center" px="20px">
        <Faq heading={faqProps.heading} qnaList={faqProps.qnaList} />
      </Box>
    </div>
  );
};

export default Contact;
