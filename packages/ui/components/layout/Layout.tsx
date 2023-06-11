import React from "react";
import { Box } from "@chakra-ui/react";
import { NavBar, Footer, NavBarProps, FooterProps } from "ui";

interface LayoutProps {
  navbarProps: NavBarProps;
  footerProps: FooterProps;
  children: React.ReactNode;
}

export const Layout = ({ navbarProps, footerProps, children }: LayoutProps) => {
  return (
    <>
      <header> 
        <title>NTU School of Computer Science & Engineering</title>
        <link rel="icon" href="/"></link>
      </header>

      <NavBar links={navbarProps.links} logoProps={navbarProps.logoProps} />
      <main>
        <Box bg="brand.blackAlpha.light" minH="91.7vh">{children}</Box>
      </main>
      <Footer
        links={footerProps.links}
        vercelpoweredProps={footerProps.vercelpoweredProps}
      />
    </>
  );
};
