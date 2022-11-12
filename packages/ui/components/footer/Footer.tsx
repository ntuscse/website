import { Flex, VStack, Box } from "@chakra-ui/react";
import { FooterLink } from "./FooterLink";
import { VercelPowered, VercelPoweredProps } from 'ui';

export interface FooterProps {
  links: Array<{
    label: string;
    href: string;
    position: number;
  }>;
  vercelpoweredProps: VercelPoweredProps;
}

export const Footer = ({ links, vercelpoweredProps }: FooterProps) => {
  return (
      <VStack
          bg='black'
          py={{ base:'50px', md:'5px' }}
          px={{ base:'5px', md:'70px' }}
      >
        {/* Main Footer */}
        <Flex
            w='100%'
            py='10px'
            flexDir={{ base:"column", md:"row" }}
            justifyContent="space-between"
            alignItems="center"
        >
          {/* Vercel Tag */}
          <Box pt={ { base:"10px" } } pb={ { base:"30px" } }>
            <Flex justifyContent={{ base:'center', md:'flex-start' }} alignItems='center'>
              <VercelPowered {...vercelpoweredProps} />
            </Flex>
          </Box>
          {/* Footer Links Container */}
          <Flex alignSelf={ { md:"center" } }
                justifySelf={ { md:"flex-end" } }
                flexDir={ { base:'column', md:'row' } }
          >
            {/* Footer Links */}
            { links.map(link => (
                <Box key={ link.label }
                     textAlign="center"
                     pl={ { base:"0px", md:"40px" } }
                     py={ { base:"10px" } }
                >
                  <FooterLink href={ link.href } label={ link.label } />
                </Box>
            ))}
          </Flex>
        </Flex>
      </VStack>
  )
}