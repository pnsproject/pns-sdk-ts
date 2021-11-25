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
  1287: {
    name: "Moonbase Alpha",
    chain: "MOON",
    network: "moonbase",
    rpc: ["https://rpc.testnet.moonbeam.network", "wss://wss.testnet.moonbeam.network"],
    faucets: [],
    nativeCurrency: {
      name: "Dev",
      symbol: "DEV",
      decimals: 18,
    },
    infoURL: "https://docs.moonbeam.network/networks/testnet/",
    shortName: "mbase",
    chainId: 1287,
    networkId: 1287,
  },
};

export interface IContractAddrs {
  pns: string;
  resolver: string;
  controller: string;
}

export interface IContractAddrsMap {
  [index: number]: IContractAddrs;
}

export const ContractAddrMap: IContractAddrsMap = {
  43113: {
    pns: "0x52275eb12373ac85D744Bb5f7c3aaC04730214Aa",
    resolver: "0xF849a7e6d890BbFD0ecF4d831a43167c5d73b734",
    controller: "0x9a8CD81e2452DD40E83f9bc6223F77E481e1671B",
  },
  1287: {
    pns: "0x631D7e6927dD0b40a9fe2AadB04A1E7FE0B9a0A6",
    resolver: "0xF62B0b48c81e1DA563CCAAf3e58857b03F166c93",
    controller: "0xD4995f4E828B16236E62111d38cB8388eaA5F64f",
  },
  4: {
    pns: "0xD436ee017DD85921f4b83dc9f190aD683921b0A9",
    resolver: "0x2541c5365A02e4D5cf4d05Bc2982a6AD4348512E",
    controller: "0x04f675fC7D9D514c01318A751CC10662eD18606a",
  },
};
