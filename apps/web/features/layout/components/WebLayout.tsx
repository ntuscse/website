import React, { useState, useEffect } from "react";
import { FooterProps, Layout, NavBarProps } from "ui";
import { LogoProps } from "ui/components/navbar/Logo";
import { MenuLinkProps } from "ui/components/navbar/MenuLink";
import { Response, NavbarLayout, FooterLayout, defaultSocialLinks, defaultLogoProps, vercelPoweredProps, defaultNavbarProps, defaultFooterProps } from "./utils"

interface WebLayoutProps {
  children: React.ReactNode;
}

const NEXT_APP_PAYLOAD_API=process.env.NEXT_PUBLIC_WEB_PAYLOAD_API_URL as string

export const WebLayout = ({ children }: WebLayoutProps) => {

  const [selectedNavbarProps, setNavbarProps] = useState<NavBarProps | null >(null)
  const [selectedFooterProps, setFooterProps] = useState<FooterProps | null >(null)
  const [navbarConfList, setNavbarConfList] = useState<Response|null>()

  const [currentLayout, setCurrentLayout] = useState<string>('');

  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${NEXT_APP_PAYLOAD_API}/navigation`)
      const parsedResponse = await response.json() as Response
      return parsedResponse;
    }
    fetchHandler()
      .then((response) => {setNavbarConfList(response) ; setCurrentLayout(response["docs"][0].id)})
      .catch((err) => {console.error("Fail to fetch navigation bar with error : ", err)})
  } ,[])

  useEffect(() => {
    if (!navbarConfList) return;
    if (!selectedNavbarProps) {
      const selectedConf = navbarConfList.docs[0].layout;
      const links: MenuLinkProps[] = []
      for (let i=0;i<selectedConf.length;i++)
        if (selectedConf[i].blockType === 'navbar') {
          const currentConf = selectedConf[i] as NavbarLayout;
          const logoProps: LogoProps = {
            alt: "CCDS logo",
            src: currentConf.logo.url
          }

          for (let j=0;j<currentConf.navItems.length;j++) {
            const curLink = currentConf.navItems[j].subnavItems
            curLink.map((item) => links.push({ label: item.subnavTitle, href: item.url }))
          }
          setNavbarProps({ links: Array.from(links), logoProps: logoProps })
        } else if (selectedConf[i].blockType === 'footer') {
          const currentConf = selectedConf[i] as FooterLayout;
          const linkGroup = currentConf.sections.map(section => ({
            title: section.sectionTitle,
            linkGroup: section.links.map(link => ({
              label: link.linkName,
              href: link.url,
            }))
          }));
          setFooterProps({
            logoProps: defaultLogoProps,
            socialLinks: defaultSocialLinks,
            linkGroup: linkGroup,
            vercelPoweredProps: vercelPoweredProps,
          })
      }
    }
  }, [navbarConfList, currentLayout, selectedNavbarProps])

  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${NEXT_APP_PAYLOAD_API}/navigation`, { mode: 'no-cors' })
      const parsedResponse = await response.json() as Response;
      return parsedResponse;
    }
    fetchHandler()
      .then((response) => {setNavbarConfList(response)})
      .catch((err) => {console.error("Fail to fetch navigation bar : ", err)})
  } ,[])

  return (
    <Layout navbarProps={ selectedNavbarProps || defaultNavbarProps} footerProps={ selectedFooterProps || defaultFooterProps}>
      {children}
    </Layout>
  );
};
