import React from "react";
import payload from "payload";

export class RenderCellFactory {

  static get(element: unknown, key: string) {
    console.log(key)
    if (element[key] == undefined) {
      payload.logger.error(`Attribute ${key} cannot be found in element ${element.toString()}`);
      return null;
    }

    const isImageUrl = new RegExp("http(s?):\\/\\/.*.(jpg|png|jpeg)$");
    if (isImageUrl.test((element[key] as string).toString())) {
      const ImageComponent: React.FC<{children?: React.ReactNode}> = ({ children }) => (
        <span>
          <img src={children.toString()} alt="image of object"/>
        </span>
      );
      const ImageComponentCell = (row, data) => <ImageComponent>{data}</ImageComponent>;
      console.log("image")
      return ImageComponentCell;
    }

    if (typeof element[key] == 'object') {
      const DateComponent: React.FC<{children?: React.ReactNode}> = ({ children }) => (
        <span>
          {(children as unknown as Date).toDateString()}
        </span>
      );
      const DateComponentCell = (row, data) => <DateComponent>{data}</DateComponent>;
      console.log("date")
      return DateComponentCell
    }

    const TextComponent: React.FC<{children?: React.ReactNode}> = ({ children }) => (
      <span>
      {children}
    </span>
    );
    const TextComponentCell = (row, data) => <TextComponent>{data}</TextComponent>;
    console.log("text")
    return TextComponentCell
  }
}
