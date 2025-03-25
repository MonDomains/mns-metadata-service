import { JsonRpcProvider, Network } from 'ethers';
import { UnsupportedNetwork } from '../base';
import {
  NODE_PROVIDER,
  NODE_PROVIDER_URL,
  NODE_PROVIDER_URL_TESTNET,
  NODE_PROVIDER_URL_CF,
  THE_GRAPH_API_KEY,
} from '../config';

const NODE_PROVIDERS = {
  QUICKNODE: 'QUICKNODE',
  BLOCKVISION: 'BLOCKVISION'
};

export const NETWORK = {
  TESTNET: 'monad-testnet',
  MAINNET: 'monad',
} as const;

export type NetworkName = (typeof NETWORK)[keyof typeof NETWORK];

export const monadMainnet = new Network(NETWORK.MAINNET, 10143);
export const monadTestnet = new Network(NETWORK.TESTNET, 10143);

Network.register(NETWORK.MAINNET, ()=> monadMainnet);
Network.register(NETWORK.TESTNET, ()=> monadTestnet);

function getWeb3URL(
  providerName: string,
  api: string,
  network: NetworkName
): string {
  switch (providerName.toUpperCase()) {
    case NODE_PROVIDERS.QUICKNODE || NODE_PROVIDERS.BLOCKVISION:
      if (network === NETWORK.MAINNET) return NODE_PROVIDER_URL;
      if (network === NETWORK.TESTNET) return NODE_PROVIDER_URL_TESTNET;
      return `${NODE_PROVIDER_URL_CF}/${network}`;
    default:
      throw Error('');
  }
}

export default function getNetwork(network: NetworkName): {
  WEB3_URL: string;
  SUBGRAPH_URL: string;
  provider: JsonRpcProvider;
} {
  
  // currently subgraphs used under this function are outdated,
  // we will have namewrapper support and more attributes when latest subgraph goes to production
  let SUBGRAPH_URL: string;
  switch (network) {
    case NETWORK.TESTNET:
      SUBGRAPH_URL =
        `https://gateway.thegraph.com/api/${THE_GRAPH_API_KEY}/subgraphs/id/FCVSEukmVKanQbsnGaeDF9Pwn9Jyw7eHfYhPBkbJEj9z`;
      break;
    case NETWORK.MAINNET:
      SUBGRAPH_URL = 
        ``;
      break;
    default:
      throw new UnsupportedNetwork(`Unknown network '${network}'`, 501);
  }

  const WEB3_URL = getWeb3URL(NODE_PROVIDER, NODE_PROVIDER_URL, network);
 
  // add source param at the end for better request measurability
  SUBGRAPH_URL = SUBGRAPH_URL + '?source=mns-metadata';
  
  const provider = new JsonRpcProvider(WEB3_URL, network, { staticNetwork: true });
   
  return { WEB3_URL, SUBGRAPH_URL, provider };
}
