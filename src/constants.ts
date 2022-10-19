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
}

export interface IContractAddrsMap {
  [index: number]: IContractAddrs;
}

export const ContractAddrMap: IContractAddrsMap = {
  43113: {
    pns: "0x98aa22cEeFc1567Ef9D573cedde00622daf23891",
    controller: "0xF3f05C76f7c9EcEeA063A00e8d1c6eE2422d18eC"
  },
  1284: {
    pns: "0x7d5F0398549C9fDEa03BbDde388361827cb376D5",
    controller: "0x8113e4070297b22D943241054a9dbDC395Bc6eaa",
  },
  1287: {
    pns: "0xf24e64621c9df0b4b0f0bc03c74af93955f69825",
    controller: "0xaf5B6573ADBE5126FB2fc5e60FB7964b1c225dF9",
  },
};

export const PaymentAddrs: any = {
  eth: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  avax: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  movr: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  bsc: "0x0b23E3588c906C3F723C58Ef4d6baEe7840A977c",
  dot: "",
  ksm: "",
};

// export const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
export const RPC_URL = "https://rpc.api.moonbeam.network";

// export const PriceOracleAddr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"; // ETH / USD on mainnet
// export const PriceOracleAddr = "0x5498BB86BC934c8D34FDA08E81D444153d0D06aD"; // AVAX / USD on fuji
// export const PriceOracleAddr = "0x3f8BFbDc1e79777511c00Ad8591cef888C2113C1"; // MOVR / USD on MOVR
export const PriceOracleAddr = "0xdb4890df1f92Cf3915f4d8230655185902a61061"; // GLMR / USD on GLMR

export const GraphUrl: any = {
  1284: "https://moonbeamgraph.test-pns-link.com/subgraphs/name/graphprotocol/pns",
  1287: "https://api.subquery.network/sq/pnsproject/pnstest",
  43113: "https://fuji-graph.pns.link"
};

export const PnsApi = "https://api-rpc.pns.link";
