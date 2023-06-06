import { Box, Link, Text } from "@chakra-ui/react";

export interface FooterLinkProps {
  href: string;
  label: string;
}

export const FooterLink = ({ href, label }: FooterLinkProps) => {
  return (
    <Link
      textAlign="center"
      color="white"
      fontWeight="light"
      href={href}
      _hover={{ color: "brand.red.medium" }}
      data-testid="footer-link"
    >
      {label}
    </Link>
  );
};

/* ----- Footer Links Group ----- */
export interface FooterLinkGroupProps {
  header?: string;
  links: Array<FooterLinkProps>;
}

export const FooterLinkGroup = ({ header, links }: FooterLinkGroupProps) => {
  return (
    <Box py="12px" px={{ base: "24px", md: "28px", lg: "36px" }}>
      <Text
        color="white"
        textDecor="underline"
        fontWeight="semibold"
        mb={{ base: "8px", md: "12px" }}
      >
        {header}
      </Text>

      {links.map((link) => (
        <Box key={link.label} py={{ base: "4px", md: "6px" }}>
          <FooterLink href={link.href} label={link.label} />
        </Box>
      ))}
    </Box>
  );
};
