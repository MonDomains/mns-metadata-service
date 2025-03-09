import { strict as assert }        from 'assert';
import { Contract }                from 'ethers';
import { Request, Response }       from 'express';
import { FetchError }              from 'node-fetch';
import {
  ContractMismatchError,
  ExpiredNameError,
  NamehashMismatchError,
  UnsupportedNetwork,
  Version,
}                                  from '../base';
import {
  ADDRESS_ETH_REGISTRY,
  ETH_REGISTRY_ABI,
  RESPONSE_TIMEOUT,
}                                  from '../config';
import { checkContract }           from '../service/contract';
import { getDomain }               from '../service/domain';
import { Metadata }                from '../service/metadata';
import getNetwork, { NetworkName } from '../service/network';
import { constructEthNameHash }    from '../utils/getNamehash';

export async function ensMetadata(req: Request, res: Response) {

  res.setTimeout(RESPONSE_TIMEOUT, () => {
    res.status(504).json({ message: 'Timeout' });
    return;
  });

  const { contractAddress, networkName, tokenId } = req.params;
  const { provider, SUBGRAPH_URL } = getNetwork(networkName as NetworkName);
  const last_request_date = Date.now();
 
  try {
    
    const result = await getDomain(
      provider,
      networkName as NetworkName,
      SUBGRAPH_URL,
      contractAddress,
      tokenId,
      Version.v1,
      false
    );

    result.last_request_date = last_request_date;
    res.json(result);
    return;
  } catch (error: any) {
    console.log(error)
    const errCode = (error?.code && Number(error.code)) || 500;
    if (
      error instanceof FetchError ||
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

    try {
      const registry = new Contract(
        ADDRESS_ETH_REGISTRY,
        ETH_REGISTRY_ABI,
        provider
      );
      if (!tokenId ) {
        throw 'Missing parameters to construct namehash';
      }
      const _namehash = constructEthNameHash(tokenId, Version.v1);
      const isRecordExist = await registry.recordExists(_namehash);
      assert(isRecordExist, 'MNS name does not exist');
      const { external_url, ...unknownMetadata } = new Metadata({
        name: 'unknown.name',
        description: 'Unknown MNS name',
        created_date: 1580346653000,
        tokenId: '',
        version: Version.v1,
        last_request_date
      });
      res.status(200).json({
        message: unknownMetadata,
      });
      return;
    } catch (error) {}
    if (!res.headersSent) {
      res.status(404).json({
        message: 'No results found.',
      });
    }
  }
}