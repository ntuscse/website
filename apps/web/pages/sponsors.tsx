import { CarouselSpace, FooterContentButton } from "ui"
import { sponsorsImageData } from "@/pages/api/sponsors";
import { Divider, Heading, VStack } from "@chakra-ui/react";

const Sponsors = () => {
    return (
        <>
            <VStack pt={{ base: 5, lg: 10 }} minH='60vh'>
                <Heading>OUR SPONSORS</Heading>
                <Divider width='50%' marginTop='15px' marginBottom='15px' borderTop='1px' borderBottom='0px' borderColor='black'></Divider>
                <CarouselSpace carouselItems={ sponsorsImageData.carouselItems }/>
            </VStack>
            <FooterContentButton href="./contact" label="Contact Us" title="Wanna Sponsor us or work on a event together!"/>
        </>
    )
}

export default Sponsors