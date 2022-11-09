import { Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import { FooterLink } from "./FooterLink";
import { VercelPowered, VercelPoweredProps } from "./VercelPowered";
import { FooterContent, FooterContentProps } from "./FooterContent";

export interface FooterProps {
  links: Array<{
    label: string;
    href: string;
    position: number;
  }>
  vercelpoweredProps: VercelPoweredProps;
  footercontentProps: FooterContentProps;
}

export const Footer = ({ links, vercelpoweredProps, footercontentProps }: FooterProps) => {
  return (
      <VStack bg='black' py={ { base:'10px', md:'5px' } } px={ { base:'5px', md:'30px' } }>
        <FooterContent
            contentType={footercontentProps.contentType}
            href={footercontentProps.href}
            ctaTitle={footercontentProps.ctaTitle}
            btnText={footercontentProps.btnText}
            alerts={footercontentProps.alerts}
        />
        <Grid w='100%' py='10px' templateColumns={ { base: 'repeat(1, 1fr)', md: 'repeat(14, 1fr)' } } gap={4}>
          <GridItem colSpan={ { base:1, md: 5 } }>
            <Flex justifyContent={ { base:'center', md:'flex-start' } } alignItems='center'>
              <VercelPowered
                  href={vercelpoweredProps.href}
                  src={vercelpoweredProps.src}
                  alt={vercelpoweredProps.alt}
                  width={vercelpoweredProps.width}
                  height={vercelpoweredProps.height}
              />
            </Flex>
          </GridItem>
          { links.map(link => (
              <GridItem textAlign="center" colStart={ { base:1, md:link.position } }>
                <FooterLink href={link.href} label={link.label} />
              </GridItem>
          ))}
        </Grid>
      </VStack>
  )
}
