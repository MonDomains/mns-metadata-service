import { Request, Response } from 'express';
import { rasterize } from '../service/rasterize';

/* istanbul ignore next */
export async function ensRasterize(req: Request, res: Response) {
  // #swagger.description = 'MNS NFT image rasterization'
  // #swagger.parameters['networkName'] = { schema: { $ref: '#/definitions/networkName' } }
  // #swagger.parameters['{}'] = { name: 'contractAddress', description: 'Contract address which stores the NFT indicated by the tokenId', schema: { $ref: '#/definitions/contractAddress' } }
  // #swagger.parameters['tokenId'] = { type: 'string', description: 'Labelhash(v1) /Namehash(v2) of your MNS name.\n\nMore: https://docs.monadns.com/contract-api-reference/name-processing#hashing-names', schema: { $ref: '#/definitions/tokenId' } }
  const { contractAddress, networkName, tokenId } = req.params;
  // limit resolution param to static options
  const resolution = req.query.res === 'high' ? 'high' : 'low';
  try {
    const raster = await rasterize(contractAddress, networkName, tokenId, resolution);
    const base64 = raster.replace('data:image/png;base64,', '');
    const buffer = Buffer.from(base64, 'base64');
    /* #swagger.responses[200] = { 
          description: 'Image file'
    } */
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}
