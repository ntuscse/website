// remove <img> tag with class attribute from text to prevent it from interfering with our custom styling of the img
export const removeTextImgTag = (text: string) => {
  if (text.length === 0) return "";
  if (!text.includes("img class=")) return text; // no <img> tag in text

  const startIndex = text.indexOf("img class=");
  const endIndex = text.indexOf("/>", startIndex);

  // <img> tag in string format
  let imgTagString;
  if (endIndex === -1) {
    // end cannot be seen (might be because the whole sentence is not passed in)
    imgTagString = text.slice(startIndex);
  } else {
    // end is />
    imgTagString = text.slice(startIndex, endIndex + 1);
  }

  // return text without <img> tag
  return text.replace(imgTagString, "");
};
