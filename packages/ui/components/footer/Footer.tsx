import { Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import { FooterLink } from "./FooterLink";
import { VercelPowered, VercelPoweredProps } from "./VercelPowered";
import { FooterContentButton, FooterContentButtonProps } from "./FooterContentButton";
import { FooterContentText, FooterContentTextProps } from "./FooterContentText";

export interface FooterProps {
  links: Array<{
    label: string;
    href: string;
    position: number;
  }>;
  vercelpoweredProps: VercelPoweredProps;
  footerContentButtonProps?: FooterContentButtonProps;
  footerContentTextProps?: FooterContentTextProps;
}

export const Footer = ({ links, vercelpoweredProps, footerContentButtonProps, footerContentTextProps }: FooterProps) => {
  return (
      <VStack bg='black' py={{ base:'10px', md:'5px' }} px={{ base:'5px', md:'30px' }}>
        {/* Footer Content */}
        { footerContentTextProps && <FooterContentText { ...footerContentTextProps } /> }
        { footerContentButtonProps && <FooterContentButton {...footerContentButtonProps} /> }

        {/* Main Footer */}
        <Grid w='100%' py='10px' templateColumns={ { base: 'repeat(1, 1fr)', md: 'repeat(14, 1fr)' } } gap={ 4 }>
          {/* Vercel Tag */}
          <GridItem colSpan={ { base:1, md: 5 } }>
            <Flex justifyContent={{ base:'center', md:'flex-start' }} alignItems='center'>
              <VercelPowered
                  href={ vercelpoweredProps.href }
                  src={ vercelpoweredProps.src }
                  alt={ vercelpoweredProps.alt }
                  width={ vercelpoweredProps.width }
                  height={ vercelpoweredProps.height }
              />
            </Flex>
          </GridItem>

          {/* Footer Links */}
          { links.map(link => (
              <GridItem key={ link.label } textAlign="center" colStart={{ base:1, md:link.position }}>
                <FooterLink href={ link.href } label={ link.label } />
              </GridItem>
          ))}
        </Grid>
      </VStack>
  )
}