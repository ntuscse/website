import { NavBar } from '../navbar'
import React from "react";

interface LayoutProps {
    children: React.ReactNode,
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header>
                <title>NTU School of Computer Science & Engineering</title>
                <link rel="icon" href='/'></link>
            </header>

            <NavBar />
            <main>{children}</main>
        </>
    )
}
