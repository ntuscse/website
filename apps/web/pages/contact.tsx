import { Map, MapProps } from "ui";
import { Heading, Box, Text, Link, Grid, GridItem } from '@chakra-ui/react';

const Contact = () => {
    const mapProps: MapProps = {
        title: "Nanyang Technological University"
    }
    return (
        <div>
            <Box px="20px" pb={ { base:'10px', md:'50px' } } pt={ { base:'50px' , md:'100px' } } textAlign="center">
                <Heading
                    as="h1"
                    size='xl'
                    textTransform="uppercase"
                    fontWeight="900"
                    fontFamily="Roboto, Sans-serif"
                >
                    Contact Us
                </Heading>
            </Box>
            <Map title={ mapProps.title }></Map>
            <Box w="100%" px='20px' py={ { base:'40px', md:'80px' } } bg="black">
                <Grid templateColumns={ { base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' } } maxW="1140px" mx='auto'>
                    <GridItem p='20px' pb={ { base:'30px', md:'20px' } } textAlign={ { base:'center', md:'left' } }>
                        <Heading as="h4" size='lg' color='white' mb={ { base:'5px', md:'20px' } }>Email</Heading>
                        <Link color='white'>cse-it@e.ntu.edu.sg</Link>
                    </GridItem>
                    <GridItem p='20px' pb={ { base:'30px', md:'20px' } } textAlign={ { base:'center', md:'left' } }>
                        <Heading as="h4" size='lg' color='white' mb={ { base:'5px', md:'20px' } }>Phone</Heading>
                        <Text color='white'>+99 99999999</Text>
                    </GridItem>
                    <GridItem p='20px' pb={ { base:'30px', md:'20px' } } textAlign={ { base:'center', md:'left' } }>
                        <Heading as="h4" size='lg' color='white' mb={ { base:'5px', md:'20px' } }>Address</Heading>
                        <Text color='white'>NTU, Singapore</Text>
                    </GridItem>
                </Grid>
            </Box>
            <Box py={ { base:'40px', md:'80px' } } textAlign="center" px='20px'>
                <Heading
                    as="h2"
                    size={ { base:'md', md:'lg' } }
                    textTransform="uppercase"
                    fontWeight="900"
                    fontFamily="Roboto, Sans-serif"
                >
                    Frequently Asked Questions
                </Heading>
            </Box>
        </div>
    )
}

export default Contact