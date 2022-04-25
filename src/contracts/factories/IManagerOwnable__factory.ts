/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IManagerOwnable, IManagerOwnableInterface } from "../IManagerOwnable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isManager",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "root",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address",
      },
      {
        internalType: "bool",
        name: "role",
        type: "bool",
      },
    ],
    name: "setManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferRootOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IManagerOwnable__factory {
  static readonly abi = _abi;
  static createInterface(): IManagerOwnableInterface {
    return new utils.Interface(_abi) as IManagerOwnableInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IManagerOwnable {
    return new Contract(address, _abi, signerOrProvider) as IManagerOwnable;
  }
}
