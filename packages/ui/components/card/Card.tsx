import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import { CardImage, CardImageProps } from "./CardImage";
import { CardContent, CardContentProps } from "./CardContent";

export interface CardProps {
    link: string;
    cardImageProps: CardImageProps;
    cardContentProps: CardContentProps;
}

export const LinkContext = React.createContext("/");

export const Card = ({ link, cardImageProps, cardContentProps }: CardProps) => {

    return (
        <LinkContext.Provider value={ link }>
            <Center py={ 6 }>
                <Box
                    maxW='445px'
                    w='full'
                    bg='white'
                    boxShadow='2xl'
                    rounded='2xl'
                    p={ 6 }
                    overflow='hidden'
                    _hover={{
                        bg: 'gray.50'
                    }}
                    transition='transform 0.25s ease'
                >
                    {/* Image */}
                    <CardImage { ...cardImageProps } />

                    {/* Content */}
                    <CardContent { ...cardContentProps } />
                </Box>
            </Center>
        </LinkContext.Provider>
    )
}