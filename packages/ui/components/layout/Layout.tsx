import { NavBar } from '../navbar'
import React from "react";
import { NavBarProps } from "../navbar/NavBar";

interface LayoutProps {
    navbarProps: NavBarProps
    children: React.ReactNode
}

export const Layout = ({ navbarProps, children }: LayoutProps) => {
    return (
        <>
            <header>
                <title>NTU School of Computer Science & Engineering</title>
                <link rel="icon" href='/'></link>
            </header>

            <NavBar links={navbarProps.links} logoProps={navbarProps.logoProps} />
            <main>{children}</main>
        </>
    )
}
