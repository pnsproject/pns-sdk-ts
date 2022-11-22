export const Chains: any = {
  1284: {
    name: "Moonbeam",
    chain: "MOON",
    network: "mainnet",
    rpc: ["https://rpc.api.moonbeam.network"],
    faucets: [],
    nativeCurrency: {
      name: "Glimmer",
      symbol: "GLMR",
      decimals: 18,
    },
    infoURL: "https://moonbeam.network/networks/moonbeam/",
    shortName: "mbeam",
    chainId: 1284,
    networkId: 1284,
  },
  1287: {
    name: "Moonbase Alpha",
    chain: "MOON",
    network: "testnet",
    rpc: ["https://rpc.api.moonbase.moonbeam.network"],
    faucets: ['https://apps.moonbeam.network/moonbase-alpha/faucet/'],
    nativeCurrency: {
      name: "DEV",
      symbol: "DEV",
      decimals: 18,
    },
    infoURL: "https://moonbase.moonscan.io/",
    shortName: "Moonbase",
    chainId: 1287,
    networkId: 1287,
  },
};

export interface IContractAddrs {
  pns: string;
  controller: string;
  forwarder: string;
  priceOracle: string;
}

export interface IContractAddrsMap {
  [index: number]: IContractAddrs;
}

export const ContractAddrMap: IContractAddrsMap = {
  1284: {
    pns: "0x7d5F0398549C9fDEa03BbDde388361827cb376D5",
    controller: "0x8113e4070297b22D943241054a9dbDC395Bc6eaa",
    forwarder: "0x46388408c8828085f70dF7f8c3e7520B16e33391",
    priceOracle: "0x4497B606be93e773bbA5eaCFCb2ac5E2214220Eb"
  },
  1287: {
    pns: "0x94097B44C097070af387a0804977BC465082a633",
    controller: "0x12D6B8B62d12c2FE731f268205e42DA5CA5d46A2",
    forwarder: "0xba14018A84Ebd0fcaE70A863C1bDA19A7ec9C2f8",
    priceOracle: "0x4D595fd67f0E1292d6335EE0bf3Ebe85f7AF4B9F"
  },
  31337: { // local testnet
    pns: "0x",
    controller: "0x",
    forwarder: "0x",
    priceOracle: "0x"
  },
};

export const PaymentAddrs: any = {
  glmr: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  eth: "",
  avax: "",
  bsc: "",
  dot: "",
  ksm: "",
};

export const RPC_URL = "https://rpc.api.moonbeam.network";

export const GraphUrl: any = {
  1284: "",
  1287: "",
};

export const PnsApi = "https://api-rpc.pns.link";
