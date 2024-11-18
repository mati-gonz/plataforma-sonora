// src/utils/soundUtils.ts
import elemento1 from "../assets/elemento1.png";
import elemento2 from "../assets/elemento2.png";
import elemento3 from "../assets/elemento3.png";
import elemento4 from "../assets/elemento4.png";

export const getImageForSound = (soundIndex: number): string => {
  const images = [elemento1, elemento2, elemento3, elemento4];
  return images[soundIndex % images.length];
};
