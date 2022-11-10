import { NavBar } from '../navbar'
import { Footer } from "../footer";
import React from "react";
import { NavBarProps } from "../navbar/NavBar";
import { FooterProps } from "../footer/Footer";

interface LayoutProps {
    navbarProps: NavBarProps
    footerProps: FooterProps
    children: React.ReactNode
}

export const Layout = ({ navbarProps, footerProps, children }: LayoutProps) => {
    return (
        <>
            <header>
                <title>NTU School of Computer Science & Engineering</title>
                <link rel="icon" href='/'></link>
            </header>

            <NavBar links={navbarProps.links} logoProps={navbarProps.logoProps} />
            <main>{children}</main>
            <Footer links={footerProps.links} vercelpoweredProps={footerProps.vercelpoweredProps}/>
        </>
    )
}
