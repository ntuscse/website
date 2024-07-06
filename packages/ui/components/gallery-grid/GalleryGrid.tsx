import React, { useState } from 'react'
import { Flex, Box, Image, Text, Grid, GridItem, keyframes } from '@chakra-ui/react';

export interface GalleryGridProps {
    title: string,
    images: Array<Image>
}

export type Image = {
    src: string,
    alt: string,
    rowSpan?: number,
    colSpan?: number,
}

const scroll = keyframes`
  0% { transform: translate(0); }
  100% { transform: translate(-100%); }
`;

export const GalleryGrid = ({ title, images }: GalleryGridProps) => {

    const [hover, setIsHovered] = useState(false);

    return (
        <Flex align='center' justify='center' flexDir='column' gap={8} py={20}>
            <Text fontSize='5xl' textAlign={'center'}>{title}</Text>
            <Box overflow='hidden' width='100vw' position='relative' height='768px'>
                <Flex 
                    position='absolute' 
                    gap={3} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    >
                    <Grid 
                        h={768} 
                        width='100vw' 
                        templateRows='repeat(2,1fr)' 
                        templateColumns='repeat(5, 1fr)' 
                        gap={3} 
                        sx={{ animation: `${scroll} 80s linear infinite`, animationPlayState: hover ? 'paused' : 'running' }}>
                        {
                            images.map(({ src, alt, colSpan, rowSpan }) => (
                                <GridItem key={src} colSpan={colSpan} rowSpan={rowSpan}>
                                    <Image src={src} alt={alt} objectFit="cover" width="100%" height="100%" borderRadius={10} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                    <Grid 
                        h={768} 
                        width='100vw' 
                        templateRows='repeat(2,1fr)' 
                        templateColumns='repeat(5, 1fr)' 
                        gap={3} 
                        sx={{ animation: `${scroll} 80s linear infinite`, animationPlayState: hover ? 'paused' : 'running' }}>
                        {
                            images.map(({ src, alt, colSpan, rowSpan }) => (
                                <GridItem key={src} colSpan={colSpan} rowSpan={rowSpan}>
                                    <Image src={src} alt={alt} objectFit="cover" width="100%" height="100%" borderRadius={10} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                </Flex>
            </Box>

        </Flex>
    )
}
