import { Center, Link } from "@chakra-ui/react";
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import { CarouselControlsNextButton } from "./CarouselControlsNextButton";
import { CarouselControlsPrevButton } from "./CarouselControlsPrevButton";

export interface ChakraUICarouselProps {
    items: Array<{
        href: string
        src: string
        alt: string}>
}

export const ChakraUICarousel = ({ items }: ChakraUICarouselProps) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />
            <Carousel
                activeIndex={ index }
                onSelect={ handleSelect }
                nextIcon={ <CarouselControlsNextButton/> }
                prevIcon={ <CarouselControlsPrevButton/> }
                interval={ 2000 }
            >
                { items.map((item) =>
                    (<Carousel.Item>
                        <Center height='200px' width={{ base: '280px', md: '500px', lg: '900px' }}>
                            <Link href={ item.href } style={{ justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%" }}>
                                <Image
                                    className="d-block"
                                    height = { 100 }
                                    width = { 350 }
                                    style={{ height : "100%", width: "100%" }}
                                    src={ item.src }
                                    alt={ item.alt }
                                />
                            </Link>
                        </Center>
                    </Carousel.Item>)
                ) }
            </Carousel>
        </>
    );
}