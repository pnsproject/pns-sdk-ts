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
    pns: "0xAFA4B39B0F5635563704D9C47283e92281a47470",
    controller: "0x3cB64FaC26447B2F92EF7732dF948bEb08Df8d32",
    resolver: "0x278AC741C8864A0A907177801A5761451E494e63",
  },
  31337: {
    pns: "0x8ba579D0BB25b2CC96cC971F07De1E26211D3669",
    controller: "0x2B3729d1805351a324094e5A0b086a4218CE0D56",
    resolver: "0x451901E4aBFf23005A8B51b030dceD324EDE88A9",
  },
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

