import { Button, FooterContentText, FooterContentTextProps, Hero } from "ui";
import { Box, Heading, Text, VStack, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";

const Academics = () => {
    const footerContentTextProps: FooterContentTextProps = {
        announcements: [
            {
                title: 'Update 16/12/2019: What we are doing',
                description: 'Our committee aims to improve the quality of PYP and to build a network to help with the improvement of the PYP for years to come. ' +
                    'Not only are we vetting through previous PYP solutions, we are creating a proper platform for students\n' +
                    '\n to inform us of any corrections/adjustments on the solutions. So be prepared!'
            },
            {
                title: 'Update 11/12/2019: Calling for Past Year Paper Solutions!',
                description: 'Hope you are enjoying your holidays! We’re inviting students to write AY19/20 Semester 1 exam solutions (a.k.a PYP solutions). ' +
                    'Your help will be greatly appreciated as the solution(s) will become valuable resources to many future exam\n candidates!'
            }
        ]
    }
    const modules: Array<string> = [
        "CE3006", "CE3007", "CE/CZ4022", "CE/CZ4023", "CE/CZ4064", "CE/CZ4015"
    ]

    return (
        <>
            <Hero backgroundImage='/heroes/academics-banner.png' backgroundGradient='linear(to-r, whiteAlpha.500, whiteAlpha.500)' />
            <VStack
                mx={{ base: 5, lg: 10 }}
                mb={ 12 }
                p={ 5 }
                spacing={ 12 }>
                <Heading p={ 5 }>
                    LINKS TO PYPs
                </Heading>

                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={ 6 }
                    width={{ base: '100%', md: 'auto' }}>
                    <GridItem>
                        <Button
                            label='PYP QUESTIONS'
                            href='https://ts.ntu.edu.sg/sites/lib-repository/exam-question-papers/_layouts/15/start.aspx#/Shared%20Documents/Forms/AllItems.aspx'
                            width={{ base: '100%', md: 'auto' }}/>
                    </GridItem>
                    <GridItem>
                        <Button
                            label='PYP SOLUTIONS'
                            href='https://bit.ly/3CDVXlf'
                            buttonType='primary.black'
                            width={{ base: '100%', md: 'auto' }}/>
                    </GridItem>
                </Grid>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={ 6 }
                    width={{ base: '100%', md: 'auto' }}>
                    <GridItem justifySelf={{ base: 'center', md: 'flex-end' }}>
                        <Box>
                            <Image
                                src='/neve-web-design-studio-06.jpg'
                                alt='employees working in a studio'
                                width={ 530 }
                                height={ 530 }/>
                        </Box>
                    </GridItem>
                    <GridItem maxWidth={ 530 }>
                        <Text mb={ 30 }>To provide you with better support in the midst of the Covid-19 situation, we will be providing the PYP solutions online. Moreover, we would like your support for the following modules:</Text>
                        { modules.map(module => (
                            <Text key={ module } mb={ 30 }>– { module }</Text>
                        )) }
                        <Text mb={ 30 }>
                            Currently we are not able to provide the complete softcopy version for those modules.
                            If you possess a hardcopy of any of the modules, please contact us for further details on how you can help.
                        </Text>
                    </GridItem>
                </Grid>
            </VStack>
            <FooterContentText { ...footerContentTextProps } />
        </>
    )
}

export default Academics