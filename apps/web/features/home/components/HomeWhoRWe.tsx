import { FramedText } from "ui";
import { Text, Grid, GridItem, Box, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";

export const HomeWhoRWe = () => {
  return(
    <>
      {/*Heading*/}
      <Flex justifyContent='center' direction={"column"} alignItems={'center'} my={'3rem'}>
        <FramedText text={'Who Are We'} textColor={'black'}/>
        <Grid gridTemplateAreas={{
          base: `'image image' 'content content'`,
          md: `'content image' 'content image'`
        }}
              templateColumns = 'repeat(2, 1fr)' gap={'1.5rem'} mx={{ base: '3rem', lg: '6rem' }} maxWidth={'1440px'} >

          {/* Who are we content with the button */}
          <GridItem area={'content'} >
            <Flex direction={'column'} gap={'1rem'} align={'flex-start'} justify={'center'} h='100%'>
              <Text maxWidth={'600px'} fontSize={{ base: '16px', '2xl':'20px' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam aspernatur commodi cupiditate eaque laboriosam maiores quibusdam similique sint sit, vel velit vitae. Amet aspernatur iste minus molestiae, obcaecati voluptates.</Text>
              <Button variant={'red-scse'} size={'md'}>Learn More</Button>
            </Flex>
          </GridItem>

          {/* Who are we Image */}
          <GridItem area={'image'} >
            <Flex justifyContent='center'>
              <Box
                position="relative"
                boxSize={["260px", "350px", "350px", "400px"]}
              >
                <Image
                  src="/home/who_r_we_doodle.svg"
                  alt="who r we image"
                  fill={true}
                />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
