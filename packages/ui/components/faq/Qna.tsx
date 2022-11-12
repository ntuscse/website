import { Text, Flex, Heading } from "@chakra-ui/react";
export interface QnaProps{
    items: Array<{
        question: string
        answer: string
    }>
}
function qna({ items }: QnaProps){
    const defaultQuestion='What is the level required?';
    const defaultAnswer=`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or
     web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have.`;

    return (
        <>
            {items.map((item) =>
                (<Flex
                        borderColor={'blue'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        marginBottom={'30px'}
                        padding={['5px', '15px']}
                    >
                        <Heading textAlign={'left'} fontSize={'2xl'} as={'b'}
                                 marginBottom={'10px'}>{item.question ? item.question : defaultQuestion}</Heading>
                        <Text textAlign={'left'} fontSize={'l'} lineHeight={'2em'}
                              letterSpacing={'0.8px'}>{item.answer ? item.answer : defaultAnswer}</Text>
                    </Flex>

                ))
            }
        </>
    )
}
export default qna
