import { Map } from "ui";
import { Box, Heading } from "@chakra-ui/react";
import { MapEnums } from "ui/components/map/Map";
import { ContactInfoSection, FaqSection } from "@/features/contact";

const Contact = () => {
  return (
    <>
      <Box
        px="20px"
        pb={{ base: "10px", md: "50px" }}
        pt={{ base: "50px", md: "100px" }}
        textAlign="center"
      >
        <Heading role="heading" as="h1" size="xl">
          CONTACT US
        </Heading>
      </Box>
      <Map title="Nanyang Technological University" map={MapEnums.NTUMap} />
      <ContactInfoSection />
      <FaqSection />
    </>
  );
};

export default Contact;
