import React from "react";
import "./Logo.scss";
import Image from 'next/image'

interface SCSEImageProps {
  classname: string;
}

const SCSEImage = ({ classname }: SCSEImageProps) => {
  return (
    <div className={classname}>
      <Image src="/assets/scse-logo.png" alt="SCSE Logo" />
    </div>
  );
};

export const SCSEIcon = () => <SCSEImage classname="scse-icon" />;
export const SCSELogo = () => <SCSEImage classname="scse-logo" />;
