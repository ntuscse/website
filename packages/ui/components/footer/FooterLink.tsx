import { Link } from "@chakra-ui/react";

export interface FooterLinkProps {
    href: string
    label: string
}

export const FooterLink = ({ href, label }: FooterLinkProps) => {
    return (
        <Link fontWeight='bold' textAlign="center" color='white' href={href} _hover={{ color:'blue.500' }}>
            {label}
        </Link>
    )
}