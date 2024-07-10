import React from "react";
import Hero, { HeroBlock } from "@/features/yuhao/hero";
import TwoColumns, { TwoColumnsBlock } from "@/features/yuhao/two-column";

// const dummy = {
//   "title": "Hello World",
//   "image": {
//     "id": "66801d772a7ac0d89ead1450",
//     "alt": "dog",
//     "filename": "thumbnail.jpeg",
//     "mimeType": "image/jpeg",
//     "filesize": 167981,
//     "width": 1200,
//     "height": 800,
//     "createdAt": "2024-06-29T14:43:03.665Z",
//     "updatedAt": "2024-06-29T14:43:03.665Z",
//     "url": "http://localhost:3003/media/thumbnail.jpeg"
//   },
//   "description": "You are one click away!",
//   "id": "66801cd7f5279992997aba78",
//   "blockType": "hero"
// }


interface HomePage {
  id: string;
  title: string;
  layout: [
    HeroBlock,
    TwoColumnsBlock,
  ];
  slug: string;
  status: string;
  _status: string;
  createdAt: string;
  updatedAt: string;
}



export const getStaticProps: () => Promise<{ revalidate: number; props: { heroData: HomePage } } | {
  props: { heroData: null }
}> = async () => {
  try {
    // Replace this URL with your actual API endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_PAYLOAD_API_URL}/pages/66801dee2a7ac0d89ead1460`);
    const heroData = await res.json() as HomePage;
    console.log("hero data", heroData);
    return {
      props: {
        heroData,
      },
      // Optionally, specify a revalidation period in seconds
      revalidate: 60, // revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Failed to fetch hero data:', error);
    return {
      props: {
        heroData: null, // or you could return a default/fallback data
      },
    };
  }
};


const Home = ({ heroData }: {heroData: HomePage}) => {
  const heroBlock = heroData.layout.find(block => block.blockType === 'hero') as HeroBlock;
  const twoColumnBlock = heroData.layout.find(block => block.blockType === 'two-columns') as TwoColumnsBlock;

  if (!heroBlock) {
    return <div>No hero block found</div>;
  }

  return (
    <>
      <Hero {...heroBlock}/>
      <TwoColumns {...twoColumnBlock}/>
    </>
  );
};

export default Home;
