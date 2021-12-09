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
    pns: "0xC8470c4Ec64998d7C5499ae1F8Ab0b1Ec1dcf49F",
    resolver: "0x62163A78469e1737cffF6211BB8DAbAb376c4806",
    controller: "0xD27c46bA3E6038e5043b8241Bca828861f836222",
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
