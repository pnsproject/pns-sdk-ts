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
    pns: "0x7dCb34e3617E88BD830F4C030B06201a69657173",
    controller: "0xf24e64621C9df0b4b0F0bc03c74AF93955F69825"
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
export const PriceOracleAddr = "0xa242Cb23053b23198B5eC9a10Ff83742A30bb0D3"; // ETH / USD on hardhat

export const GraphUrl: any = {
  1285: "https://movr-graph.pns.link",
  1284: "https://glmr-graph.pns.link",
  43113: "https://fuji-graph.pns.link"
}

export const PnsApi = "https://api-rpc.pns.link"
