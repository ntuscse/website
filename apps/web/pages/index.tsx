import {
  HomeHero,
  HomeWhoRWe,
  //UpcomingEventRibbon
} from "@/features/home";
// import { HomeMemories } from "@/features/home";
import { FooterSeparator } from "ui";
import React from "react";

const dummy = {
    "title": "Hello World",
    "image": {
      "id": "66801d772a7ac0d89ead1450",
      "alt": "dog",
      "filename": "thumbnail.jpeg",
      "mimeType": "image/jpeg",
      "filesize": 167981,
      "width": 1200,
      "height": 800,
      "createdAt": "2024-06-29T14:43:03.665Z",
      "updatedAt": "2024-06-29T14:43:03.665Z",
      "url": "http://localhost:3003/media/thumbnail.jpeg"
    },
    "description": "You are one click away!",
    "id": "66801cd7f5279992997aba78",
    "blockType": "hero"
  }

const Home = () => {
  return (
    <>
      <HomeHero {...dummy}/>
      <HomeWhoRWe />
      {/*<HomeMemories />*/}
      <FooterSeparator />
      {/*<UpcomingEventRibbon href={"/events"} />*/}
    </>
  );
};

export default Home;
