import { Flex, AspectRatio } from "@chakra-ui/react";

export interface LocationProps {
        src: string
        title: string
}

export const Location = ( { src, title } : LocationProps) => {

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
            <iframe sandbox='' src={src} title={title} aria-label={title} />
        </AspectRatio>
    </Flex>
    )
}