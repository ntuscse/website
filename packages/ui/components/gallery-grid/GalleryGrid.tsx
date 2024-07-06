import React from 'react'
import { Flex, Image, Text, Grid, GridItem } from '@chakra-ui/react';

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

export const GalleryGrid = ({ title, images }: GalleryGridProps) => {
    return (
        <Flex align='center' justify='center' flexDir='column' gap={8} py={20}>
            <Text fontSize='5xl' textAlign={'center'}>{title}</Text>
            <Grid h={768} templateRows='repeat(2,1fr)' templateColumns='repeat(5, 1fr)' gap={3}>
                {
                    images.map(({ src, alt, colSpan, rowSpan }) => (
                        <GridItem key={src} colSpan={colSpan} rowSpan={rowSpan}>
                            <Image src={ src } alt={ alt } objectFit="cover" width="100%" height="100%" borderRadius={10}/>
                        </GridItem>
                    ))
                }
            </Grid>
        </Flex>
    )
}
