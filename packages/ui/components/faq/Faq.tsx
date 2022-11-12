import Qna, { QnaProps } from "./Qna"
import { Grid, Center, Heading, Flex } from '@chakra-ui/react'

export interface FaqProps{
    qnaProps: QnaProps
}

export const Faq = ({ qnaProps }: FaqProps) => {

    return (
        <Center
            paddingLeft={['5px', '20px']}
            paddingRight={['5px', '20px']}
            paddingTop={['20px', '80px']}
            paddingBottom={['20px', '80px']}>
            <Flex
                borderColor='red'
                flexDirection={'column'}
                padding={{ base: '5px', lg: '10px' }}
                marginLeft={['0%', '5%']}
                marginRight={['0%', '5%']}
                // marginLeft={{ base: '6%', lg: '10%' }}
                // marginRight={{ base: '6%', lg: '10%' }}
            >
                <Heading
                    textAlign={'center'}
                    padding={'20px'}
                    marginBottom={'20px'}
                    fontSize={'3xl'}
                    as={'b'}>
                    Frequently Asked Questions
                </Heading>
                <Grid
                    justifyItems={'center'}
                    templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}

                >
                    <Qna items={qnaProps.items}/>
                </Grid>
            </Flex>
        </Center>
    )
}