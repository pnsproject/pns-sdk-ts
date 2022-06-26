import { ethers, Signer, BigNumber, BigNumberish } from "ethers";
import { keccak_256 } from "js-sha3";

import { Block, BlockTag, Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
import { Signer as Web3Signer } from "@ethersproject/abstract-signer";

import { RPC_URL, PnsApi, Chains, ContractAddrMap, PaymentAddrs, GraphUrl } from "./constants";
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
  cname: string
};

let provider: Web3Provider;
let signer: Web3Signer;
let account: string;
let networkId: number;
let customGql: string;

let pns: IPNS;
let controller: IController;
let resolver: IResolver;

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

export const emptyAddress = "0x0000000000000000000000000000000000000000";
export const weirdNode = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const baseLabel = sha3("dot");
export const baseNode = getNamehash("dot");
export const nonode = "0x0000000000000000000000000000000000000000000000000000000000001234";

export const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];
export const ADDRESS_RECORD_KEYS = ['contenthash', "BTC", "ETH", "DOT", "KSM", "cname"]

const tld = "dot";

export function getPnsAddr(): string {
  return pnsAddr;
}

export function getProvider(): Web3Provider {
  return provider;
}

export function getSigner(): Web3Signer {
  return signer;
}

export function getAccount(): string {
  return account;
}

export async function setSigner(_signer?: Web3Signer) {
  if (!_signer) throw "provider is empty";
  signer = _signer;
  account = await signer.getAddress();
}

export async function setProvider(_provider?: Web3Provider) {
  if (!!_provider) {
    provider = _provider;
  } else if (!!window && typeof (window as any).ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider((window as any).ethereum) as any;
  } else {
    console.log("cannot find a global `ethereum` object");
    provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL) as any;
    account = "0x0";
  }
  // if (!_provider) throw "provider is empty";
  // provider = _provider;

  networkId = (await provider.getNetwork()).chainId;
  console.log("network", networkId);
  return;
}

export async function setup(
  providerOpt?: Web3Provider,
  pnsAddress?: string,
  controllerAddress?: string,
  GraphUrl?: string) {
  await setProvider(providerOpt);

  let addrMap = ContractAddrMap[networkId];
  console.log("addrs", addrMap);

  pnsAddress = pnsAddress || addrMap.pns;
  controllerAddress = controllerAddress || addrMap.controller;

  if (GraphUrl) {
    customGql = GraphUrl
  }

  if (signer) {
    pns = IPNS__factory.connect(pnsAddress, signer);
    controller = IController__factory.connect(controllerAddress, signer);
    resolver = IResolver__factory.connect(pnsAddress, signer);
  } else {
    pns = IPNS__factory.connect(pnsAddress, provider);
    controller = IController__factory.connect(controllerAddress, provider);
    resolver = IResolver__factory.connect(pnsAddress, provider);
  }

  pnsAddr = pnsAddress;

  return {
    provider,
    pns,
    controller,
    resolver,
  };
}

export async function setupWithContract(providerOpt: Web3Provider, pnsContract: IPNS, registrarContract: IController, resolverContract: IResolver) {
  await setProvider(providerOpt);

  pns = pnsContract;
  controller = registrarContract;
  resolver = resolverContract;

  pnsAddr = pns.address;
  controllerAddr = controller.address;
  resolverAddr = resolver.address;

  return {
    provider,
    pns,
    controller,
    resolver,
  };
}

export async function getOwner(name: DomainString): Promise<HexAddress> {
  let tokenId = getNamehash(name);
  if (await pns.exists(tokenId)) {
    console.log("tokenId", tokenId);
    return pns.ownerOf(tokenId);
  } else {
    return emptyAddress;
  }
}

export async function getOwnerOf(tokenId: TokenId): Promise<HexAddress> {
  if (await pns.exists(tokenId)) {
    return pns.ownerOf(tokenId);
  } else {
    return emptyAddress;
  }
}

export async function ownerOfName(name: DomainString): Promise<HexAddress> {
  let tokenId = getNamehash(name);
  return pns.ownerOf(tokenId);
}

export async function ownerOfId(tokenId: TokenId): Promise<HexAddress> {
  return pns.ownerOf(tokenId);
}

export async function exists(name: DomainString): Promise<boolean> {
  let tokenId = getNamehash(name);
  return pns.exists(tokenId);
}

export async function totalRegisterPrice(name: LabelString, duration: number): Promise<BigNumber> {
  return controller.totalRegisterPrice(name, duration);
}

export async function renewPrice(name: LabelString, duration: number): Promise<BigNumber> {
  return controller.renewPrice(name, duration);
}

export async function getControllerRoot(): Promise<HexAddress> {
  let ownable = IOwnable__factory.connect(controller.address, provider);
  return ownable.root();
}

export async function transferController(newRoot: HexAddress) {
  let ownable = IOwnable__factory.connect(controller.address, signer);
  return ownable.transferRootOwnership(newRoot);
}

export async function basePrice(name: LabelString): Promise<BigNumber> {
  return controller.basePrice(name);
}

export async function rentPrice(name: LabelString, duration: number): Promise<BigNumber> {
  return controller.rentPrice(name, duration);
}

export async function getPrices() {
  return controller.getPrices();
}

export async function getTokenPrice() {
  return controller.getTokenPrice();
}

export async function nameExpires(label: DomainString): Promise<BigNumber> {
  label = suffixTld(label);
  return controller.expire(getNamehash(label));
}

export async function available(label: DomainString): Promise<boolean> {
  label = suffixTld(label);
  return controller.available(getNamehash(label));
}

export async function register(label: DomainString, account: string, duration: number) {
  const price = await totalRegisterPrice(label, duration);
  return controller.nameRegister(label, account, duration, { value: price });
}

export async function registerWithConfig(name: DomainString, to: string, duration: number, data: number, keysHash: string[], values: string[]) {
  const price = await totalRegisterPrice(name, duration);
  return controller.nameRegisterWithConfig(name, to, duration, data, keysHash, values, { value: price });
}

export function mintSubdomain(newOwner: HexAddress, name: DomainString, label: LabelString) {
  let tokenId = getNamehash(name);
  return controller.mintSubdomain(newOwner, tokenId, label);
}

export async function approve(name: DomainString, approved: HexAddress) {
  name = suffixTld(name);
  let tokenId = getNamehash(name);
  return pns.approve(approved, tokenId);
}

export async function getApproved(name: DomainString): Promise<HexAddress> {
  name = suffixTld(name);
  let tokenId = getNamehash(name);
  return await pns.getApproved(tokenId);
}

export function suffixTld(label: DomainString): DomainString {
  return label.replace(".dot", "") + ".dot";
}

export function removeTld(label: DomainString): DomainString {
  return label.replace(".dot", "");
}

export async function setName(addr: HexAddress, name: DomainString, resv?: IResolver) {
  const tokenId = getNamehash(name);
  return resolver.setName(addr, tokenId);
}

export async function getName(addr: HexAddress, resv?: IResolver): Promise<BigNumber> {
  return resolver.getName(addr);
}

export async function setNftName(nftAddr: HexAddress, nftTokenId: string, nameTokenId: TokenId) {
  return resolver.setNftName(nftAddr, nftTokenId, nameTokenId);
}

export async function getNftName(nftAddr: HexAddress, nftTokenId: string) {
  return resolver.getNftName(nftAddr, nftTokenId);
}

export async function getKey(name: DomainString, key: string, resv?: IResolver): Promise<string> {
  const tokenId = getNamehash(name);
  return resolver.get(key, tokenId);
}

export async function setKeysByHash(name: DomainString, keys: string[], values: string[], resv?: IResolver) {
  const tokenId = getNamehash(name);
  return resolver.setManyByHash(keys, values, tokenId);
}

export async function getKeys(name: DomainString, key: string[], resv?: IResolver): Promise<string[]> {
  const tokenId = getNamehash(name);
  return resolver.getMany(key, tokenId);
}

export async function getKeysByHash(name: DomainString, key: string[], resv?: IResolver) {
  const tokenId: TokenId = getNamehash(name);
  return resolver.getManyByHash(key as any, tokenId);
}
// return await resv.getMany(key, tokenId);

function buildKeyValueObjects(keys: any, values: any) {
  let res: any[] = []
  const times = keys.length === values.length ? keys.length : Math.min(keys.length, values.length)
  for (let i = 0 ;i < times; i++) {
    res.push({
      key: keys[i],
      value: values[i]
    })
  }
  return res
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

export async function getDomainDetails(name: DomainString): Promise<DomainDetails> {
  const nameArray = name.split(".");
  const label = nameArray[0];
  const labelhash = getLabelhash(label);

  const totalKeys = [...TEXT_RECORD_KEYS.map((key) => 'text.' + key), ...ADDRESS_RECORD_KEYS ]
  const [owner, records] = await Promise.all([
    getOwner(name),
    getKeys(name, totalKeys)
  ])

  const textRecords = buildKeyValueObjects(TEXT_RECORD_KEYS, records);
  const addrs = [
    { key: "BTC", value: records[TEXT_RECORD_KEYS.length + 1] },
    { key: "ETH", value: records[TEXT_RECORD_KEYS.length + 2] },
    { key: "DOT", value: records[TEXT_RECORD_KEYS.length + 3] },
    { key: "KSM", value: records[TEXT_RECORD_KEYS.length + 4] },
  ]

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

export async function nameRedeem(label: DomainString, account: string, duration: number, deadline: number, code: string) {
  return controller.nameRedeem(label, account, duration, deadline, code);
}

export async function registerByManager(name: DomainString, to: string, duration: number, data:number, keyHashes: string[], values: string[]) {
  return controller.nameRegisterByManager(name, to, duration, data, keyHashes || [], values || []);
}

export async function renew(label: LabelString, duration: number) {
  const price = await renewPrice(label, duration);
  return controller.renew(label, duration, { value: price });
}

export async function renewByManager(label: LabelString, duration: number) {
  return controller.renewByManager(label, duration);
}

export async function transferName(name: DomainString, newOwner: HexAddress) {
  let namehash = getNamehash(name);
  let oldOwner = await getOwner(name);
  return pns.transferFrom(oldOwner, newOwner, namehash);
}

export async function registerPayWithOtherCurrency(chain: string, label: DomainString, duration: number): Promise<any> {
  // todo : if user close before tx success, need recovering
  let price = await totalRegisterPrice(label, duration);
  let tx = await signer.sendTransaction({
    to: PaymentAddrs[chain] as string,
    value: price,
  });
  return {
    data: {
      chain: chain,
      label: label,
      duration: duration,
      txhash: tx.hash,
      value: tx.value.toString(),
      from: tx.from,
      to: tx.to,
      managed: true,
    },
    tx: tx,
  };
}

// sign message and generate redeem code

export function abiDataEncode(data: any, datatype: string): Buffer {
  let encoded = abiCoder.encode([datatype], [data]).slice(2);
  return Buffer.from(encoded, "hex");
}

export function encodeMsg(nameTokenId: string, address: string, duration: number, deadline: number): Uint8Array {
  let nameTokenIdBuffer = abiDataEncode(nameTokenId, "uint");
  let addressBuffer = abiDataEncode(address, "uint160").slice(12);
  let durationBuffer = abiDataEncode(duration, "uint");
  let deadlineBuffer = abiDataEncode(deadline, "uint");
  // console.log('data', Buffer.concat([nameTokenIdBuffer, addressBuffer, durationBuffer]).toString('hex'))
  // address type has strange padding, which doesn't work
  // console.log(ethers.utils.defaultAbiCoder.encode(['uint256', 'address', 'uint256'], [nameTokenId, address, duration]))
  return Buffer.concat([nameTokenIdBuffer, addressBuffer, durationBuffer, deadlineBuffer]);
}

export function hashMsg(data: Uint8Array): Uint8Array {
  let hashed = "0x" + keccak_256(data);
  return ethers.utils.arrayify(hashed);
}

export async function generateRedeemCode(nameTokenId: string, address: string, duration: number, deadline: number, signer: any): Promise<string> {
  let msg = encodeMsg(nameTokenId, address, duration, deadline);
  let hashedMsg = hashMsg(msg);
  return signer.signMessage(hashedMsg);
}

export async function login() {
  if (!provider) {
    console.log("provider has not setting");
  }
  try {
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    signer = await provider.getSigner();
    account = await signer.getAddress();
    await setup();
  } catch (e) {
    console.log("provider has no signer");
  }
}

import { request, gql } from "graphql-request";
import { Network } from "@ethersproject/networks";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export type GraphDomainDetails = {
  id: string;
  name: string;
  parent: string;
  owner: string;
};

export function toChecksumAddress(address: string): string {
  address = address.toLowerCase().replace('0x', '')
  const hash =  keccak_256(address)
  let ret = '0x'
  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) > 7) {
      ret += address[i].toUpperCase()
    } else {
      ret += address[i]
    }
  }

 return ret
}

/** 列出用户的父级域名列表 */
export async function getDomains(account: string): Promise<GraphDomainDetails[]> {
  const checksumAddress = toChecksumAddress(account)
  const query = gql`
  query MyQuery($account: String!, $parent: String!) {
      subdomains(
        filter: {
          owner: {
            equalTo: $account
          }
          parent:{
            equalTo: $parent
          }
        }
      )
      {
        nodes {
          id
          name
          owner
          parent
        }
      }
 }
  `;
  const variables = {
    account: checksumAddress,
    parent: BigInt("0x3fce7d1364a893e213bc4212792b517ffc88f5b13b86c8ef9c8d390c3a1370ce"),
  };

  const graphUrl = customGql || GraphUrl[networkId]
  const resp = await request(graphUrl + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains.nodes;
}

/** 列出所有域名列表,包括父、子域名 */
export async function getAllDomains(account: string): Promise<GraphDomainDetails[]> {
  const checksumAddress = toChecksumAddress(account)
  const query = gql`
   query MyQuery($account: String!) {
      subdomains(
        filter: {
          owner: {
            equalTo: $account
          }
        }
      )
      {
        nodes {
          id
          name
          owner
          parent
        }
      }
   }
  `;
  const variables = {
    account: checksumAddress
  };

  const graphUrl = customGql || GraphUrl[networkId]
  const resp = await request(graphUrl + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains.nodes;
}

/** 列出用户的所有子域名列表 */
export async function getAllSubdomains(owner: string): Promise<GraphDomainDetails[]> {
  const checksumAddress = toChecksumAddress(account)
  const query = gql`
    query MyQuery($account: String!, $parent: String!) {
      subdomains(
        filter: {
          owner: {
            equalTo: $account
          }
          parent:{
            notEqualTo: $parent
          }
        }
      )
      {
        nodes {
          id
          name
          owner
          parent
        }
      }
    }
  `;
  const variables = {
    account: checksumAddress,
    parent: BigInt("0x3fce7d1364a893e213bc4212792b517ffc88f5b13b86c8ef9c8d390c3a1370ce"),
  };

  const graphUrl = customGql || GraphUrl[networkId]
  const resp = await request(graphUrl + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains.nodes;
}

/** 列出父级域名下的子域名列表 */
export async function getSubdomains(domain: string): Promise<GraphDomainDetails[]> {
  const query = gql`
    query MyQuery($parent: String!) {
      subdomains(
        filter: {
          parent:{
            equalTo: $parent
          }
        }
      )
      {
        nodes {
          id
          name
          owner
          parent
        }
      }
    }
  `;
  const variables = {
    parent: BigInt(getNamehash(domain)),
  };

  const graphUrl = customGql || GraphUrl[networkId]
  const resp = await request(graphUrl + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains.nodes;
}

export function logout() {}

export async function burn(domain: string) {
  let id = getNamehash(domain);
  return await controller.burn(id);
}
