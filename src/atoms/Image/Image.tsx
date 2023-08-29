import { FC } from "react";

interface ImageProps {
  src: string | number;
  className?: string;
  alt?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => {
  const getImageUrl = (imageId: string | number, imageFormat: string = "jpeg") => {
    const supportedFormats = ["jpeg", "jpg", "png", "svg"];
    const format = supportedFormats.includes(imageFormat) ? imageFormat : "jpeg";
    return new URL(`../../assets/${imageId}.${format}`, import.meta.url).href;
  };
  
  return (
    <>
      <img src={getImageUrl(src)} alt={alt || "Pizza"} className={className} srcSet={getImageUrl(src)} />
    </>
  );
};

export default Image;
