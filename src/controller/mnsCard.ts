import { Request, Response } from 'express'; 
import { RESPONSE_TIMEOUT } from '../config'; 
import { ethers } from 'ethers';
import { createCanvas } from 'canvas';
import { CANVAS_FONT_PATH }  from '../config';
import { importFont } from "../utils/importFont";

const fontSatoshiBold = importFont(CANVAS_FONT_PATH, 'font/truetype');
 
const sharp = require("sharp")

export async function mnsCard(req: Request, res: Response) {
  // #swagger.description = 'MNS NFT preview'
  // #swagger.parameters['name'] = { type: 'string', description: 'MNS name.' }
  res.setTimeout(RESPONSE_TIMEOUT, () => {
    res.status(504).json({ message: 'Timeout' });
  });

  const { name } = req.params;

  try {
    if (!name || name.length < 7 || !name.endsWith('.mon')) {
      throw Error(`${name} is not an MNS name.`);
    }
 
      
    const svg = createCardSVGfromTemplate(name);
    const svgBuffer = Buffer.from(svg);
    const image = await sharp({
        create: {
            width: 1200,
            height: 630,
            channels: 4,
            rgba: true,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        }
    }).composite([{
        input: svgBuffer
    }]).jpeg({ quality: 100, progressive: true }).toBuffer();

    
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length,
    }).end(image); 
        
  } catch (error) {
   
    if (!res.headersSent) {
      res.status(404).json({
        message: `Error generating image: ${error}`,
      });
    }
  }
}


export function createCardSVGfromTemplate(name: string) {

    return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="1200" height="630" fill="url(#paint0_linear_0_1)"/>
    <defs>
        <filter id="dropShadow" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feDropShadow dx="1" dy="1" stdDeviation="4" flood-opacity="0.2"/>
        </filter>
    </defs> 
  
    ${Array.from(name).length < 4 ? 
        `<style type="text/css"> 
            svg text#blink {
            animation: stroke 5s infinite alternate;
            stroke-width: 1;
            stroke: #c17efc;
            fill: #b05cf9;
        }
  
        @keyframes stroke {
            0% {
                stroke: #8F7CF7;
                fill: #ffffff;
                stroke-dashoffset: 25%;
                stroke-dasharray: 0 50%;
                stroke-width: 0.8;
            }
  
            50% {
                fill: #ffffff;
                fill: #8F7CF7;
            }
  
            80% {
                fill: rgba(255, 255, 255, 0.8); 
                stroke: rgba(255, 255, 255, 1); 
                stroke-width: 0.8;
            }
  
            100% {
                fill: rgba(255, 255, 255, 1); 
                stroke: rgba(255, 255, 255, 0);
                stroke-dashoffset: -25%;
                stroke-dasharray: 50% 0;
                stroke-width: 0;
            }
        }
  
    @keyframes ailogo {
        0% {
            fill: rgb(254, 217, 16);  
            stroke: rgb(254, 217, 16);  
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 50%;
            stroke-width: 0.3;
        }
  
        50% {
            fill: rgba(255, 255, 255, 0.5);
            stroke: rgba(255, 255, 255, 1); 
        }
  
        80% {
            fill: rgba(255, 255, 255, 0.8);
            stroke: rgba(255, 255, 255, 1); 
            stroke-width: 0.7;
        }
  
        100% {
            fill: rgba(255, 255, 255, 1); 
            stroke: rgba(255, 255, 255, 0);
            stroke-dashoffset: -25%;
            stroke-dasharray: 50% 0;
            stroke-width: 0;
        }
    }
         </style> `: ''
    }
  
    <style type="text/css">
        @font-face { 
          font-family: "Satoshi Variable";
          font-style: normal;
          font-weight: 600 900;
          src: url(${fontSatoshiBold});
        } 
  
        text {
          font-family: 'Satoshi Variable', 'Noto Color Emoji', 'Apple Color Emoji', sans-serif;
          font-style: normal;
          font-weight: 600 900;
          font-variant-numeric: tabular-nums;
          font-weight: bold;
          font-variant-ligatures: none;
          font-feature-settings: "ss01" on, "ss03" on;
          -moz-font-feature-settings: "ss01" on, "ss03" on;
        }
    </style>
    
    <text
    x="1100" 
    y="40" 
    font-size="25" 
    fill="white"
    filter="url(#dropShadow)">${"Monad"}</text> 
  
    <text
    x="24" 
    y="600" 
    font-size="22"  
    fill="white" 
    filter="url(#dropShadow)">#${getTokenId(name)}</text>
  
    <text id="blink"
    x="400" 
    y="350" 
    font-size="${getFontSize( obscureName(name.split(".").shift() || "", 16) + ".mon") }"
    fill="white" 
    filter="url(#dropShadow)">${ obscureName(name.split(".").shift() || "", 16) }.mon</text>
  
    <g opacity="0.63">
        <mask id="mask0_0_1" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="24" y="156" width="351" height="345">
            <rect opacity="0.46" x="24" y="156" width="350.679" height="345" fill="url(#pattern0_0_1)"/>
        </mask>
        <g mask="url(#mask0_0_1)">
            <rect x="-102.358" y="114.827" width="567.901" height="458.58" fill="#B1A4F2"/>
        </g>
    </g>  
  
    <rect x="38.0645" y="27.0159" width="9.86734" height="51.968" fill="white"/>
    <rect x="38.0645" y="27.0159" width="21.3792" height="9.86734" fill="white"/>
    <rect x="38.0645" y="69.1167" width="21.3792" height="9.86734" fill="white"/>
    <rect x="89.7036" y="78.9841" width="9.86734" height="51.968" transform="rotate(180 89.7036 78.9841)" fill="white"/>
    <rect x="89.7036" y="78.9841" width="21.0503" height="9.86734" transform="rotate(180 89.7036 78.9841)" fill="white"/>
    <rect x="89.7036" y="36.8833" width="21.0503" height="9.86734" transform="rotate(180 89.7036 36.8833)" fill="white"/>
    <defs>
        <pattern id="pattern0_0_1" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_0_1" transform="scale(0.00404858 0.00411523)"/>
        </pattern>
    <linearGradient id="paint0_linear_0_1" x1="600" y1="0" x2="600" y2="630" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7962FF"/>
        <stop offset="0.87" stop-color="#8775F0"/>
    </linearGradient>
  <image id="image0_0_1" width="1303" height="243" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
  </defs>
  </svg>
  
    `;
}

export const getTokenId = (label: string) => {
    const labelHash = ethers.keccak256(ethers.toUtf8Bytes(label));
    const tokenId =  BigInt(labelHash).toString();
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