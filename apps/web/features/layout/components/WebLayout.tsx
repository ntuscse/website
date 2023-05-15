import React from "react";
import { FooterProps, Layout, NavBarProps } from "ui";

interface WebLayoutProps {
  children: React.ReactNode
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  const navbarProps: NavBarProps = {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Academics", href: "/academics" },
      { label: "Learn", href: "/learn" },
      { label: "Sponsors", href: "/sponsors" },
    ],
    logoProps: {
      src: "/scse-logo.png",
      alt: "scse logo",
    },
  };
  const footerProps: FooterProps = {
    links: [
      { label: "Home", href: "/", position: 12 },
      { label: "Academics", href: "/academics", position: 13 },
      { label: "Events", href: "/events", position: 14 },
      { label: "Sponsors", href: "/sponsors", position: 15 },
      { label: "Contact", href: "/contact", position: 16 },
    ],
    vercelpoweredProps: {
      href: "https://vercel.com/?utm_source=cse-it&&utm_campaign=oss",
      src: "/powered-by-vercel.svg",
      alt: "Powered by Vercel Branding",
      width: 155,
      height: 155,
    },
  };

  return (
    <Layout navbarProps={navbarProps} footerProps={footerProps}>
      {children}
    </Layout>
  )
};
