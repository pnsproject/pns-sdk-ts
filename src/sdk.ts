import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from 'js-sha3';
import { Buffer as Buffer } from "buffer/";

export function sha3 (data: string) {
  return "0x" + keccak_256(data)
}

export function getNamehash (name: string) {
  let node = '0000000000000000000000000000000000000000000000000000000000000000'

  if (name) {
    let labels = name.split('.')

    for(let i = labels.length - 1; i >= 0; i--) {
      let labelSha = keccak_256(labels[i])
      node = keccak_256(Buffer.from(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
}
