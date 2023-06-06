import { FooterProps, NavBarProps } from "ui";

export const getMockNavProps = (): NavBarProps => {
  return {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Academics", href: "/academics" },
      { label: "Learn", href: "/learn" },
      { label: "Sponsors", href: "/sponsors" },
    ],
    logoProps: {
      src: "/scse-logo/scse-logo-blue.png",
      alt: "scse logo",
    },
  };
};

export const getMockFooterProps = (): FooterProps => {
  return {
    logoProps: {
      src: "/scse-logo/scse-logo-red.png",
      alt: "scse logo",
    },
    socialLinks: [
      {
        name: "Instagram",
        icon: "",
        href: "https://www.instagram.com/ntuscseclub/",
      },
      {
        name: "LinkedIn",
        icon: "",
        href: "https://sg.linkedin.com/company/ntu-scseclub",
      },
      { name: "GitHub", icon: "", href: "https://github.com/ntuscse" },
    ],
    studentLinksGroup: {
      header: "For Students",
      links: [
        { label: "Academics", href: "/academics" },
        { label: "Events", href: "/events" },
        { label: "Join a Subcommittee", href: "/join" },
        { label: "Learn", href: "/learn" },
        { label: "Feedback", href: "/contact" },
      ],
    },
    companyLinksGroup: {
      header: "For Companies",
      links: [
        { label: "Sponsor Us", href: "/sponsors" },
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
};
