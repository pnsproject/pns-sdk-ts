/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Greeter, GreeterInterface } from "../Greeter";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000907380380620009078339810160408190526200003491620001e2565b62000064604051806060016040528060228152602001620008e560229139826200008160201b620001c41760201c565b805162000079906000906020840190620000f3565b505062000337565b620000ce82826040516024016200009a929190620002c8565b60408051601f198184030181529190526020810180516001600160e01b03908116634b5c427760e01b17909152620000d216565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546200010190620002fa565b90600052602060002090601f01602090048101928262000125576000855562000170565b82601f106200014057805160ff191683800117855562000170565b8280016001018555821562000170579182015b828111156200017057825182559160200191906001019062000153565b506200017e92915062000182565b5090565b5b808211156200017e576000815560010162000183565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620001cc578181015183820152602001620001b2565b83811115620001dc576000848401525b50505050565b600060208284031215620001f557600080fd5b81516001600160401b03808211156200020d57600080fd5b818401915084601f8301126200022257600080fd5b81518181111562000237576200023762000199565b604051601f8201601f19908116603f0116810190838211818310171562000262576200026262000199565b816040528281528760208487010111156200027c57600080fd5b6200028f836020830160208801620001af565b979650505050505050565b60008151808452620002b4816020860160208601620001af565b601f01601f19169290920160200192915050565b604081526000620002dd60408301856200029a565b8281036020840152620002f181856200029a565b95945050505050565b600181811c908216806200030f57607f821691505b602082108114156200033157634e487b7160e01b600052602260045260246000fd5b50919050565b61059e80620003476000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610050575b600080fd5b61004e610049366004610381565b61006e565b005b610058610132565b604051610065919061047f565b60405180910390f35b61011b604051806060016040528060238152602001610546602391396000805461009790610499565b80601f01602080910402602001604051908101604052809291908181526020018280546100c390610499565b80156101105780601f106100e557610100808354040283529160200191610110565b820191906000526020600020905b8154815290600101906020018083116100f357829003601f168201915b505050505083610237565b805161012e9060009060208401906102d2565b5050565b60606000805461014190610499565b80601f016020809104026020016040519081016040528092919081815260200182805461016d90610499565b80156101ba5780601f1061018f576101008083540402835291602001916101ba565b820191906000526020600020905b81548152906001019060200180831161019d57829003601f168201915b5050505050905090565b61012e82826040516024016101da9291906104d4565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f4b5c4277000000000000000000000000000000000000000000000000000000001790526102b1565b6102ac83838360405160240161024f93929190610502565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f2ced7cef000000000000000000000000000000000000000000000000000000001790526102b1565b505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546102de90610499565b90600052602060002090601f0160209004810192826103005760008555610346565b82601f1061031957805160ff1916838001178555610346565b82800160010185558215610346579182015b8281111561034657825182559160200191906001019061032b565b50610352929150610356565b5090565b5b808211156103525760008155600101610357565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561039357600080fd5b813567ffffffffffffffff808211156103ab57600080fd5b818401915084601f8301126103bf57600080fd5b8135818111156103d1576103d161036b565b604051601f8201601f19908116603f011681019083821181831017156103f9576103f961036b565b8160405282815287602084870101111561041257600080fd5b826020860160208301376000928101602001929092525095945050505050565b6000815180845260005b818110156104585760208185018101518683018201520161043c565b8181111561046a576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006104926020830184610432565b9392505050565b600181811c908216806104ad57607f821691505b602082108114156104ce57634e487b7160e01b600052602260045260246000fd5b50919050565b6040815260006104e76040830185610432565b82810360208401526104f98185610432565b95945050505050565b6060815260006105156060830186610432565b82810360208401526105278186610432565b9050828103604084015261053b8185610432565b969550505050505056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a2646970667358221220d5cca539dcd950348bfdb46a93255f349258abcca1e4ede4133ac6180c6a98e864736f6c634300080900334465706c6f79696e67206120477265657465722077697468206772656574696e673a";

export class Greeter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Greeter> {
    return super.deploy(_greeting, overrides || {}) as Promise<Greeter>;
  }
  getDeployTransaction(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
