import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from "js-sha3";

import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
import { Signer as Web3Signer } from "@ethersproject/abstract-signer";

import { IPNS, IController, IResolver, IOwnable, IPNS__factory, IController__factory, IResolver__factory, IOwnable__factory } from "./contracts";

export const formatEther = ethers.utils.formatEther;
export const abiCoder = ethers.utils.defaultAbiCoder;

export type HexAddress = string;

export type TokenId = string;

export type DomainString = string;

export type LabelString = string;

declare abstract class Web3Provider extends AbstractWeb3Provider {
  abstract getSigner(): Promise<Web3Signer>;
}

export type DomainDetails = {
  name: string;
  label: string;
  labelhash: string;
  owner: string;

  cname: string;
  content: string;
  contentType?: string;

  addrs: {
    key: string;
    value: string;
  }[];
  textRecords: {
    key: string;
    value: string;
  }[];
};

let provider: Web3Provider;
let signer: Web3Signer;
let account: string;
let networkId: number;

let pnsAddr: string;
let controllerAddr: string;
let resolverAddr: string;

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

export function toChecksumAddress(address: string): string {
  address = address.toLowerCase().replace("0x", "");
  const hash = keccak_256(address);
  let ret = "0x";
  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) > 7) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}

export function suffixTld(label: DomainString): DomainString {
  return label.replace(".dot", "") + ".dot";
}

export function removeTld(label: DomainString): DomainString {
  return label.replace(".dot", "");
}

function buildKeyValueObjects(keys: any, values: any) {
  let res: any[] = [];
  const times = keys.length === values.length ? keys.length : Math.min(keys.length, values.length);
  for (let i = 0; i < times; i++) {
    res.push({
      key: keys[i],
      value: values[i],
    });
  }
  return res;
}

export function getLabelhash(rawlabel: string): HexAddress {
  if (rawlabel === "[root]") {
    return "";
  }

  return rawlabel.startsWith("[") && rawlabel.endsWith("]") && rawlabel.length === 66 ? "0x" + rawlabel.slice(1, -1) : "0x" + keccak_256(rawlabel);
}

function decodeLabelhash(hash: string): string {
  if (!(hash.startsWith("[") && hash.endsWith("]") && hash.length === 66)) {
    throw Error("Expected encoded labelhash in [hash] form");
  }
  return `${hash.slice(1, -1)}`;
}

export const emptyAddress = "0x0000000000000000000000000000000000000000";
export const weirdNode = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const baseLabel = sha3("dot");
export const baseNode = getNamehash("dot");
export const nonode = "0x0000000000000000000000000000000000000000000000000000000000001234";

export const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];
export const ADDRESS_RECORD_KEYS = ["contenthash", "BTC", "ETH", "DOT", "KSM", "cname"];

const tld = "dot";

export class SDK {
  pns: IPNS;
  controller: IController;
  resolver: IResolver;
  signer: Web3Signer;

  constructor(pnsAddress: string, controllerAddress: string, signer: Web3Signer) {
    this.pns = IPNS__factory.connect(pnsAddress, signer);
    this.resolver = IResolver__factory.connect(pnsAddress, signer);
    this.controller = IController__factory.connect(controllerAddress, signer);
    this.signer = signer;
  }

  namehash(name: string) {
    return getNamehash(name);
  }

  ownerOfId(tokenId: TokenId) {
    return this.pns.ownerOf(tokenId);
  }

  ownerOfName(name: DomainString) {
    let tokenId = getNamehash(name);
    return this.pns.ownerOf(tokenId);
  }

  exists(name: DomainString): Promise<boolean> {
    let tokenId = getNamehash(name);
    return this.pns.exists(tokenId);
  }

  async getOwner(name: DomainString) {
    let tokenId = getNamehash(name);
    if (await this.pns.exists(tokenId)) {
      return this.pns.ownerOf(tokenId);
    } else {
      return emptyAddress;
    }
  }

  async totalRegisterPrice(name: LabelString, duration: number): Promise<BigNumber> {
    return this.controller.totalRegisterPrice(name, duration);
  }

  async renewPrice(name: LabelString, duration: number): Promise<BigNumber> {
    return this.controller.renewPrice(name, duration);
  }

  async getPnsRoot(): Promise<HexAddress> {
    let ownable = IOwnable__factory.connect(this.pns.address, this.signer);
    return ownable.root();
  }

  async getControllerRoot(): Promise<HexAddress> {
    let ownable = IOwnable__factory.connect(this.controller.address, this.signer);
    return ownable.root();
  }

  async basePrice(name: LabelString): Promise<BigNumber> {
    return this.controller.basePrice(name);
  }

  async rentPrice(name: LabelString, duration: number): Promise<BigNumber> {
    return this.controller.rentPrice(name, duration);
  }

  async getPrices() {
    return this.controller.getPrices();
  }

  async getTokenPrice() {
    return this.controller.getTokenPrice();
  }

  async nameExpires(label: DomainString): Promise<BigNumber> {
    label = suffixTld(label);
    return this.pns.expire(getNamehash(label));
  }

  async available(label: DomainString): Promise<boolean> {
    label = suffixTld(label);
    return this.pns.available(getNamehash(label));
  }

  async register(label: DomainString, account: string, duration: number) {
    const price = await this.totalRegisterPrice(label, duration);
    return this.controller.nameRegister(label, account, duration, { value: price });
  }

  async registerWithConfig(name: DomainString, to: string, duration: number, data: number, keysHash: string[], values: string[]) {
    const price = await this.totalRegisterPrice(name, duration);
    return this.controller.nameRegisterWithConfig(name, to, duration, data, keysHash, values, { value: price });
  }

  async mintSubdomain(newOwner: HexAddress, name: DomainString, label: LabelString) {
    let tokenId = getNamehash(name);
    return this.pns.mintSubdomain(newOwner, tokenId, label);
  }

  async approve(name: DomainString, approved: HexAddress) {
    name = suffixTld(name);
    let tokenId = getNamehash(name);
    return this.pns.approve(approved, tokenId);
  }

  async getApproved(name: DomainString): Promise<HexAddress> {
    name = suffixTld(name);
    let tokenId = getNamehash(name);
    return await this.pns.getApproved(tokenId);
  }

  async setName(addr: HexAddress, name: DomainString, resv?: IResolver) {
    const tokenId = getNamehash(name);
    return this.resolver.setName(addr, tokenId);
  }

  async getName(addr: HexAddress): Promise<BigNumber> {
    return this.resolver.getName(addr);
  }

  async setNftName(nftAddr: HexAddress, nftTokenId: string, nameTokenId: TokenId) {
    return this.resolver.setNftName(nftAddr, nftTokenId, nameTokenId);
  }

  async getNftName(nftAddr: HexAddress, nftTokenId: string) {
    return this.resolver.getNftName(nftAddr, nftTokenId);
  }

  async getKey(name: DomainString, key: string): Promise<string> {
    const tokenId = getNamehash(name);
    return this.resolver.get(key, tokenId);
  }

  async setKeysByHash(name: DomainString, keys: string[], values: string[]) {
    const tokenId = getNamehash(name);
    return this.resolver.setManyByHash(keys, values, tokenId);
  }

  async getKeys(name: DomainString, key: string[], resv?: IResolver): Promise<string[]> {
    const tokenId = getNamehash(name);
    return this.resolver.getMany(key, tokenId);
  }

  async getKeysByHash(name: DomainString, key: string[], resv?: IResolver) {
    const tokenId: TokenId = getNamehash(name);
    return this.resolver.getManyByHash(key as any, tokenId);
  }

  async getDomainDetails(name: DomainString): Promise<DomainDetails> {
    const nameArray = name.split(".");
    const label = nameArray[0];
    const labelhash = getLabelhash(label);

    const totalKeys = [...TEXT_RECORD_KEYS.map((key) => "text." + key), ...ADDRESS_RECORD_KEYS];
    const [owner, records] = await Promise.all([this.getOwner(name), this.getKeys(name, totalKeys)]);

    const textRecords = buildKeyValueObjects(TEXT_RECORD_KEYS, records);
    const addrs = [
      { key: "BTC", value: records[TEXT_RECORD_KEYS.length + 1] },
      { key: "ETH", value: records[TEXT_RECORD_KEYS.length + 2] },
      { key: "DOT", value: records[TEXT_RECORD_KEYS.length + 3] },
      { key: "KSM", value: records[TEXT_RECORD_KEYS.length + 4] },
    ];

    return {
      name,
      label,
      labelhash,
      owner,
      textRecords: textRecords,
      addrs,
      cname: records[TEXT_RECORD_KEYS.length + 5],
      content: records[TEXT_RECORD_KEYS.length],
      contentType: "ipfs",
    };
  }

  async registerByManager(name: DomainString, to: string, duration: number, data: number, keyHashes: string[], values: string[]) {
    return this.controller.nameRegisterByManager(name, to, duration, data, keyHashes || [], values || []);
  }

  async renew(label: LabelString, duration: number) {
    const price = await this.renewPrice(label, duration);
    return this.controller.renew(label, duration, { value: price });
  }

  async renewByManager(label: LabelString, duration: number) {
    return this.controller.renewByManager(label, duration);
  }

  async transferName(name: DomainString, newOwner: HexAddress) {
    let namehash = getNamehash(name);
    let oldOwner = await this.getOwner(name);
    return this.pns.transferFrom(oldOwner, newOwner, namehash);
  }

  async burn(domain: string) {
    let id = getNamehash(domain);
    return await this.pns.burn(id);
  }
}
