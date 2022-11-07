import { Stack, Flex, Text, VStack, FlexProps, TextProps } from '@chakra-ui/react';
import { Button, ButtonProps } from "ui"

export interface HeroProps extends FlexProps {
    backgroundImage: string
    buttons?: Array<ButtonProps>
    text?: string
    textProps?: TextProps
}

export const Hero = ({ backgroundImage, buttons, text, textProps, ...flexProps }: HeroProps) => {
    return (
        // Background Image
        <Flex
            w='full'
            h='500px'
            backgroundImage={ backgroundImage }
            backgroundSize='cover'
            backgroundPosition='center center'
            { ...flexProps }>
            <VStack
                w='full'
                justify='center'
                px={{ base: 4, md: 8 }}
                bgGradient={ 'linear(to-r, blackAlpha.600, transparent)' }>

                {/* Content */}
                <Stack align='center'
                       justify='center'
                       textAlign='center'
                       spacing={ 6 }
                       width={{ base: '75%', lg: '50%' }}
                       height={{ base: '75%', lg: '50%' }}
                       overflowY='hidden'
                       // White translucent box
                       _before={{ content: '""',
                           bgColor:'white',
                           opacity:'0.4',
                           width: { base: '75%', lg: '50%' },
                           height: { base: '75%', lg: '50%' },
                           position: 'absolute',
                           top: { base: '12.5%', lg: '25%' },
                           right: { base: '12.5%', lg: '25%' }}}>
                    {/* Text */}
                    <Text
                        color='black'
                        fontWeight={ 700 }
                        fontFamily='Verdana'
                        lineHeight={ 1.2 }
                        fontSize={{ base: '32px', md: '48px' }}
                        zIndex={ 1 }
                        { ...textProps }>
                        { text }
                    </Text>
                    {/* Buttons */}
                    <Stack direction={{ base: 'column', md: 'row' }} width='100%' justify='center'>
                        { buttons?.map(button => {
                            const { label, href, buttonType, ...buttonProps } = button;
                            return (
                                <Button
                                    label={ label }
                                    href={ href }
                                    buttonType={ buttonType }
                                    size='lg'
                                    width={{ base: '100%', md: 'auto' }}
                                    { ...buttonProps } />
                            )
                        })}
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}