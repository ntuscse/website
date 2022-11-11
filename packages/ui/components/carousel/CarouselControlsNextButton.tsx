import { Box, IconButton } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

export const CarouselControlsNextButton = () => {
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
                icon={<ArrowRightIcon/>}
            >Next</IconButton>
        </Box>
    )
}