import { ethers, Signer, BigNumber, BigNumberish } from "ethers";
import { keccak_256 } from "js-sha3";
import { Buffer } from "buffer/";

import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
import { Signer as Web3Signer } from "@ethersproject/abstract-signer";

import { RPC_URL, Chains, ContractAddrMap, PaymentAddrs, GraphUrl } from "./constants";
import { IPNS, IController, IResolver, IPNS__factory, IController__factory, IResolver__factory } from "./contracts";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

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

let provider: Web3Provider;
let signer: Web3Signer;
let account: string;
let chainId: number;

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
export const apiUrl = "https://polkanode.pns.link"

export const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];

const tld = "dot";

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
    provider = new ethers.providers.JsonRpcProvider(RPC_URL) as any;
    account = "0x0";
  }
  // if (!_provider) throw "provider is empty";
  // provider = _provider;

  chainId = (await provider.getNetwork()).chainId;
  console.log("network", chainId);
  return;
}

export async function setup(providerOpt?: Web3Provider, pnsAddress?: string, controllerAddress?: string, resolverAddress?: string) {
  await setProvider(providerOpt);

  let addrMap = ContractAddrMap[chainId];
  console.log("addrs", addrMap);

  pnsAddress = pnsAddress || addrMap.pns;
  controllerAddress = controllerAddress || addrMap.controller;
  resolverAddress = resolverAddress || addrMap.resolver;

  if (signer) {
    pns = IPNS__factory.connect(pnsAddress, signer);
    controller = IController__factory.connect(controllerAddress, signer);
    resolver = IResolver__factory.connect(resolverAddress, signer);
  } else {
    pns = IPNS__factory.connect(pnsAddress, provider);
    controller = IController__factory.connect(controllerAddress, provider);
    resolver = IResolver__factory.connect(resolverAddress, provider);
  }

  pnsAddr = pnsAddress;
  resolverAddr = resolverAddress;
  console.log({ pnsAddress, controllerAddress, resolverAddress });

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

export function getResolver(name: DomainString): Promise<HexAddress> {
  let tokenId = getNamehash(name);
  return pns.getResolver(tokenId);
}

export function getResolverById(tokenId: TokenId): Promise<HexAddress> {
  return pns.getResolver(tokenId);
}

export async function totalRegisterPrice(name: LabelString, duration: number): Promise<BigNumber> {
  return controller.totalRegisterPrice(name, duration);
}

export async function getControllerRoot(): Promise<HexAddress> {
  return controller.root();
}

export async function getControllerManager(): Promise<HexAddress> {
  return controller.manager();
}

export async function transferController(newRoot: HexAddress) {
  return controller.transferRootOwnership(newRoot);
}

export async function transferControllerManager(newRoot: HexAddress) {
  return controller.transferManagerOwnership(newRoot);
}

export async function basePrice(name: LabelString): Promise<BigNumber> {
  return controller.registerPrice(name);
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
  return controller.nameExpires(getNamehash(label));
}

export async function available(label: DomainString): Promise<boolean> {
  label = suffixTld(label);
  return controller.available(getNamehash(label));
}

export async function registerByManager(label: DomainString, account: string, duration: number) {
  return controller.nameRegisterByManager(label, account, duration, resolverAddr, emptyAddress);
}

export async function register(label: DomainString, account: string, duration: number) {
  const price = await totalRegisterPrice(label, duration);
  return controller.nameRegister(label, account, duration, { value: price });
}

export async function registerWithConfig(label: DomainString, account: string, duration: number, resolver: string, operator: string) {
  const price = await totalRegisterPrice(label, duration);
  return controller.nameRegisterWithConfig(label, account, duration, resolver, operator, [], [], { value: price });
}

export function mintSubdomain(name: DomainString, label: LabelString, newOwner: HexAddress) {
  let tokenId = getNamehash(name);
  return controller.setSubdomain(tokenId, label, newOwner);
}

export async function setResolver(name: DomainString, resolver?: HexAddress) {
  name = suffixTld(name);
  let tokenId = getNamehash(name);
  resolver = resolver || resolverAddr;
  return pns.setResolver(tokenId, resolver);
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

async function fetchResolver(tokenId: TokenId, resv?: IResolver): Promise<IResolver> {
  if (!resv) {
    const currResolver = await getResolverById(tokenId);
    return currResolver !== emptyAddress ? resolver.attach(currResolver) : resolver;
  } else {
    return resv;
  }
}

export async function setName(name: DomainString, resv?: IResolver) {
  const tokenId = getNamehash(name);
  return resolver.setName(tokenId);
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

export async function setKey(name: DomainString, key: string, value: string, resv?: IResolver) {
  const tokenId = getNamehash(name);
  resv = await fetchResolver(tokenId, resv);
  return resv.set(key, value, tokenId);
}

export async function getKey(name: DomainString, key: string, resv?: IResolver): Promise<string> {
  const tokenId = getNamehash(name);
  resv = await fetchResolver(tokenId, resv);
  return resv.get(key, tokenId);
}

export async function setKeys(name: DomainString, keys: string[], values: string[], resv?: IResolver) {
  const tokenId = getNamehash(name);
  resv = await fetchResolver(tokenId, resv);
  return resv.setMany(keys, values, tokenId);
}

export async function setKeysByHash(name: DomainString, keys: string[], values: string[], resv?: IResolver) {
  const tokenId = getNamehash(name);
  resv = await fetchResolver(tokenId, resv);
  return resv.setManyByHash(keys, values, tokenId);
}

export async function getKeys(name: DomainString, key: string[], resv?: IResolver): Promise<string[]> {
  const tokenId = getNamehash(name);
  resv = await fetchResolver(tokenId, resv);
  return await resv.getMany(key, tokenId);
}

export async function getKeysByHash(name: DomainString, key: string[], resv?: IResolver) {
  const tokenId: TokenId = getNamehash(name);
  resv = await fetchResolver(tokenId, resv);
  return resv.getManyByHash(key as any, tokenId);
}
// return await resv.getMany(key, tokenId);

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

export async function nameRedeem(account: string, code: string) {
  let resp = await fetch(`${apiUrl}/chain_${chainId}/redeem/redeem/use`, {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ code, owner: account }),
    method: "POST",
  });
  resp = await resp.json();
  return resp as any;
}

export async function nameRedeemAny(label: DomainString, account: string, code: string) {
  let resp = await fetch(`${apiUrl}/chain_${chainId}/redeem/redeem_any`, {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ code, owner: account, name: label }),
    method: "POST",
  });
  resp = await resp.json();
  return resp as any;
}

export async function renew(label: LabelString, duration: number) {
  const price = await rentPrice(label, duration);
  return controller.renew(label, duration, { value: price });
}

export async function transferName(name: DomainString, newOwner: HexAddress) {
  let namehash = getNamehash(name);
  let oldOwner = await getOwner(name);
  return pns["safeTransferFrom(address,address,uint256)"](oldOwner, newOwner, namehash);
}

export async function payDomainfee(chain: string, label: DomainString) {
  let tokenPrice = await getTokenPrice();
  let amount = 5;
  let fee = BigNumber.from(amount).mul("100000000000000000000000000").div(tokenPrice);

  // console.log("getTokenPrice", tokenPrice.toString());
  // console.log("fee", fee.toString());
  // console.log("fee price", fee.toString());
  // console.log("price of fee", tokenPrice.mul(fee).div("100000000000000000000000000").toString());

  let receiver = PaymentAddrs[chain] as string;
  let encoded = abiCoder.encode(["uint256", "string"], [11, label]);

  let tx = await signer.sendTransaction({
    to: receiver,
    value: priceBuffer(fee),
    data: encoded,
  });

  console.log("tx wait", await tx.wait());

  let resp = await fetch("http://localhost:8080/crowdloan/pay-domainfee", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      chain: "avax",
      label: label,
      txhash: tx.hash,
      amount: amount,
    }),
  });
  let respjson = await resp.json();
  console.log("respjson", respjson);
}

function priceBuffer(price: BigNumber): BigNumber {
  return price.mul(105).div(100);
}

export async function directPay(chain: string, label: DomainString, duration: number, address: HexAddress) {
  // todo : if user close before tx success, need recovering
  let fee = await totalRegisterPrice(label, duration);
  console.log("fee", fee);
  console.log("pay addr", PaymentAddrs[chain]);
  let encoded = abiCoder.encode(["uint256", "string", "address", "uint256"], [10, label, address, duration]);
  // console.log('encoded', encoded)
  // console.log('decoded', abiCoder.decode(["uint256", "string", "address", "uint256"], encoded))

  let receiver = PaymentAddrs[chain] as string;

  let tx = await signer.sendTransaction({
    to: receiver,
    value: priceBuffer(fee),
    data: encoded,
  });

  console.log("tx wait", await tx.wait());

  let resp = await fetch("http://localhost:8080/proxy/direct-register", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      chain: "avax",
      label: label,
      duration: duration,
      from: address,
      to: receiver,
      value: tx.value.toString(),
      txhash: tx.hash,
      managed: false,
    }),
  });
  let respjson = await resp.json();
  console.log("respjson", respjson);

  return {
    chain: chain,
    label: label,
    duration: duration,
    txhash: tx.hash,
    value: tx.value.toString(),
    from: tx.from,
    to: tx.to,
    managed: true,
    tx: tx,
  };
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

export function encodeMsg(nameTokenId: string, address: string, duration: number): Uint8Array {
  let nameTokenIdBuffer = abiDataEncode(nameTokenId, "uint");
  let addressBuffer = abiDataEncode(address, "uint160").slice(12);
  let durationBuffer = abiDataEncode(duration, "uint");
  // console.log('data', Buffer.concat([nameTokenIdBuffer, addressBuffer, durationBuffer]).toString('hex'))
  // address type has strange padding, which doesn't work
  // console.log(ethers.utils.defaultAbiCoder.encode(['uint256', 'address', 'uint256'], [nameTokenId, address, duration]))
  return Buffer.concat([nameTokenIdBuffer, addressBuffer, durationBuffer]);
}

export function hashMsg(data: Uint8Array): Uint8Array {
  let hashed = "0x" + keccak_256(data);
  return ethers.utils.arrayify(hashed);
}

export async function generateRedeemCode(nameTokenId: string, address: string, duration: number, signer: any): Promise<string> {
  let msg = encodeMsg(nameTokenId, address, duration);
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

export async function logout() {
  signer = null;
  account = "0x0";
  await setup();
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

import { request, gql } from "graphql-request";

export type GraphDomainDetails = {
  id: string;
  name: string;
  parent: string;
  owner: string;
};

/** 列出用户的域名列表 */
export async function getDomains(account: string): Promise<GraphDomainDetails[]> {
  const query = gql`
    query Subdomains($account: Bytes!, $parent: BigInt!) {
      subdomains(where: { owner: $account, parent: $parent }) {
        id
        name
        parent
        owner
      }
    }
  `;
  const variables = {
    account: account,
    parent: BigInt("0x3fce7d1364a893e213bc4212792b517ffc88f5b13b86c8ef9c8d390c3a1370ce"),
  };

  let resp = await request(GraphUrl[chainId] + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains;
}

/** 列出子域名列表 */
export async function getSubdomains(domain: string): Promise<GraphDomainDetails[]> {
  const query = gql`
    query Subdomains($parent: BigInt!) {
      subdomains(where: { parent: $parent }) {
        id
        name
        parent
        owner
      }
    }
  `;
  const variables = {
    parent: BigInt(getNamehash(domain)),
  };

  let resp = await request(GraphUrl[chainId] + "/subgraphs/name/name-graph", query, variables);

  return resp.subdomains;
}
