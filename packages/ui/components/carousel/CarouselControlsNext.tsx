




import {Box, IconButton, Flex} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function CarouselControlsNext(){

    return (
        <Box>
            <IconButton
                aria-label={'Next'}
                bg={'grey'}
                opacity={'0.8'}
                className={"carousel-control right"}
                display={'inline-block'}
                position={'absolute'}
                cursor={'pointer'}
                right={'2'}
                rounded={20}
                top={'45%'}
                // top={'${calc(50%-25px)}'}
                icon={<ArrowRightIcon/>}
            >Next</IconButton>

        </Box>
    )

}