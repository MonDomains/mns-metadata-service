import { createCanvas } from "canvas";
import { BigNumber, ethers } from "ethers";

export const getTokenId = (label: string) => {
  const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label));
  const tokenId =  BigNumber.from(labelHash).toString();
  return tokenId;
}

export const obscureName = (name: string, len: number) => {
  if(getLength(name) > len) {
      return Array.from(name).slice(0, len / 2).join("") + "..." + Array.from(name).slice(name.length - (len / 2), name.length).join("");
  } else {
      return name;
  }
}

export const getLength = (label: string) => { 
  return Array.from(label).length;
}

export function getFontSize(name: string): number { 
  const canvas = createCanvas(1200, 630, 'svg');
  const context = canvas.getContext('2d'); 
  context.font = "80px Satoshi Variable, Noto Color Emoji, Apple Color Emoji, sans-serif"
  const fontMetrics = context.measureText(name);
  const fontSize = Math.floor(80 * (700 / fontMetrics.width));
  return fontSize > 150 ? 150 : fontSize;
}