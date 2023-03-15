import { Hero, HeroProps } from "ui";

export const HomeHero = () => {
  const heroProps: HeroProps = {
    backgroundImage: "/heroes/scse-club-banner.png",
    backgroundGradient: "linear(to-r, whiteAlpha.500, whiteAlpha.500)",
    text: "WELCOME TO SCSE CLUB",
    buttons: [
      {
        label: "LEARN MORE",
        href: "/events",
        variant: "primary-blue",
      },
      {
        label: "CONTACT US",
        href: "/contact",
        variant: "primary-black",
      },
    ],
  };

  return (
    <Hero {...heroProps} />
  );
};
