import Qna, { QnaProps } from './Qna';
import  { Flex, Center, Heading } from "@chakra-ui/react";

export interface FaqProps{
    qnaProps: QnaProps
}

export function Faq({ qnaProps }: FaqProps){
    return (
        <Center
            paddingLeft={'20px'}
            paddingRight={'20px'}
            paddingTop={'80px'}
            paddingBottom={'80px'}>
            <Flex
                borderColor='red'
                flexDirection={'column'}
                padding={{ base: '10px', lg: '20px' }}
                marginLeft={{ base: '6%', lg: '10%' }}
                marginRight={{ base: '6%', lg: '10%' }}
            >
                <Heading
                    textAlign={'center'}
                    padding={'20px'}
                    marginBottom={'20px'}
                    fontSize={'3xl'}
                    as={'b'}>
                    Frequently Asked Questions
                </Heading>
                <Flex
                    flexDirection={'row'}
                    justifyContent={'center'}
                    flexGrow={'wrap'}
                    flexFlow={'row wrap'}
                >
                    <Qna items={qnaProps.items}/>
                </Flex>
            </Flex>
        </Center>
    )
}
