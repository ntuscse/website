import { Button, Text } from "@chakra-ui/react";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { ButtonOptions } from "@chakra-ui/button";

export interface ButtonLinkProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps<"Button"> {
  label: string;
  href: string;
  variant?: "primary-blue" | "primary-black";
}

export const ButtonLink = (props: ButtonLinkProps) => {
  const { label, href, variant='primary-blue', ...buttonProps } = props
  return (
      <Button as='a' variant = { variant } href = { href } { ...buttonProps }>
        <Text>{ label }</Text>
      </Button>
  )
}
