import { Flex, Heading, Divider } from "@chakra-ui/react";
import { ChakraUICarousel } from "./ChakraUICarousel";
import { ChakraUICarouselProps } from "./ChakraUICarousel"

export interface CarouselProps {
    chakraUICarouselProps: ChakraUICarouselProps;
}

export const CarouselSpace = ({ chakraUICarouselProps }: CarouselProps) => {
    return (
        <Flex
            bg={'#e6e3e3'}
            paddingTop={'20px'}
            paddingBottom={'60px'}
            borderColor={'purple'}
            justifyContent={'center'}
            alignItems={'center'}
            paddingLeft={0}
            paddingRight={0}
            flexDirection={'column'}
        >
            <Heading fontSize={'4xl'} as={'b'} lineHeight={'1.1em'} textAlign={'center'}>OUR SPONSORS</Heading>
            <Divider width={'50%'} marginTop={'15px'} marginBottom={'15px'} borderTop={'1px'} borderBottom={'0px'} borderColor={'black'}></Divider>

            <Flex paddingLeft={'10%'}
                  paddingRight={'10%'}
                >
                <ChakraUICarousel items={ chakraUICarouselProps.items } />
            </Flex>
        </Flex>
    )
}