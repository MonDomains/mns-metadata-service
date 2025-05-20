import { Request, Response } from 'express'; 
import { NFT_BG_PATH, RESPONSE_TIMEOUT } from '../config'; 
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
  
  res.setTimeout(RESPONSE_TIMEOUT, () => {
    res.status(504).json({ message: 'Timeout' });
  });

  const { name } = req.params;
  const label = name.split(".").shift() || "";
  const oname = obscureName(label, 15) + ".mon";
  const cardWidth = 1200;
  const cardHeight = 630;
  const avatarWidth = 270;
  const avatarHeight = 270;
  const leftSpacing = 50;
  const spacing = 50;

  try {

    if (!name || name.length < 5 || !name.endsWith('.mon')) {
      throw Error(`${name} is not an MNS name.`);
    }
  
    const {provider} = getNetwork(NETWORK.TESTNET);
     
    const mask = Buffer.from(
      `
      <svg xmlns="http://www.w3.org/2000/svg" width="270" height="270">
        <g>
          <rect x="0" width="270" height="270" rx="10" />
        </g>
      </svg>
      `
    );

    let avatarPicBuffer = null;

    let randomPic = path.resolve(path.join(NFT_BG_PATH, (Math.floor(Math.random() * 30) + 1) + ".webp"));
    let randomPicBuffer = await sharp(randomPic).resize(avatarWidth, avatarHeight, {
        kernel: sharp.kernel.nearest,
        fit: 'cover'
      }).composite([{
        input: mask,
        blend: 'dest-in'
      }]).toBuffer()

      
    try {
      const [buffer, mimeType] = await getAvatarImage(provider, name);
      if(buffer != null) { 
        avatarPicBuffer = await sharp(buffer).resize(avatarWidth, avatarHeight, {
          kernel: sharp.kernel.nearest,
          fit: 'cover'
        }).composite([{
          input: mask,
          blend: 'dest-in'
        }]).toBuffer()
      }
    } catch (e) { }

     
    let _composites: any = [];
  
    const input_bg = { 
      input: path.resolve(CARD_BG_PATH)
    };
    _composites.push(input_bg)
 
    if(avatarPicBuffer != null) {
      const input_avatar = {
        input: avatarPicBuffer,
        top: Math.floor((cardHeight / 2) - (avatarHeight / 2)),
        left: 50
      }
      _composites.push(input_avatar)
    } else {
      const input_avatar = {
        input: randomPicBuffer,
        top: Math.floor((cardHeight / 2) - (avatarHeight / 2)),
        left: 50
      }
      _composites.push(input_avatar)
    }

   
    const input_name = {
      top: Math.floor((cardHeight / 2) - (avatarHeight / 2)) + 10,
      left: avatarWidth + leftSpacing + spacing,
      input: { 
        text: { 
          text: `<span size="74pt" foreground='#ffffff'>${oname}</span>`, 
          font: "Satoshi Bold",
          fontfile: path.resolve(CANVAS_FONT_PATH),
          rgba: true,
          justify: true, 
        }
      }
    }
    _composites.push(input_name)

 
    const image = await sharp({
        create: {
            width: cardWidth,
            height: cardHeight,
            channels: 4,
            rgba: true,
            background: { r: 3, g: 1, b: 20, alpha: 1 },
        }
    }).composite(_composites).jpeg({ quality: 100, progressive: true }).toBuffer();
 
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

export function getTextWidth(text: string): number { 
  const canvas = createCanvas(1200, 630, 'svg');
  registerFont(CANVAS_FONT_PATH, { family: "Satoshi" })
  const context = canvas.getContext('2d'); 
  context.font = "80px Satoshi, Noto Color Emoji, Apple Color Emoji, sans-serif"
  const fontMetrics = context.measureText(text);
  return fontMetrics.width
}

export function getFontSize(name: string): number { 
    const canvas = createCanvas(1200, 630, 'svg');
    registerFont(CANVAS_FONT_PATH, { family: "Satoshi Bold" })

    const context = canvas.getContext('2d'); 
    context.font = "80px Satoshi, Noto Color Emoji, Apple Color Emoji, sans-serif"
    const fontMetrics = context.measureText(name);
    const fontSize = Math.floor(80 * (700 / fontMetrics.width));
    return fontSize > 300 ? 300 : fontSize;
}