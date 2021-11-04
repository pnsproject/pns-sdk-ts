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
    pns: "0x17Cf83bBCE053c264626cD46FE312368f0433127",
    resolver: "0xB1FaceBD0bA48B66fc5096CB6609df2C0B4199E1",
    controller: "0x01Eee6B2DC48810488B781F1Cdf0b4b2D73f2C1B",
  },
  1287: {
    pns: "0x04acC2f242D197f929448a81e5a927Aaa969c837",
    resolver: "0xfd6a62730c17Cc3a842963F70c95Be2b77DE0C90",
    controller: "0x64f58DaBFbAa801F247429656cD37d16231890De",
  },
  4: {
    pns: "0xD436ee017DD85921f4b83dc9f190aD683921b0A9",
    resolver: "0x2541c5365A02e4D5cf4d05Bc2982a6AD4348512E",
    controller: "0x04f675fC7D9D514c01318A751CC10662eD18606a",
  },
};
