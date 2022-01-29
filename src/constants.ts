export const Chains: any = {
  43113: {
    name: "Avalanche Fuji Testnet",
    chain: "AVAX",
    network: "testnet",
    rpc: ["https://api.avax-test.network/ext/bc/C/rpc"],
    faucets: ["https://faucet.avax-test.network/"],
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    infoURL: "https://cchain.explorer.avax-test.network",
    shortName: "Fuji",
    chainId: 43113,
    networkId: 1,
  },
  1285: {
    name: "Moonriver",
    chain: "MOON",
    rpc: [
      "https://rpc.moonriver.moonbeam.network",
      "wss://wss.moonriver.moonbeam.network"
    ],
    nativeCurrency: {
      name: "Moonriver",
      symbol: "MOVR",
      decimals: 18,
    },
    infoURL: "https://moonbeam.network/networks/moonriver/",
    shortName: "mriver",
    chainId: 1285,
    networkId: 1285,
  }
};

export interface IContractAddrs {
  pns: string;
  controller: string;
  resolver: string;
}

export interface IContractAddrsMap {
  [index: number]: IContractAddrs;
}

export const ContractAddrMap: IContractAddrsMap = {
  43113: {
    pns: "0x03A06c4ee14b8E499aC9d1C369F1f92c8b032D00",
    controller: "0xeAb2a7a0F48BDA36dA1D3Bdfa1AB5922A3327AD7",
    resolver: "0x4897B2A10A66d444027F3B05b2c21f873ad61D8f",
  },
  31337: {
    pns: "0x3d4FC217B07Be922B584a5995D76b511736AcAF3",
    controller: "0x04bc6B8361965A9158C6210A2927C7C7EBb165F0",
    resolver: "0x7004B76d3E1b7b84E8f2f47e3387EabFD7bc9c9D",
  },
  1285: {
    pns: "0x64f58DaBFbAa801F247429656cD37d16231890De",
    controller: "0x9a1006d456F9C7a5Ab2208E0f7e9DF9A438F7f73",
    resolver: "0x0A4d5F8E8e96E4537EbA6F3FD1142Bcb53B842bD",
  }
};

export const PaymentAddrs: any = {
  eth: "0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4",
  avax: "0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4",
  movr: "0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4",
  bsc: "0x7682Ba569E3823Ca1B7317017F5769F8Aa8842D4",
  dot: "",
  ksm: "",
};

export const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
