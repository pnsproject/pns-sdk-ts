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
    pns: "0x063BC6B51b890087C5b6cb3D5b21927160e7a892",
    controller: "0x90a08A9f43be11273D503fFf23D5596DFd65ADF3",
  },
  1285: {
    pns: "0x64f58DaBFbAa801F247429656cD37d16231890De",
    controller: "0x9a1006d456F9C7a5Ab2208E0f7e9DF9A438F7f73"
  },
  1284: {
    pns: "0x34Ef2EAeA4E7b8F6e8D629b2AdaEe8d1Fb641655",
    controller: "0x8ba579D0BB25b2CC96cC971F07De1E26211D3669"
  }
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
export const PriceOracleAddr = "0xab5Bd6580da3BE648638608897643b1D33b21c42"; // ETH / USD on hardhat

export const GraphUrl: any = {
  1285: "https://movr-graph.pns.link",
  1284: "https://glmr-graph.pns.link",
  43113: "https://fuji-graph.pns.link"
}

export const PnsApi = "https://api-rpc.pns.link"
