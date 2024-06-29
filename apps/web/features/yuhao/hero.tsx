import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js
import styles from './hero.module.css';


interface Image {
  id: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface HeroBlock {
  title: string;
  image: Image;
  description: string;
  id: string;
  blockType: 'hero';
}

const Hero = ({ title, image, description, id, blockType }: HeroBlock) => {
  return (
    <section className={styles.hero} id={id}>
      <div className={styles['hero-content']}>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={styles['hero-image']}>
          <Image
            src={image.url}
            alt={image.alt ?? ""}
            width={image.width}
            height={image.height}
          />
        </div>
        <div className={styles['hero-metadata']}>
          <p>Block Type: {blockType}</p>
          <p>Image ID: {image.id}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
