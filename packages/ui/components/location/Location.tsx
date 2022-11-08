import { Flex, AspectRatio } from "@chakra-ui/react";

export interface LocationProps {}

export const Location = (_props: LocationProps) => {
    //const LocationData = []

    return ( <Flex
        bgGradient='linear(to-t,#e6e3e3 48%,#121212 45%)'
        filter='brightness( 100% ) contrast( 100% ) saturate( 0% ) blur( 0px ) hue-rotate( 0deg )'
        w='100%'
        m='0px'
        p='20px'
        align="center"
        justify="space-between"
        lineHeight='1'
        border='none'
    >
        <AspectRatio h='400px' w='100%'>
            <iframe src='https://maps.google.com/maps?q=Nanyang%20Technological%20University&amp;t=m&amp;z=12&amp;output=embed&amp;iwloc=near' title='Nanyang Technological University' aria-label='Nanyang Technological University'/>
        </AspectRatio>
    </Flex>
    )
}