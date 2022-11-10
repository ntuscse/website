// import { Provider } from "chakra-ui-carousel";
import { Box, Center } from "@chakra-ui/react";
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import CarouselControlsNext from "./CarouselControlsNext";
import CarouselControlsPrev from "./CarouselControlsPrev";

export interface ChakraUICarouselProps {
    items: Array<{
        href: string
        src: string
        alt: string}>
}

export default function ChakraUICarousel({ items }: ChakraUICarouselProps){

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };
    return (
        <Center background={'white'}>

            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                nextIcon={<CarouselControlsNext/>}
                prevIcon={<CarouselControlsPrev/>}
                interval={2000}
            >

                { items.map((item) =>
                    (<Carousel.Item>
                        <Center height={'200px'} width={'900px'}>
                            <a href={item.href} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                                <Image
                                    className="d-block"
                                    style={{height : "100%"}}
                                    src={item.src}
                                    alt={item.alt}
                                />
                            </a>
                        </Center>
                    </Carousel.Item>)
                ) }


                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://kingdomfood.sg/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/I_m-Kim-Korean-BBQ-Logo.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.gohyeowseng.com.sg/index.php"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/GYS-Logo.jpg"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://shopee.sg/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/02/kisspng-logo-brand-font-shopee-5b4720246c7c03.5906172915313879404444.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.dsta.gov.sg/home"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/DSTA-Logo10775.gif"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.nss.org.sg/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/NSS-Logo-high-res-2.jpeg"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.instagram.com/ntupeerhelpers/?hl=en"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/download.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://vercel.com/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/Background-2.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"http://activered.sg/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/active-red.jpg"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.activezone.sg/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/active-zone.jpg"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://brightsparks.com.sg/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/brightsparks_logo_color-1.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.bbqwholesale.com/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/High-Res-BBQ-Party-Wholesale-Centre.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://mgplabel.com/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/mgp-logo.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://kokanoodles.com/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/KOKA-logo-red.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>

                <Carousel.Item>
                    <Center height={'200px'} width={'900px'}>
                        <a href={"https://www.chipguanheng.com/"} style={{justifyContent: 'center', justifyItems: 'center', height : "100%", maxWidth: "50%"}}>
                            <img
                                className="d-block"
                                style={{height : "100%"}}
                                src="https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/Chip-Guan-Heng-Logo.png"
                            />
                        </a>
                    </Center>
                </Carousel.Item>




            </Carousel>
        </Center>

    );
}






// {
//
//     return (
//         <Box maxWidth={'50%'}>
//             <carousel>
//                 <carousel.Item>
//                     <Image src={'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/xorex-logo.jpg'}/>
//                 </carousel.Item>
//                 <carousel.Item>
//                     <Image src={'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/01/I_m-Kim-Korean-BBQ-Logo.png'}/>
//                 </carousel.Item>
//             </carousel>
//         </Box>
//     )
// }