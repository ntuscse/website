import { HomeHero, HomeWhoRWe, UpcomingEventRibbon } from "@/features/home";
import { HomeMemories } from "@/features/home";
import { FooterSeparator } from "ui";
import React from "react";

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeWhoRWe />
      <HomeMemories />
      <FooterSeparator />
      <UpcomingEventRibbon href={"/events"} />
    </>
  );
};

export default Home;
