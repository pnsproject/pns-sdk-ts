import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from "js-sha3";

export function sha3(data: string) {
  return "0x" + keccak_256(data);
}

export function getNamehash(name: string) {
  let node = "0000000000000000000000000000000000000000000000000000000000000000";

  if (name) {
    let labels = name.split(".");

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha = keccak_256(labels[i]);
      node = keccak_256(Buffer.from(node + labelSha, "hex"));
    }
  }

  return "0x" + node;
}

export const emptyAddress = "0x0000000000000000000000000000000000000000";
export const weirdNode = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const baseLabel = sha3("dot");
export const baseNode = getNamehash("dot");
export const altBaseLabel = sha3("com");
export const altBaseNode = getNamehash("com");
export const nonode = "0x0000000000000000000000000000000000000000000000000000000000001234";

export const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];
