import React from "react";
import "./Logo.scss";

interface SCSEImageProps {
  classname: string;
}

const SCSEImage = ({ classname }: SCSEImageProps) => {
  return (
    <div className={classname}>
      <img src="/assets/scse-logo.png" alt="SCSE Logo" />
    </div>
  );
};

export const SCSEIcon = () => <SCSEImage classname="scse-icon" />;
export const SCSELogo = () => <SCSEImage classname="scse-logo" />;