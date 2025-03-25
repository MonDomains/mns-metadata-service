import { namehash }              from '@ensdomains/ensjs/utils';
import { hexlify, zeroPadValue } from 'ethers';
import { Version }               from '../base';
import { bigIntToUint8Array }    from './bigIntToUint8Array';

const sha3 = require('js-sha3').keccak_256;

// labelhash without 0x
const mon0x =
  '7d074ff60790193d6f1639a7404e70caff96bb1ae486f61939ce4e42695b49a1';

export function constructMonNameHash(
  tokenId: string,
  version: Version
): string {
  if (version > Version.v1) return tokenId;

  const label0x = zeroPadValue(hexlify(bigIntToUint8Array(BigInt(tokenId))), 32)
    .replace('0x', '');
  const labels = [label0x, mon0x];

  // 0 x 64
  let node = '0000000000000000000000000000000000000000000000000000000000000000';
  for (var i = labels.length - 1; i >= 0; i--) {
    var labelSha = labels[i];
    node = sha3(Buffer.from(node + labelSha, 'hex'));
  }
  return '0x' + node;
}
export function getNamehash(nameOrNamehash: string) {
  const _name = nameOrNamehash.substring(0, nameOrNamehash.lastIndexOf('.'));
  // if not name, return original (in case intID provided convert to hexID)
  if (!_name) {
    if (!nameOrNamehash.match(/^0x/)) {
      return zeroPadValue(
        hexlify(bigIntToUint8Array(BigInt(nameOrNamehash))),
        32
      );
    }
    return nameOrNamehash;
  }

  const _lhexId = namehash(nameOrNamehash);
  return _lhexId;
}
