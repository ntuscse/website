import { NavBarProps, FooterProps } from "ui";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export interface Response {
  docs: Doc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Doc {
  id: string;
  title: string;
  layout: NavbarLayout[] | FooterLayout[];
  slug: string;
  status: string;
  _status: string;
  createdAt: string;
  updatedAt: string;
}

export interface NavbarLayout {
  logo: Logo;
  navItems: Array<{
    label: string;
    id: string;
    subnavItems: Array<{
      subnavTitle: string;
      url: string;
      id: string;
    }>
  }>;
  status: string;
  id: string;
  blockType: string;
}

export interface FooterLayout {
  id: string;
  blockType: string;
  sections: FooterSection[];
}

export interface FooterSection {
  sectionTitle: string;
  links: Array<{
    linkName: string;
    url: string;
    id: string;
  }>;
  id: string;
}

export interface Logo {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export const vercelPoweredProps = {
    href: "https://vercel.com/?utm_source=cse-it&&utm_campaign=oss",
    src: "/powered-by-vercel.svg",
    alt: "Powered by Vercel Branding",
    width: 155,
    height: 155,
}

export const defaultLogoProps = {
  src: "/scse-logo/scse-logo-red.png",
  alt: "scse logo",
}

export const defaultSocialLinks = [
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
]

export const defaultFooterProps: FooterProps = {
    logoProps: defaultLogoProps,
    socialLinks: defaultSocialLinks,
    linkGroup: [
      {
        title: "For Students",
        linkGroup: [
          { label: "Academics", href: "/academics" },
          { label: "Feedback", href: "/contact" },
        ],
      },
      {
        title: "For Companies",
        linkGroup: [
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    vercelPoweredProps: vercelPoweredProps,
  };


export const defaultNavbarProps: NavBarProps = {
    links: [
      { label: "Home", href: "/" },
      { label: "Academics", href: "/academics" },
    ],
    logoProps: {
      src: "/scse-logo/scse-logo-blue.png",
      alt: "scse logo",
    },
  };
