import { Text, Flex, Heading } from "@chakra-ui/react";

export interface QnaProps{
    question: string
    answer: string
}

export const Qna = ({ question, answer }: QnaProps) => {
    return (
        <Flex
            borderColor='brand.blue'
            justifyContent='center'
            flexDirection='column'
            marginBottom='30px'
            padding={['5px', '15px']}
        >
            <Heading
                textAlign='left'
                fontSize='2xl'
                as='b'
                marginBottom='10px'>
                { question }
            </Heading>
            <Text
                textAlign='left'
                fontSize='l'
                lineHeight='2em'
                letterSpacing='0.8px'>
                { answer }
            </Text>
        </Flex>
    )
}
