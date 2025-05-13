import { Request, Response } from 'express'; 
import { RESPONSE_TIMEOUT } from '../config'; 
import { ethers } from 'ethers';
import { Canvas, createCanvas, registerFont } from 'canvas';
import { CANVAS_FONT_PATH, CARD_BG_PATH }  from '../config';
import path from 'path'
import getNetwork, { NETWORK } from '../service/network';
import { getAvatarImage } from '../service/avatar';

path.resolve(process.cwd(), 'fonts', 'fonts.conf');
path.resolve(process.cwd(), 'fonts', 'Satoshi-Bold.ttf')
path.resolve(process.cwd(), 'fonts', 'NotoColorEmoji.ttf')

const sharp = require("sharp")

export async function mnsCard(req: Request, res: Response) {
  // #swagger.description = 'MNS NFT preview'
  // #swagger.parameters['name'] = { type: 'string', description: 'MNS name.' }
  res.setTimeout(RESPONSE_TIMEOUT, () => {
    res.status(504).json({ message: 'Timeout' });
  });

  const { name } = req.params;
  const label = name.split(".").shift() || "";
  const oname = obscureName(label, 25) + ".mon";
   
  try {

    if (!name || name.length < 5 || !name.endsWith('.mon')) {
      throw Error(`${name} is not an MNS name.`);
    }
  
    //const {provider} = getNetwork(NETWORK.TESTNET);
    //let avatarBuffer = null;

    //try {
    //  const [buffer, mimeType] = await getAvatarImage(provider, name);
    //  avatarBuffer = Buffer.from(buffer);
    //} catch (e) {
      
    //}
     
    //const svg = createCardSVGfromTemplate(name);
    //const svgBuffer = Buffer.from(svg);
    const image = await sharp({
        create: {
            width: 1200,
            height: 630,
            channels: 4,
            rgba: true,
            background: { r: 3, g: 1, b: 20, alpha: 1 },
        }
    }).composite([{ 
      input: path.resolve(CARD_BG_PATH)
    },
      {
        input: { 
          text: { 
            text: `<span size="${getFontSize(oname)}pt" foreground='#ffffff'>${oname}</span>`, 
            align: "center", 
            font: "Satoshi Bold",
            fontfile: path.resolve(CANVAS_FONT_PATH),
            rgba: true,
          }
        }
      }
  ]).jpeg({ quality: 100, progressive: true }).toBuffer();
 
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
    registerFont(CANVAS_FONT_PATH, { family: "Satoshi" })

    const context = canvas.getContext('2d'); 
    context.font = "80px Satoshi, Noto Color Emoji, Apple Color Emoji, sans-serif"
    const fontMetrics = context.measureText(name);
    const fontSize = Math.floor(80 * (700 / fontMetrics.width));
    return fontSize > 300 ? 300 : fontSize;
}