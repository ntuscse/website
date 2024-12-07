import React from "react";
import { FooterProps, Layout, NavBarProps } from "ui";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

interface WebLayoutProps {
  children: React.ReactNode;
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  const navbarProps: NavBarProps = {
    links: [
      { label: "Home", href: "/" },
      // { label: "About", href: "/about" },
      // { label: "Events", href: "/events" },
      { label: "Academics", href: "/academics" },
      // { label: "Learn", href: "/learn" },
      // { label: "Sponsors", href: "/sponsors" },
      // { label: "Merch", href: "/merch" },
    ],
    logoProps: {
      src: "/scse-logo/scse-logo-blue.png",
      alt: "SCDS logo",
    },
  };
  const footerProps: FooterProps = {
    logoProps: {
      src: "/scse-logo/scse-logo-red.png",
      alt: "SCDS logo",
    },
    socialLinks: [
      {
        name: "Instagram",
        icon: FaInstagram,
        href: "https://www.instagram.com/ntuscseclub/",
      },
      {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "https://sg.linkedin.com/company/ntu-scseclub",
      },
      { name: "GitHub", icon: FaGithub, href: "https://github.com/ntuscse" },
    ],
    studentLinksGroup: {
      header: "For Students",
      links: [
        { label: "Academics", href: "/academics" },
        // { label: "Events", href: "/events" },
        // { label: "Join a Subcommittee", href: "/join" },
        // { label: "Learn", href: "/learn" },
        { label: "Feedback", href: "/contact" },
      ],
    },
    companyLinksGroup: {
      header: "For Companies",
      links: [
        // { label: "Sponsor Us", href: "/sponsors" },
        { label: "Contact", href: "/contact" },
      ],
    },
    vercelPoweredProps: {
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
  );
};
