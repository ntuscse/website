import {
  HomeHero,
  HomeWhoRWe,
  //UpcomingEventRibbon
} from "@/features/home";
// import { HomeMemories } from "@/features/home";
import { FooterSeparator } from "ui";
import React from "react";
import HomePhotoGallery from "@/features/home/components/HomePhotoGallery";

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeWhoRWe />
      <HomePhotoGallery/>
      {/* <HomeMemories /> */}
      <FooterSeparator />
      {/*<UpcomingEventRibbon href={"/events"} />*/}
    </>
  );
};

export default Home;
