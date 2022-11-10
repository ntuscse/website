import {Box, IconButton, Flex} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function CarouselControlsPrev(){

    return (
        <Box>
            <IconButton
                aria-label={'Previous'}
                bg={'grey'}
                className={"carousel-control left"}
                display={'inline-block'}
                position={'absolute'}
                cursor={'pointer'}
                left={'2'}
                top={'45%'}
                rounded={20}
                opacity={'0.8'}
                icon={<ArrowLeftIcon/>}>
                Prev</IconButton>

        </Box>
    )

}