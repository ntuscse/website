import React from 'react';
import { GalleryGrid } from 'ui/components/gallery-grid/index';
import { photoGalleryData } from '../api/photoGalleryData';

const HomePhotoGallery = () => {
  return (
    <GalleryGrid title= { photoGalleryData.title }  images={ photoGalleryData.images }/>
  )
}

export default HomePhotoGallery