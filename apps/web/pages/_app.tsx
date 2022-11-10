import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { Layout, NavBarProps, FooterProps } from 'ui'

export default function App({ Component, pageProps }: AppProps) {
    const navbarProps: NavBarProps = {
        links: [
            { label: "Home", href: "/" },
            { label: "Academics", href: "/academics" },
            { label: "Events", href: "/events" },
            { label: "Sponsors", href: "/sponsors" },
            { label: "Contact", href: "/contact" },
            { label: "blog", href: "/blog" },
        ],
        logoProps: {
            src: '/scse-logo.png',
            alt: 'scse logo',
            text: 'NTU School of Computer Science & Engineering Club'
        }
    }
    const footerProps: FooterProps = {
        links: [
            { label: "home", href: "/" , position: 12 },
            { label: "acads", href: "/acads", position: 13 },
            { label: "events", href: "/events", position: 14 },
            { label: "sponsors", href: "/sponsors", position: 15 },
            { label: "contact us", href: "/contact-us", position: 16 },
        ],
        vercelpoweredProps: {
            href: 'https://vercel.com/?utm_source=cse-it&&utm_campaign=oss',
            src: '/powered-by-vercel.svg',
            alt: 'Powered by Vercel Branding',
            width: 155,
            height: 155
        },
    }

    return (
        <ChakraProvider>
            <Layout navbarProps={navbarProps} footerProps={footerProps}>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    )
}
