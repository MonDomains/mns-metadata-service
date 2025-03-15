
import path from "path";
import { Version } from "./base";
import { CANVAS_FONT_PATH, CANVAS_EMOJI_FONT_PATH }  from './config';
import { importFont } from "./utils/importFont";
const sharp = require("sharp")

const fontSatoshiBold = importFont(path.join(__dirname, "../"+ CANVAS_FONT_PATH), 'font/truetype'); 
const notoColorEmoji = importFont(path.join(__dirname, "../"+ CANVAS_EMOJI_FONT_PATH), 'font/truetype'); 

interface SVGTemplateFields {
  backgroundImage?: string;
  domain: string;
  domainFontSize: number;
  isNormalized: boolean;
  isSubdomain: boolean;
  mimeType?: string;
  subdomainText?: string;
  version: Version;
}
 
export function createSVGfromTemplate({
  backgroundImage,
  domain,
  domainFontSize,
  isNormalized = true,
  isSubdomain = false,
  mimeType,
  subdomainText,
  version
}: SVGTemplateFields) {
  return `<svg width="100vw" height="100vh" viewBox="0 0 270 270" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${
      backgroundImage
        ? `<image href="data:${mimeType};base64,${backgroundImage}" width="270" height="270"/>
        <rect width="270" height="270" fill="#000" fill-opacity=".12"/>`
        : isNormalized
          ? `<rect width="270" height="270" fill="url(#paint0_linear)"/>`
          : `<rect width="270" height="270" fill="url(#paint1_linear)"/>`
    }
    <defs>
      <filter id="dropShadow" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270">
        <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.225" width="100%" height="100%"/>
      </filter>
    </defs> 
    
    <path fill="#ffffff" d="M 0 0 L 6.496094 0 L 6.496094 36.996094 L 0 36.996094 Z M 0 0 " fill-opacity="1" fill-rule="red" transform="translate(20,20)" />  
    <path fill="#ffffff" d="M 30.535156 0 L 37.007812 0 L 37.007812 37.003906 L 30.535156 37.003906 Z M 30.535156 0 " fill-opacity="1" fill-rule="red" transform="translate(20,20)" />  
    <path fill="#ffffff" d="M 0 0 L 13.875 0 L 13.875 6.46875 L 0 6.46875 Z M 0 0 "  fill-opacity="1" fill-rule="red" transform="translate(20,20)" />  
    <path fill="#ffffff" d="M 23.128906 0 L 37.003906 0 L 37.003906 6.46875 L 23.128906 6.46875 Z M 23.128906 0 " fill-opacity="1" fill-rule="red"  transform="translate(20,20)" />  
    <path fill="#ffffff" d="M 0 30.535156 L 13.875 30.535156 L 13.875 37.007812 L 0 37.007812 Z M 0 30.535156 " fill-opacity="1" fill-rule="red"  transform="translate(20,20)" />  
    <path fill="#ffffff" d="M 23.128906 30.535156 L 37.003906 30.535156 L 37.003906 37.007812 L 23.128906 37.007812 Z M 23.128906 30.535156 " fill-opacity="1" fill-rule="red" transform="translate(20,20)" /> 

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="247" height="243" x="5%" y="8%" 
    style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
    xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
          <path style="opacity:0.05" fill="#fefffe"
              d="M 114.5,-0.5 C 119.5,-0.5 124.5,-0.5 129.5,-0.5C 143.144,4.82498 155.81,11.9916 167.5,21C 193.919,41.4127 216.086,65.5794 234,93.5C 239.372,101.952 242.539,111.119 243.5,121C 242.539,130.881 239.372,140.048 234,148.5C 210.742,184.425 180.908,213.592 144.5,236C 139.41,238.218 134.41,240.384 129.5,242.5C 124.5,242.5 119.5,242.5 114.5,242.5C 101.12,237.635 88.7869,230.802 77.5,222C 50.4165,200.923 27.5832,176.09 9,147.5C 4.36863,139.931 1.20196,131.931 -0.5,123.5C -0.5,121.833 -0.5,120.167 -0.5,118.5C 3.21155,104.741 9.37822,92.0747 18,80.5C 39.7059,51.7899 65.5392,27.6233 95.5,8C 101.697,4.56207 108.031,1.72874 114.5,-0.5 Z M 135.5,51.5 C 138.794,51.259 141.794,52.0924 144.5,54C 167.024,77.8723 182.691,105.706 191.5,137.5C 189.206,143.304 185.539,148.138 180.5,152C 158.789,168.857 134.789,181.524 108.5,190C 105.217,190.743 102.217,190.076 99.5,188C 81.2034,168.598 67.0368,146.431 57,121.5C 54.0661,115.106 52.7327,108.44 53,101.5C 61.9857,90.8461 72.4857,82.0128 84.5,75C 100.597,64.9477 117.597,57.1144 135.5,51.5 Z" />
      </g>
    </svg>
  
    ${
      isNormalized
        ? ''
        : `
      <rect x="200" y="34" width="40" height="40" rx="20" fill="#E13021" fill-opacity="0.8"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M217.472 44.4655C218.581 42.5115 221.42 42.5115 222.528 44.4655L230.623 58.7184C231.711 60.6351 230.314 63 228.096 63H211.905C209.686 63 208.289 60.6351 209.377 58.7184L217.472 44.4655ZM221.451 58.6911C221.451 59.0722 221.298 59.4376 221.026 59.7071C220.754 59.9765 220.385 60.1279 220 60.1279C219.615 60.1279 219.246 59.9765 218.974 59.7071C218.702 59.4376 218.549 59.0722 218.549 58.6911C218.549 58.31 218.702 57.9446 218.974 57.6751C219.246 57.4057 219.615 57.2543 220 57.2543C220.385 57.2543 220.754 57.4057 221.026 57.6751C221.298 57.9446 221.451 58.31 221.451 58.6911V58.6911ZM220 47.1968C219.615 47.1968 219.246 47.3482 218.974 47.6177C218.702 47.8871 218.549 48.2526 218.549 48.6336V52.944C218.549 53.325 218.702 53.6905 218.974 53.9599C219.246 54.2294 219.615 54.3807 220 54.3807C220.385 54.3807 220.754 54.2294 221.026 53.9599C221.298 53.6905 221.451 53.325 221.451 52.944V48.6336C221.451 48.2526 221.298 47.8871 221.026 47.6177C220.754 47.3482 220.385 47.1968 220 47.1968Z" fill="white"/>
      <path opacity="0.6" d="M36.791 196V183.947H34.411V196H36.791ZM41.6133 191.189C41.6133 190.22 42.1913 189.455 43.1773 189.455C44.2653 189.455 44.7243 190.186 44.7243 191.121V196H46.9853V190.73C46.9853 188.894 46.0333 187.415 43.9593 187.415C43.0583 187.415 42.0553 187.806 41.5453 188.673V187.636H39.3523V196H41.6133V191.189ZM56.9874 187.636H54.6074L52.6184 193.246L50.5444 187.636H48.0624L51.4794 196H53.7404L56.9874 187.636ZM57.6689 193.722C57.6689 195.031 58.7569 196.238 60.5419 196.238C61.7829 196.238 62.5819 195.66 63.0069 194.997C63.0069 195.32 63.0409 195.779 63.0919 196H65.1659C65.1149 195.711 65.0639 195.116 65.0639 194.674V190.56C65.0639 188.877 64.0779 187.381 61.4259 187.381C59.1819 187.381 57.9749 188.826 57.8389 190.135L59.8449 190.56C59.9129 189.829 60.4569 189.2 61.4429 189.2C62.3949 189.2 62.8539 189.693 62.8539 190.288C62.8539 190.577 62.7009 190.815 62.2249 190.883L60.1679 191.189C58.7739 191.393 57.6689 192.226 57.6689 193.722ZM61.0179 194.555C60.2869 194.555 59.9299 194.079 59.9299 193.586C59.9299 192.94 60.3889 192.617 60.9669 192.532L62.8539 192.243V192.617C62.8539 194.096 61.9699 194.555 61.0179 194.555ZM69.5703 196V183.692H67.3093V196H69.5703ZM74.1358 196V187.636H71.8748V196H74.1358ZM71.6028 184.899C71.6028 185.647 72.2318 186.276 72.9968 186.276C73.7788 186.276 74.3908 185.647 74.3908 184.899C74.3908 184.117 73.7788 183.488 72.9968 183.488C72.2318 183.488 71.6028 184.117 71.6028 184.899ZM84.5322 183.692H82.3052V188.469C82.0672 188.027 81.3872 187.432 79.9422 187.432C77.5792 187.432 75.9302 189.353 75.9302 191.801C75.9302 194.334 77.6302 196.204 80.0102 196.204C81.1322 196.204 81.9822 195.694 82.3562 195.031C82.3562 195.422 82.4072 195.83 82.4412 196H84.6002C84.5662 195.66 84.5322 195.048 84.5322 194.487V183.692ZM78.2082 191.801C78.2082 190.305 79.1262 189.455 80.2822 189.455C81.4382 189.455 82.3392 190.288 82.3392 191.784C82.3392 193.297 81.4382 194.181 80.2822 194.181C79.0922 194.181 78.2082 193.297 78.2082 191.801ZM93.1445 191.189C93.1445 190.22 93.7225 189.455 94.7085 189.455C95.7965 189.455 96.2555 190.186 96.2555 191.121V196H98.5165V190.73C98.5165 188.894 97.5645 187.415 95.4905 187.415C94.5895 187.415 93.5865 187.806 93.0765 188.673V187.636H90.8835V196H93.1445V191.189ZM100.252 193.722C100.252 195.031 101.34 196.238 103.125 196.238C104.366 196.238 105.165 195.66 105.59 194.997C105.59 195.32 105.624 195.779 105.675 196H107.749C107.698 195.711 107.647 195.116 107.647 194.674V190.56C107.647 188.877 106.661 187.381 104.009 187.381C101.765 187.381 100.558 188.826 100.422 190.135L102.428 190.56C102.496 189.829 103.04 189.2 104.026 189.2C104.978 189.2 105.437 189.693 105.437 190.288C105.437 190.577 105.284 190.815 104.808 190.883L102.751 191.189C101.357 191.393 100.252 192.226 100.252 193.722ZM103.601 194.555C102.87 194.555 102.513 194.079 102.513 193.586C102.513 192.94 102.972 192.617 103.55 192.532L105.437 192.243V192.617C105.437 194.096 104.553 194.555 103.601 194.555ZM112.153 196V191.104C112.153 190.186 112.731 189.455 113.717 189.455C114.737 189.455 115.196 190.135 115.196 191.036V196H117.44V191.104C117.44 190.203 118.018 189.455 118.987 189.455C120.024 189.455 120.466 190.135 120.466 191.036V196H122.659V190.577C122.659 188.333 121.18 187.398 119.633 187.398C118.528 187.398 117.644 187.772 116.981 188.792C116.556 187.891 115.638 187.398 114.499 187.398C113.581 187.398 112.51 187.84 112.051 188.656V187.636H109.892V196H112.153ZM126.669 190.866C126.72 190.101 127.366 189.217 128.539 189.217C129.831 189.217 130.375 190.033 130.409 190.866H126.669ZM130.63 193.042C130.358 193.79 129.78 194.317 128.726 194.317C127.604 194.317 126.669 193.518 126.618 192.413H132.602C132.602 192.379 132.636 192.039 132.636 191.716C132.636 189.03 131.089 187.381 128.505 187.381C126.363 187.381 124.391 189.115 124.391 191.784C124.391 194.606 126.414 196.255 128.709 196.255C130.766 196.255 132.092 195.048 132.517 193.603L130.63 193.042Z" fill="black"/>
    `
    }
    ${subdomainText || ''}
    <text
      x="20" 
      y="231" 
      font-family="Satoshi Variable"
      font-size="${domainFontSize}px"
      ${isSubdomain ? 'opacity="0.4"' : ''}
      fill="${isNormalized ? "white" : "black"}"
      filter="url(#dropShadow)">${isNormalized ? domain: ""}</text>
    <defs>
       
      <style>
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
      ${ (domain.split(".").shift() || "").toString().length < 4 ? 
        `<style type="text/css"> 
            svg text {
            animation: stroke 5s infinite alternate;
            animation-delay: 2s;
        }

        @keyframes stroke {
            0% {
                stroke: #ffffff;
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
                fill: #ffffff;
                stroke: rgba(255, 255, 255, 1); 
                stroke-width: 0.8;
            }

            100% {
                fill: #ffffff;
                fill: #ffffff;
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

      <linearGradient id="paint0_linear" x1="190.5" y1="302" x2="-64" y2="-172.5" gradientUnits="userSpaceOnUse">
      ${
        version !== Version.v1w
          ? `<stop stop-color="#836EF9"/>
          <stop offset="0.428185" stop-color="#916ff7"/>
          <stop offset="1" stop-color="#836EF9"/>`
          : `<stop stop-color="#836EF9"/>
        <stop offset="1" stop-color="#836EF9"/>`
      }
      </linearGradient>
      <linearGradient id="paint1_linear" x1="0" y1="0" x2="269.553" y2="285.527" gradientUnits="userSpaceOnUse">
        <stop stop-color="#CCCCCC"/>
        <stop offset="1" stop-color="#CCCCCC"/>
      </linearGradient>
    </defs>
  </svg>`;
}

 

