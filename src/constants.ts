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
    pns: "0xa591098680B1e183C332Ea8e2612a2Cf2e6ABC17",
    controller: "0xdABF214E5a833269c192D9d70efDdE174680628D",
    resolver: "0x81F82957608f74441E085851cA5Cc091b23d17A2",
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

export const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";

