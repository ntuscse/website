import React from 'react'
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
    return (
        <Flex align='center' justify='center' flexDir='column' gap={8} py={20}>
            <Text fontSize='5xl' textAlign={'center'}>{title}</Text>
            <Box overflow='hidden' width='100vw' position='relative' height='768px'>
                <Flex position='absolute' gap={3}>
                    <Grid h={768} width='100vw' templateRows='repeat(2,1fr)' templateColumns='repeat(5, 1fr)' gap={3} animation={`${scroll} 80s linear infinite backwards`}>
                        {
                            images.map(({ src, alt, colSpan, rowSpan }) => (
                                <GridItem key={src} colSpan={colSpan} rowSpan={rowSpan}>
                                    <Image src={src} alt={alt} objectFit="cover" width="100%" height="100%" borderRadius={10} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                    <Grid width='100vw' h={768} templateRows='repeat(2,1fr)' templateColumns='repeat(5, 1fr)' gap={3} animation={`${scroll} 80s linear infinite backwards`}>
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
