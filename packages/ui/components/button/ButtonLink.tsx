import { Button as BaseButton, Link, Text } from "@chakra-ui/react";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { ButtonOptions } from "@chakra-ui/button";

export interface ButtonLinkProps extends HTMLChakraProps<"button">, ButtonOptions, ThemingProps<"Button"> {
    label: string
    href: string
    variant?: 'primary-blue' | 'primary-black'
}

export const ButtonLink = (props: ButtonLinkProps) => {
  const { label, href,  variant='primary-blue', ...buttonProps } = props
    return (

      <Link href={ href } _hover={{ textDecoration: 'none' }}>
        <BaseButton
          key={ label }
          variant = { variant }
          { ...buttonProps }>
          <Text>{ label }</Text>
        </BaseButton>
      </Link>

    )
}
