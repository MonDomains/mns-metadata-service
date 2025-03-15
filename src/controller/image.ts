import { Request, Response }       from 'express';
import { FetchError }              from 'node-fetch';
import {
  ContractMismatchError,
  ExpiredNameError,
  NamehashMismatchError,
  UnsupportedNetwork,
  Version,
}                                  from '../base';
import { RESPONSE_TIMEOUT }        from '../config';
import { getDomain, getDomainTemp }               from '../service/domain';
import getNetwork, { NetworkName } from '../service/network';

export async function image(req: Request, res: Response) {
  
  res.setTimeout(RESPONSE_TIMEOUT, () => {
    res.status(504).json({ message: 'Timeout' });
  });

  const { contractAddress, networkName, tokenId } = req.params;

  try {
    const { provider, SUBGRAPH_URL } = getNetwork(networkName as NetworkName);
     
    const result = await getDomain(
      provider,
      networkName as NetworkName,
      SUBGRAPH_URL,
      contractAddress,
      tokenId,
      Version.v2
    );
    
    if (result.image_url) {
      //const base64 = result.image_url.replace('data:image/svg+xml;base64,', '');
      //const buffer = Buffer.from(base64, 'base64');
      const buffer = Buffer.from(result.image_url);
      if (!res.headersSent) {
        res
          .writeHead(200, {
            'Content-Type': 'image/svg+xml',
            'Content-Length': buffer.length,
          })
          .end(buffer);
        return;
      }
    } else {
      throw Error('Image URL is missing.');
    }
    /* #swagger.responses[200] = { 
        description: 'Image file'
    } */
  } catch (error: any) {
    const errCode = (error?.code && Number(error.code)) || 500;

    if (error instanceof FetchError) {
      /* #swagger.responses[404] = { 
           description: 'No results found' 
      } */
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    /* #swagger.responses[500] = { 
             description: 'Internal Server Error'
    } */
    /* #swagger.responses[501] = { 
           description: 'Unsupported network' 
    } */
    if (
      error instanceof ContractMismatchError ||
      error instanceof ExpiredNameError ||
      error instanceof NamehashMismatchError ||
      error instanceof UnsupportedNetwork
    ) {
      if (!res.headersSent) {
        res.status(errCode).json({
          message: error.message,
        });
        return;
      }
    }

    /* #swagger.responses[404] = { 
           description: 'No results found' 
    } */
    if (!res.headersSent) {
      res.status(404).json({
        message: 'No results found.',
      });
    }
  }
}