import { request }        from 'graphql-request';
import { ethers }         from 'ethers';
import { 
  GET_DOMAINS, 
}                         from './subgraph';
import { Metadata }       from './metadata';
import {
  ExpiredNameError,
  SubgraphRecordNotFound,
  Version,
}                         from '../base';
import { NetworkName }    from './network';


const mon =
  '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae';
const GRACE_PERIOD_MS = 7776000000; // 90 days as milliseconds

export async function getDomain(
  provider: ethers.providers.BaseProvider,
  networkName: NetworkName,
  SUBGRAPH_URL: string,
  contractAddress: string,
  tokenId: string,
  version: Version,
  loadImages: boolean = true
): Promise<Metadata> {

  let hexId: string, intId;

  if (!tokenId.match(/^0x/)) {
    intId = tokenId;
    hexId = ethers.utils.hexZeroPad(
      ethers.utils.hexlify(ethers.BigNumber.from(tokenId)),
      32
    );
  } else {
    intId = ethers.BigNumber.from(tokenId).toString();
    hexId = tokenId;
  }
  

  const result = await request(SUBGRAPH_URL, GET_DOMAINS, { id: hexId });
  
  const domain = result.domain;
 
  if (!(domain && Object.keys(domain).length))
    throw new SubgraphRecordNotFound(`No record for ${hexId}`);

  const { name, labelName, createdAt, registeredAt, expiryDate, id } = domain;
  
  const metadata = new Metadata({
    name: name,
    created_date: createdAt,
    tokenId: hexId,
    version,
  });

  const registered_date = registeredAt * 1000;
  const expiration_date = expiryDate * 1000;
  const creation_date = createdAt * 1000;

  if (expiration_date + GRACE_PERIOD_MS < +new Date()) {
    throw new ExpiredNameError(
      `'${labelName}' is already been expired at ${new Date(
        expiration_date
      ).toUTCString()}.`,
      410
    );
  }
  
  metadata.addAttribute({
    trait_type: 'Registration Date',
    display_type: 'date',
    value: registered_date,
  });

  metadata.addAttribute({
    trait_type: 'Expiration Date',
    display_type: 'date',
    value: expiration_date,
  });

  metadata.addAttribute({
    trait_type: 'Creation Date',
    display_type: 'date',
    value: creation_date,
  });

  async function requestMedia(isAvatarExist: boolean) {
    if (loadImages) {
      metadata.generateImage();
    } else {
      metadata.setImage(
        `https://metadata.monadns.com/${networkName}/${contractAddress}/${hexId}/image`
      );
    }
  }
 
  await Promise.all([requestMedia(false)]);
  return metadata;
}

export async function getDomainTemp(
  label: string,
  width: number,
  heigh: number
): Promise<Metadata> {

  const version = Version.v2; 

  const metadata = new Metadata({
    name: label,
    created_date: 11111111111,
    tokenId: "0x0",
    version,
  });
 
  async function requestMedia(isAvatarExist: boolean) {
    metadata.generateImage();
  }
  
  await Promise.all([requestMedia(false)]);
  return metadata;
} 