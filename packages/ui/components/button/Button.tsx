import { Button as BaseButton, Link, Text } from "@chakra-ui/react";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { ButtonOptions } from "@chakra-ui/button";

export interface ButtonProps extends HTMLChakraProps<"button">, ButtonOptions, ThemingProps<"Button"> {
    label: string
    href: string
    buttonType?: 'primary.blue' | 'primary.black'
}

export const Button = ({ buttonType='primary.blue', ...props }: ButtonProps) => {
    switch (buttonType) {
        case 'primary.black':
            return <PrimaryBlackButton {...props} />
        default:
            return <PrimaryBlueButton {...props} />
  }
}

// Different Button Styles
const PrimaryBlueButton = ({ label, href, ...props }: ButtonProps) => {
  return (
      <BaseButton
          key={ label }
          size='lg'
          rounded='none'
          bg='blue.600'
          color='white'
          _hover={{ bg: 'white', color: 'black' }}
          fontFamily="Verdana Light"
          px={ 12 }
          py={ 8 }
          { ...props }>
          <Link href={ href } _hover={{ textDecoration: 'none' }}>
              <Text>{ label }</Text>
          </Link>
      </BaseButton>
  )
}
const PrimaryBlackButton = ({ label, href, ...props }: ButtonProps) => {
  return (
      <BaseButton
          key={ label }
          size='lg'
          rounded='none'
          bg='black'
          color='white'
          _hover={{ bg: 'white', color: 'black' }}
          fontFamily="Verdana Light"
          px={ 12 }
          py={ 8 }
          { ...props } >
          <Link href={ href } _hover={{ textDecoration: 'none' }}>
            <Text>{ label }</Text>
          </Link>
      </BaseButton>
  )
}