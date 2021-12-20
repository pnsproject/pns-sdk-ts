import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from "js-sha3";
import { Buffer } from "buffer/";

import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
import { Signer as Web3Signer } from "@ethersproject/abstract-signer";

import { ResolverAbi, ControllerAbi, PnsAbi } from "./abi";
import { Chains, IContractAddrs, IContractAddrsMap, ContractAddrMap } from "./constants";

import { request, gql } from "graphql-request";

export type HexAddress = string;

export type DomainString = string;

export interface ContentType {
  value: string;
  contentType: string;
}

declare abstract class Web3Provider extends AbstractWeb3Provider {
  abstract getSigner(): Promise<Web3Signer>;
}

export type GraphDomainDetails = {
  id: string;
  name: string;
  parent: string;
  owner: string;
};

export type DomainDetails = {
  name: string;
  label: string;
  labelhash: string;
  owner: string;
  nameResolver: string;

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

export const formatEther = ethers.utils.formatEther;
export const abiCoder = ethers.utils.defaultAbiCoder;

const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];

const emptyAddress = "0x0000000000000000000000000000000000000000";
const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";

const tld = "dot";
const DAYS = 24 * 60 * 60;
const INFURA_URL = "https://api.avax-test.network/ext/bc/C/rpc";

let provider: Web3Provider;
let signer: Web3Signer;
let account: string;
let networkId: number;

let pns: any;
let resolver: any;
let controller: any;

let pnsAddr: string;
let resolverAddr: string;
let registrarAddr: string;

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

export async function switchChain(chainId: number): Promise<any> {
  let chain: any = Chains[chainId];
  if (!chain) {
    throw new Error("chainId no exists");
  }

  const params = {
    chainId: ethers.utils.hexlify(chain.chainId), // A 0x-prefixed hexadecimal string
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol, // 2-6 characters long
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: chain.rpc,
    blockExplorerUrls: [chain.infoURL],
  };

  return await (window as any).ethereum.request({
    method: "wallet_addEthereumChain",
    params: [params, account],
  });
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

export function getController(): any {
  return controller;
}

export function getResovlerContract(): any {
  return resolver;
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

export async function logout() {
  signer = null;
  account = "0x0";
  await setup();
}

export async function setSigner(_signer?: Web3Signer) {
  signer = _signer;
}

export async function setProvider(_provider?: Web3Provider) {
  if (!!_provider) {
    provider = _provider;
  } else if (!!window && typeof (window as any).ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider((window as any).ethereum) as any;
  } else {
    console.log("cannot find a global `ethereum` object");
    provider = new ethers.providers.JsonRpcProvider(INFURA_URL) as any;
    account = "0x0";
  }
  networkId = (await provider.getNetwork()).chainId;
  console.log("network", networkId);
  return;
}

export async function setup(pnsAddress?: string, resolverAddress?: string, controllerAddress?: string, providerOpt?: Web3Provider) {
  await setProvider(providerOpt);
  console.log("set provider");

  let addrMap = ContractAddrMap[networkId];
  console.log("addrs", addrMap);

  pnsAddress = pnsAddress || addrMap.pns;
  resolverAddress = resolverAddress || addrMap.resolver;
  controllerAddress = controllerAddress || addrMap.controller;

  if (signer) {
    pns = new ethers.Contract(pnsAddress, PnsAbi, signer);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, signer);
    controller = new ethers.Contract(controllerAddress, ControllerAbi, signer);
  } else {
    pns = new ethers.Contract(pnsAddress, PnsAbi, provider);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, provider);
    controller = new ethers.Contract(controllerAddress, ControllerAbi, provider);
  }

  pnsAddr = pnsAddress;
  resolverAddr = resolverAddress;

  return {
    provider,
    signer,
    pns,
    resolver,
    controller,
  };
}

export async function setupByContract(pnsContract: any, resolverContract: any, registrarContract: any, providerOpt: Web3Provider) {
  await setProvider(providerOpt);
  console.log("set provider");

  pns = pnsContract;
  resolver = resolverContract;
  controller = registrarContract;

  pnsAddr = pns.address;
  resolverAddr = resolver.address;

  return {
    provider,
    signer,
    pns,
    resolver,
    controller,
  };
}

/** 获取域名的当前所有者 */
export async function getOwner(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  if (await pns.exists(namehash)) {
    return pns.ownerOf(namehash);
  } else {
    return emptyAddress;
  }
}

export async function getOwnerByTokenId(tokenId: string): Promise<HexAddress> {
  if (await pns.exists(tokenId)) {
    return pns.ownerOf(tokenId);
  } else {
    return emptyAddress;
  }
}

/** 获取域名的当前所有者，如果域名为空，则抛出异常 */
export async function ownerOf(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return pns.ownerOf(namehash);
}

/** 获取域名的当前所有者 */
export async function exists(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return pns.exists(namehash);
}

/** 获取域名的解析器合约 */
export function getResolver(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return pns.getResolver(namehash);
}

/** 获得域名注册价格 */
export async function totalRegisterPrice(name: DomainString, duration: number): Promise<BigNumber> {
  return controller.totalRegisterPrice(name, duration);
}

export async function basePrice(name: DomainString): Promise<BigNumber> {
  return controller.registerPrice(name);
}

export async function rentPrice(name: DomainString, duration: number): Promise<BigNumber> {
  return controller.rentPrice(name, duration);
}

export async function root(): Promise<string> {
  return controller.root();
}

export async function transferRootOwnership(newRoot: string): Promise<void> {
  return controller.transferRootOwnership(newRoot);
}

export async function setCurrencyRate(currencyRate: number): Promise<void> {
  return controller.setCurrencyRate(currencyRate);
}

export async function setUsdBasePrices(rawBasePrices: number[]): Promise<void> {
  return controller.setRawBasePrices(rawBasePrices);
}

export async function setUsdRentPrices(rawRentPrices: number[]): Promise<void> {
  return controller.setRawRentPrices(rawRentPrices);
}

export async function getCurrencyRate(): Promise<BigNumber> {
  return controller.getCurrencyRate();
}

export async function getUsdBasePrices(): Promise<BigNumber[]> {
  return controller.getRawBasePrices();
}

export async function getUsdRentPrices(): Promise<BigNumber[]> {
  return controller.getRawRentPrices();
}

export async function setBasePrices(basePrices: number[]): Promise<void> {
  return controller.setBasePrices(basePrices);
}

export async function setRentPrices(rentPrices: number[]): Promise<void> {
  return controller.setRentPrices(rentPrices);
}

export async function getBasePrices(): Promise<BigNumber[]> {
  return controller.getBasePrices();
}

export async function getRentPrices(): Promise<BigNumber[]> {
  return controller.getRentPrices();
}

export async function nameExpires(label: DomainString): Promise<BigNumber> {
  label = suffixTld(label);
  return controller.nameExpires(getNamehash(label));
}

export async function available(label: DomainString): Promise<boolean> {
  label = suffixTld(label);
  return controller.available(getNamehash(label));
}

/** 域名注册 */
export async function register(label: DomainString, account: string, duration: number): Promise<{ wait: () => Promise<void> }> {
  const price = await totalRegisterPrice(label, duration);
  return controller.nameRegister(label, account, duration, { value: price, gasLimit: 800000 });
}

export async function registerWithConfig(
  label: DomainString,
  account: string,
  duration: number,
  resolver: string,
  operator: string
): Promise<{ wait: () => Promise<void> }> {
  const price = await totalRegisterPrice(label, duration);
  return controller.nameRegisterWithConfig(label, account, duration, resolver, operator, [], [], { value: price, gasLimit: 800000 });
}

/** 设置子域名
 * function mintSubdomain(bytes32 name, bytes32 label, address owner)
 * mintSubdomain('hero.dot', 'sub', '0x123456789') */
export function mintSubdomain(name: DomainString, label: string, newOwner: HexAddress): Promise<{ wait: () => Promise<void> }> {
  let namehash = getNamehash(name);
  return controller.setSubdomain(namehash, label, newOwner);
}

export async function controllerRoot(): Promise<{ wait: () => Promise<void> }> {
  return controller.root();
}

/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 name, address resolver)
 * setResolver('hero.dot', '0x123456789') */
export async function setResolver(name: DomainString, resolver?: HexAddress): Promise<{ wait: () => Promise<void> }> {
  name = suffixTld(name);
  let namehash = getNamehash(name);
  resolver = resolver || resolverAddr;
  return pns.setResolver(namehash, resolver);
}

export async function setOperator(name: DomainString, approved: HexAddress): Promise<{ wait: () => Promise<void> }> {
  name = suffixTld(name);
  let namehash = getNamehash(name);
  return pns.approve(approved, namehash);
}

export async function getOperator(name: DomainString): Promise<string> {
  name = suffixTld(name);
  let namehash = getNamehash(name);
  return await pns.getApproved(namehash);
}

export async function getApproved(tokenId: string): Promise<string> {
  return await pns.getApproved(tokenId);
}

export function suffixTld(label: string): DomainString {
  return label.replace(".dot", "") + ".dot";
}

export function removeTld(label: string): DomainString {
  return label.replace(".dot", "");
}

export async function setName(name: DomainString, resv?: any): Promise<{ wait: () => Promise<void> }> {
  const namehash = getNamehash(name);
  return resolver.setName(namehash);
}

export async function getName(addr: string, resv?: any): Promise<BigNumber> {
  return resolver.getName(addr);
}

export async function setNftName(addr: string, nftTokenId: string, nameTokenId: string): Promise<{ wait: () => Promise<void> }> {
  return resolver.setName(addr, nftTokenId, nameTokenId);
}

export async function getNftName(addr: string, nftTokenId: string): Promise<{ wait: () => Promise<void> }> {
  return resolver.getNftName(addr, nftTokenId);
}

export async function setKey(name: DomainString, key: string, value: string, resv?: any): Promise<void> {
  const namehash = getNamehash(name);
  if (!resv) {
    const currResolver = await getResolver(name);
    resv = currResolver !== emptyAddress ? resolver.attach(await getResolver(name)) : resolver;
  }
  await resv.set(key, value, namehash);
}

export async function getKey(name: DomainString, key: string, resv?: any): Promise<HexAddress> {
  const namehash = getNamehash(name);
  if (!resv) {
    const currResolver = await getResolver(name);
    resv = currResolver !== emptyAddress ? resolver.attach(await getResolver(name)) : resolver;
  }
  return await resv.get(key, namehash);
}

export async function setKeys(name: DomainString, keys: string[], values: string[], resv?: any): Promise<{ wait: () => Promise<void> }> {
  const namehash = getNamehash(name);
  if (!resv) {
    const currResolver = await getResolver(name);
    resv = currResolver !== emptyAddress ? resolver.attach(await getResolver(name)) : resolver;
  }
  return resv.setMany(keys, values, namehash);
}

export async function setKeysByHash(name: DomainString, keys: string[], values: string[], resv?: any): Promise<{ wait: () => Promise<void> }> {
  const namehash = getNamehash(name);
  if (!resv) {
    const currResolver = await getResolver(name);
    resv = currResolver !== emptyAddress ? resolver.attach(await getResolver(name)) : resolver;
  }
  return resv.setManyByHash(keys, values, namehash);
}

export async function getKeys(name: DomainString, key: string[], resv?: any): Promise<HexAddress> {
  const namehash = getNamehash(name);
  if (!resv) {
    const currResolver = await getResolver(name);
    resv = currResolver !== emptyAddress ? resolver.attach(await getResolver(name)) : resolver;
  }
  return await resv.getMany(key, namehash);
}

function buildKeyValueObjects(keys: any, values: any) {
  return values.map((record: any, i: any) => ({
    key: keys[i],
    value: record,
  }));
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

/** 获得域名详细信息 */
export async function getDomainDetails(name: DomainString): Promise<DomainDetails> {
  const nameArray = name.split(".");
  const label = nameArray[0];
  const labelhash = getLabelhash(label);
  const nameResolver = await getResolver(name);
  const owner = await getOwner(name);

  const promises = TEXT_RECORD_KEYS.map((key) => getKey(name, "text." + key));
  const records = await Promise.all(promises);
  let textRecords = buildKeyValueObjects(TEXT_RECORD_KEYS, records);

  const node = {
    name,
    label,
    labelhash,
    owner,
    nameResolver,
    textRecords: textRecords,
  };

  const content = await getKey(name, "contenthash");
  return {
    ...node,
    addrs: [
      { key: "BTC", value: await getKey(name, "BTC") },
      { key: "ETH", value: await getKey(name, "ETH") },
      { key: "DOT", value: await getKey(name, "DOT") },
      { key: "KSM", value: await getKey(name, "KSM") },
    ],
    content: content,
    contentType: "ipfs",
  };
}

export async function checkRedeem(nonce: number): Promise<boolean> {
  return controller.checkRedeem(nonce);
}

export async function mintRedeem(start: number, end: number): Promise<{ wait: () => Promise<void> }> {
  return controller.mintRedeem(start, end);
}

export async function nameRedeemAny(
  label: DomainString,
  account: string,
  duration: number,
  nonce: number,
  code: string
): Promise<{ wait: () => Promise<void> }> {
  return controller.nameRedeemAny(label, account, duration, nonce, code);
}

export async function renew(label: DomainString, duration: number): Promise<void> {
  const price = await rentPrice(label, duration);
  return controller.renew(label, duration, { value: price, gasLimit: 800000 });
}

const payAddrs = {
  eth: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  avax: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  movr: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  bsc: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  dot: "",
  ksm: "",
};

export async function registerPayWithOtherCurrency(chain: string, label: DomainString, duration: number): Promise<any> {
  // todo : if user close before tx success, need recovering
  let price = await totalRegisterPrice(label, duration);
  let tx = await signer.sendTransaction({
    to: payAddrs[chain],
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

// const apiUrl = "https://pns-shoacwf3rq-de.a.run.app";
const apiUrl = "https://backend.pns.link";

export async function registerWithProxy(data: any): Promise<any> {
  let signer = getSigner();
  let tokenId = getNamehash(`${data.label}.dot`);
  let timestamp = Number(Date.now().toString());
  let encoded = encodeData(tokenId, timestamp);
  let signature = await signing(encoded, signer);

  data.signature = signature;
  data.timestamp = timestamp;

  console.log("url", `${apiUrl}/proxy/register`);

  let resp = await fetch(`${apiUrl}/proxy/register`, {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  });
  resp = await resp.json();
  return resp as any;
}

export async function updateWithProxy(data: any): Promise<void> {
  let signer = getSigner();
  let tokenId = data.tokenId;
  let timestamp = Number(Date.now().toString());
  let encoded = encodeData(tokenId, timestamp);
  let signature = await signing(encoded, signer);

  data.signature = signature;
  data.timestamp = timestamp;

  let resp = await fetch(`${apiUrl}/proxy/update`, {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  });
  resp = await resp.json();
  return resp as any;
}

export async function transfer(
  name: DomainString,
  newOwner: HexAddress
): Promise<{
  wait: () => Promise<void>;
}> {
  let namehash = getNamehash(name);
  let oldOwner = await getOwner(name);
  return pns["safeTransferFrom(address,address,uint256)"](oldOwner, newOwner, namehash);
}

export function abiDataEncode(data: any, datatype: string): Buffer {
  let encoded = abiCoder.encode([datatype], [data]).slice(2);
  return Buffer.from(encoded, "hex");
}

export function encodeNameMsg(name: string, duration: number, nonce: number): Uint8Array {
  let durationBuffer = abiDataEncode(duration, "uint");
  let nonceBuffer = abiDataEncode(nonce, "uint");
  let encodeName = Buffer.from(name.slice(2), "hex");
  return Buffer.concat([encodeName, durationBuffer, nonceBuffer]);
}

export function encodeMsg(duration: number, nonce: number): Uint8Array {
  let durationBuffer = abiDataEncode(duration, "uint");
  let nonceBuffer = abiDataEncode(nonce, "uint");
  return Buffer.concat([durationBuffer, nonceBuffer]);
}

export function hashMsg(data: Uint8Array): Uint8Array {
  let hashed = "0x" + keccak_256(data);
  return ethers.utils.arrayify(hashed);
}

export async function generateRedeemCode(duration: number, nonce: number, signer: any): Promise<string> {
  let hashedMsg = hashMsg(encodeMsg(duration, nonce));
  return signer.signMessage(hashedMsg);
}

export function encodeData(data: string, ts: number): Uint8Array {
  let dataBuffer = abiDataEncode(data, "uint");
  let tsBuffer = abiDataEncode(ts, "uint");
  let combined = Buffer.concat([dataBuffer, tsBuffer]);
  return hashMsg(combined);
}

export async function signing(data: any, signer: any): Promise<string> {
  return signer.signMessage(data);
}

let graphUrl = "https://fuji-graph.pns.link";

/** 列出用户的域名列表 */
export async function getDomains(account: string): Promise<GraphDomainDetails[]> {
  const query = gql`
    query Subdomains($account: Bytes!) {
      subdomains(where: { owner: $account, parent: parseInt("0x3fce7d1364a893e213bc4212792b517ffc88f5b13b86c8ef9c8d390c3a1370ce",16) }) {
        id
        name
        parent
        owner
      }
    }
  `;

  const variables = {
    account: account,
  };

  let resp = await request(graphUrl + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains;
}

/** 列出子域名列表 */
export async function getSubdomains(domain: string): Promise<GraphDomainDetails[]> {
  const query = gql`
    query Subdomains($parent: Bytes!) {
      subdomains(where: { parent: $parent }) {
        id
        name
        parent
        owner
      }
    }
  `;

  const variables = {
    parent: parseInt(getNamehash(domain), 16),
  };

  let resp = await request(graphUrl + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains;
}

const backendUrl = "https://pns.gigalixirapp.com";

export async function getRedeemCode(code: string) {
  let resp = await fetch(`${backendUrl}/api/redeem_codes/${code}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "GET",
  });
  resp = await resp.json();
  return resp as any;
}

export async function useRedeemCode(code: string, owner: string) {
  let resp = await fetch(`${backendUrl}/api/redeem_codes/${code}/use`, {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ owner: owner }),
    method: "POST",
  });
  resp = await resp.json();
  return resp as any;
}
