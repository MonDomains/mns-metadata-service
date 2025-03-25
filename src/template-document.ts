import { CANVAS_FONT_PATH } from './config';
import { importFont } from './utils/importFont';

const fontSatoshiBold = importFont(CANVAS_FONT_PATH, 'font/truetype');

interface DocumentMetadata {
  name: string;
  network: string;
  image_url?: string;
}

interface DocumentTemplateFields {
  buffer?: Buffer;
  metadata: DocumentMetadata;
  mimeType?: string;
}

export default function createDocumentfromTemplate({
  buffer,
  metadata,
  mimeType,
}: DocumentTemplateFields) {
  if (!metadata && !buffer) {
    throw 'Either image url, or image buffer needs to be provided for the document template';
  }
  const image =
    (metadata && metadata.image_url) ||
    (buffer &&
      `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`);
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"> 
    <title>${metadata.name}</title>
    <style type="text/css">
      @font-face {
        font-family: 'Satoshi';
        font-style: normal;
        font-weight: 600 900;
        src: url(${fontSatoshiBold});
      }
      body {
        font-family: 'Satoshi', 'Noto Color Emoji', 'Apple Color Emoji',
          sans-serif;
        font-style: normal;
        font-variant-numeric: tabular-nums;
        font-weight: bold;
        font-variant-ligatures: none;
        font-feature-settings: 'ss01' on, 'ss03' on;
        -moz-font-feature-settings: 'ss01' on, 'ss03' on;
        line-height: 34px;
      }
      table {
        width: 100%;
      }
      pre {
        display: inline;
        order-radius: 2px;
        word-break: break-word;
        background-color: rgba(51, 51, 51, 0.05);
        color: rgba(51, 51, 51, 0.9);
        padding: 0px 5px;
        border: 1px solid rgba(51, 51, 51, 0.1);
        font-family: Courier, monospace;
      }
      .banner {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 25px;

        background: #011a25;
        color: white;

        font-size: 1rem;
        text-align: right;
      }
      .preview {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;

        padding: 0 25px;
        box-sizing: border-box;
      }
      .container {
        position: relative;
        overflow: hidden;
        width: 100%;
      }
      #imgSource {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;

        user-select: none !important;
        pointer-events: none !important;
      }
      .docs {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5em;
        color: rgb(51, 51, 51);
        text-align: left;
        -webkit-font-smoothing: antialiased;
        text-size-adjust: 100%;
        text-rendering: optimizespeed !important;
        position: relative;
        padding: 0px;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      }
      .required {
        color: rgb(212, 31, 28);
        font-size: 0.9em;
        font-weight: normal;
        margin-left: 20px;
        line-height: 1;
      }
      h5 {
        text-transform: uppercase;
        border-bottom: 1px solid rgb(159, 180, 190);
      }
      .field {
        box-sizing: border-box;
        position: relative;
        padding: 10px 10px 10px 0px;

        vertical-align: top;
        line-height: 20px;
        white-space: nowrap;
        font-size: 13px;
        font-family: Courier, monospace;

        border-left: 1px solid rgb(124, 124, 187);
        border-left-width: 1px;
        box-sizing: border-box;
        position: relative;
        padding: 10px 10px 10px 0px;
      }
      tr:first-of-type > .field {
        background-image: linear-gradient(transparent 0%, transparent 22px, rgb(124, 124, 187) 22px, rgb(124, 124, 187) 100%);
      }
      tr:first-of-type > .field, tr.last > .field {
        background-size: 1px 100%;
        background-repeat: no-repeat;
        background-position: left top;
        border-left-width: 0px;
      }

      tr.last > .field {
        background-image: linear-gradient(rgb(124, 124, 187) 0%, rgb(124, 124, 187) 22px, transparent 22px, transparent 100%);
      }
      .flow::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 1px;
        background: rgb(124, 124, 187);
      }
      .flow::after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 1px;
        background: rgb(124, 124, 187);
        height: 7px;
      }
      .response {
        display: block;
        border: 0px;
        width: 100%;
        text-align: left;
        padding: 10px;
        border-radius: 2px;
        margin-bottom: 4px;
        line-height: 1.5em;
        cursor: default;
      }
      .response::before {
        content: "—";
        font-weight: bold;
        width: 1.5em;
        text-align: center;
        display: inline-block;
        vertical-align: top;
      }
      .response--success {
        color: rgb(29, 129, 39);
        background-color: rgba(29, 129, 39, 0.07);
      }
      .response--fail {
        color: rgb(212, 31, 28);
        background-color: rgba(212, 31, 28, 0.07);
      }
      td:nth-child(even) {
        border-bottom: 1px solid rgb(159, 180, 190);
        padding: 10px 0px;
        width: 75%;
      }
      @media only screen and (max-width: 800px) {
        .preview {
          display: block;
        }
        img {
          max-width: 600px;
        }
    </style>
  </head>
  <body>
    <div class="banner">
       
    </div>
    <div class="preview">
      <div class="container">
        <iframe srcdoc="${(mimeType !== 'image/svg+xml'
          ? `<img
          src="${image}"
          alt="${metadata.name}"
          style="width:100%;"
        />`
          : "<div style='width:100%;'>" + buffer?.toString() + '</div>' || ''
        ).replace(/"/g, "'")}" 
          sandbox="allow-same-origin" 
          id="imgSource"
          frameborder="0" 
          scrolling="no">
        </iframe>
      </div>
      <div class="docs">
        <div>
          <div>
            <div>
              <div>
                <h3>MNS NFT ${buffer ? 'Avatar' : ''} Image API Endpoint</h3>
                <p>
                  <a href="https://metadata.monadns.com/${metadata.network}/${
    buffer ? 'avatar' : '0x01BeCD733ea490CCDa8B5Caa97381E67BFA5249D'
  }/${metadata.name}${buffer ? '' : '/image'}">
                    https://metadata.monadns.com/${metadata.network}/${
    buffer ? 'avatar' : '0x01BeCD733ea490CCDa8B5Caa97381E67BFA5249D'
  }/${metadata.name}${buffer ? '' : '/image'}
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h5>path Parameters</h5>
              <table>
                <tbody>
                  <tr>
                    <td kind="field" title="networkName" class="field">
                      <span class="flow"></span>
                      <span>networkName</span>
                      <div class="required">required</div>
                    </td>
                    <td>
                      <div>
                        <div>
                          <span></span>
                          <span>string</span>
                          <span>(networkName)</span>
                        </div>
                        <div>
                          <span>Enum:</span>
                          <pre>"monad"</pre>
                          <pre>"monad-testnet"</pre>
                        </div>
                        <div>
                          <div>
                            <p>Name of the chain to query for.</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ${
                    buffer
                      ? ''
                      : `<tr>
                    <td kind="field" title="contractAddress" class="field">
                      <span class="flow"></span>
                      <span>contractAddress</span>
                      <div class="required">required</div>
                    </td>
                    <td>
                      <div>
                        <div class="fieldType">
                          <span></span>
                          <span>string</span>
                          <span>(contractAddress)</span>
                        </div>
                        <div>
                          <span>Example: </span>
                          <pre>0x01BeCD733ea490CCDa8B5Caa97381E67BFA5249D</pre>
                        </div>
                        <div>
                          <div></div>
                        </div>
                      </div>
                    </td>
                  </tr>`
                  }
                  ${
                    buffer
                      ? `<tr class="last">
                    <td kind="field" title="mnsName" class="field">
                      <span class="flow"></span>
                      <span>name</span>
                      <div class="required">required</div>
                    </td>
                    <td>
                      <div>
                        <div>
                          <span></span>
                          <span>string</span>
                          <span>(mnsName)</span>
                        </div>
                        <div>
                          Example: <pre>${metadata.name}</pre>
                        </div>
                        <div>
                          <div>
                            <p>MNS Name</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>`
                      : `<tr class="last">
                    <td kind="field" title="tokenId" class="field">
                      <span class="flow"></span>
                      <span>tokenId</span>
                      <div class="required">required</div>
                    </td>
                    <td>
                      <div>
                        <div>
                          <span></span>
                          <span>string</span>
                          <span>(tokenId / MNS name)</span>
                        </div>
                        <div>
                          <span>Example: </span>
                          <br/>
                          <pre>4221908525551133525058944220830153...</pre> /  <pre>${metadata.name}</pre>
                        </div>
                        <div>
                          <div>
                            <p>TokenID = Labelhash(v1) /Namehash(v2) of your MNS name.</p>
                            <p>
                              More:
                              <a href="https://docs.monadns.com/contract-api-reference/name-processing#hashing-names">https://docs.monadns.com/contract-api-reference/name-processing#hashing-names</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>`
                  }
                </tbody>
              </table>
            </div>
            <div>
              <h3>Responses</h3>
              <div>
                <button disabled="" class="response response--success">
                  <strong>200 </strong>
                  <div>
                    <p>Image file</p>
                  </div>
                </button>
                <button disabled="" class="response response--fail"> 
                  <strong>404 </strong>
                  <div>
                    <p>No results found</p>
                  </div>
                </button>
                <button disabled="" class="response response--fail">
                  <strong>501 </strong>
                  <div>
                    <p>Unsupported network</p>
                  </div>
                </button>
                <button disabled="" class="response response--fail">
                  <strong>504 </strong>
                  <div>
                    <p>Gateway Timeout</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
}
