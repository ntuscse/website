import { BlogCard, FooterContentButton, Hero, HeroProps } from "ui";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { blogsData } from "@/pages/api/blogs";

const Home = () => {
    const heroProps: HeroProps = {
        backgroundImage: '/banners/scse-club-banner.png',
        backgroundGradient: 'linear(to-r, whiteAlpha.500, whiteAlpha.500)',
        text: 'WELCOME TO SCSE CLUB',
        buttons: [
            {
                label: 'LEARN MORE',
                href: '/events',
                buttonType: 'primary.blue'
            },
            {
                label: 'CONTACT US',
                href: '/contact',
                buttonType: 'primary.black'
            }
        ]
    }

    return (
        <>
            <Hero { ...heroProps } />
            <VStack mx={{ base: 5, lg: 10 }}>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
                    gap={ 12 }
                    pt={ 12 }
                    pb={ 32 }>
                    { blogsData.map(blogCardProps => (
                        <GridItem key={ blogCardProps.blogCardContentProps.title }>
                            <BlogCard { ...blogCardProps } />
                        </GridItem>))}
                </Grid>
            </VStack>
            <FooterContentButton href="./contact" label="Contact Us" title="Let’s work together or Need Help"/>
        </>
    )
}

export default Home