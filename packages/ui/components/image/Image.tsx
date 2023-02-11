import React, { useState, useEffect } from 'react'
import { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends NextImageProps {}

export const Image = (props: ImageProps) => {
  const { src, alt, width, height, ...nextImageProps } = props;
  const [ImageComponent, setImageComponent] = useState<React.ElementType | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.document.querySelector('#__next')) {
      void import('next/image').then(({ default: NextImage }) => {
        setImageComponent(() => NextImage)
      })
    } else {
      setImageComponent('img')
    }
  }, [])

  if (ImageComponent == null) {
    return null;
  }
  else if (ImageComponent === 'img') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === 'string' ? src: ''} alt={alt} width={width} height={height} {...nextImageProps} />
  } else {
    return <ImageComponent src={src} alt={alt} width={width} height={height} {...nextImageProps} />
  }
}
