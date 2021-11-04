import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from 'js-sha3';
import { Buffer as Buffer } from "buffer/";

import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider"
import { Signer as Web3Signer } from "@ethersproject/abstract-signer"

import { ResolverAbi, ControllerAbi, PnsAbi } from "./abi";
import { Chains, IContractAddrs, IContractAddrsMap, ContractAddrMap } from "./constants";


export type HexAddress = string;

export type DomainString = string;

export interface ContentType {
  value: string;
  contentType: string;
}

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

export const formatEther = ethers.utils.formatEther

const TEXT_RECORD_KEYS = ["email", "url", "avatar", "description", "notice", "keywords", "com.twitter", "com.github"];

const emptyAddress = "0x0000000000000000000000000000000000000000";
const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";

const tld = "dot";
const DAYS = 24 * 60 * 60;
const INFURA_URL = "https://rinkeby.infura.io/v3/75e0d27975114086be0463cf2597549e";


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

export async function switchChain(chainId: number): Promise<any> {
  let chain: any = Chains[chainId]
  if (!chain) {
    throw new Error('chainId no exists')
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
    blockExplorerUrls: [ chain.infoURL ]
  };

  return await (window as any).ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [params, account],
  })
}

export async function setProvider(providerOpt?: Web3Provider) {
  if (!!providerOpt) {
    provider = providerOpt;
    signer = await provider.getSigner();
    account = await signer.getAddress();
  } else if (!!window && typeof (window as any).ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider((window as any).ethereum) as any;
    try {
      signer = await provider.getSigner();
      account = await signer.getAddress();
    } catch (e) {
      console.log('provider has no signer')
    }
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

  let addrMap = ContractAddrMap[networkId]
  console.log('addrs', addrMap)

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

export async function setupByContract(pnsContract: any, resolverContract: any, registrarContract: string, providerOpt: Web3Provider) {
  await setProvider(providerOpt);
  console.log("set provider");

  pns = pnsContract
  resolver = resolverContract
  controller = registrarContract

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





