import {Grid, GridItem, Text} from "@chakra-ui/react";

export interface FooterProps {

}

export const Footer = ({}: FooterProps) => {
  const footerData = [
    {label: 'Home', href: '/'},
    {label: 'Academics', href: '/'},
    {label: 'Events', href: '/'},
    {label: 'Sponsors', href: '/'},
    {label: 'Contact', href: '/'},
  ]

  return <Grid bg="black" templateColumns='repeat(5, 1fr)' gap={6}>
    {footerData.map(element => (
        <GridItem py={2} px={4}>
          <Text color="white" textAlign="center">
            {element.label}
          </Text>
        </GridItem>
    ))}
  </Grid>
}
