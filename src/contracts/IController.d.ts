/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IControllerInterface extends ethers.utils.Interface {
  functions: {
    "available(uint256)": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "capacity(uint256)": FunctionFragment;
    "children(uint256)": FunctionFragment;
    "expires(uint256)": FunctionFragment;
    "getPrices()": FunctionFragment;
    "getTokenPrice()": FunctionFragment;
    "manager()": FunctionFragment;
    "nameExpires(uint256)": FunctionFragment;
    "nameRedeem(string,address,uint256,bytes)": FunctionFragment;
    "nameRedeemWithConfig(string,address,uint256,bytes,address,address)": FunctionFragment;
    "nameRegister(string,address,uint256)": FunctionFragment;
    "nameRegisterByManager(string,address,uint256,address,address)": FunctionFragment;
    "nameRegisterWithConfig(string,address,uint256,address,address,uint256[],string[])": FunctionFragment;
    "origin(uint256)": FunctionFragment;
    "registerPrice(string)": FunctionFragment;
    "renew(string,uint256)": FunctionFragment;
    "renewByRoot(string,uint256)": FunctionFragment;
    "rentPrice(string,uint256)": FunctionFragment;
    "root()": FunctionFragment;
    "setCapacity(uint256,uint256)": FunctionFragment;
    "setPrices(uint256[],uint256[])": FunctionFragment;
    "setRegistration(bool)": FunctionFragment;
    "setSubdomain(uint256,string,address)": FunctionFragment;
    "totalRegisterPrice(string,uint256)": FunctionFragment;
    "transferManagerOwnership(address)": FunctionFragment;
    "transferRootOwnership(address)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "available", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "capacity", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "children", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "expires", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "getPrices", values?: undefined): string;
  encodeFunctionData(functionFragment: "getTokenPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(functionFragment: "nameExpires", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "nameRedeem", values: [string, string, BigNumberish, BytesLike]): string;
  encodeFunctionData(functionFragment: "nameRedeemWithConfig", values: [string, string, BigNumberish, BytesLike, string, string]): string;
  encodeFunctionData(functionFragment: "nameRegister", values: [string, string, BigNumberish]): string;
  encodeFunctionData(functionFragment: "nameRegisterByManager", values: [string, string, BigNumberish, string, string]): string;
  encodeFunctionData(functionFragment: "nameRegisterWithConfig", values: [string, string, BigNumberish, string, string, BigNumberish[], string[]]): string;
  encodeFunctionData(functionFragment: "origin", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "registerPrice", values: [string]): string;
  encodeFunctionData(functionFragment: "renew", values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: "renewByRoot", values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: "rentPrice", values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: "root", values?: undefined): string;
  encodeFunctionData(functionFragment: "setCapacity", values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: "setPrices", values: [BigNumberish[], BigNumberish[]]): string;
  encodeFunctionData(functionFragment: "setRegistration", values: [boolean]): string;
  encodeFunctionData(functionFragment: "setSubdomain", values: [BigNumberish, string, string]): string;
  encodeFunctionData(functionFragment: "totalRegisterPrice", values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: "transferManagerOwnership", values: [string]): string;
  encodeFunctionData(functionFragment: "transferRootOwnership", values: [string]): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "capacity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "children", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "expires", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrices", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTokenPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nameExpires", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nameRedeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nameRedeemWithConfig", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nameRegister", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nameRegisterByManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nameRegisterWithConfig", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "origin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "renewByRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setCapacity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPrices", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRegistration", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSubdomain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalRegisterPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transferManagerOwnership", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transferRootOwnership", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "BasePriceChanged(uint256[])": EventFragment;
    "CapacityUpdated(uint256,uint256)": EventFragment;
    "ManagerOwnershipTransferred(address,address)": EventFragment;
    "NameRegistered(string,uint256,address,uint256,uint256)": EventFragment;
    "NameRenewed(string,uint256,uint256,uint256)": EventFragment;
    "NewSubdomain(string,uint256,uint256,address)": EventFragment;
    "RentPriceChanged(uint256[])": EventFragment;
    "RootOwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BasePriceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CapacityUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ManagerOwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NameRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NameRenewed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewSubdomain"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RentPriceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RootOwnershipTransferred"): EventFragment;
}

export type BasePriceChangedEvent = TypedEvent<[BigNumber[]] & { prices: BigNumber[] }>;

export type CapacityUpdatedEvent = TypedEvent<[BigNumber, BigNumber] & { tokenId: BigNumber; capacity: BigNumber }>;

export type ManagerOwnershipTransferredEvent = TypedEvent<[string, string] & { oldManager: string; newManager: string }>;

export type NameRegisteredEvent = TypedEvent<
  [string, BigNumber, string, BigNumber, BigNumber] & {
    name: string;
    node: BigNumber;
    owner: string;
    cost: BigNumber;
    expires: BigNumber;
  }
>;

export type NameRenewedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber] & {
    name: string;
    node: BigNumber;
    cost: BigNumber;
    expires: BigNumber;
  }
>;

export type NewSubdomainEvent = TypedEvent<
  [string, BigNumber, BigNumber, string] & {
    name: string;
    node: BigNumber;
    parent: BigNumber;
    owner: string;
  }
>;

export type RentPriceChangedEvent = TypedEvent<[BigNumber[]] & { prices: BigNumber[] }>;

export type RootOwnershipTransferredEvent = TypedEvent<[string, string] & { oldRoot: string; newRoot: string }>;

export class IController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IControllerInterface;

  functions: {
    available(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    burn(tokenId: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    capacity(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    children(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    expires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getPrices(overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>;

    getTokenPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    manager(overrides?: CallOverrides): Promise<[string]>;

    nameExpires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    nameRedeem(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nameRedeemWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      resolver: string,
      operator: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nameRegister(
      name: string,
      owner: string,
      duration: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nameRegisterByManager(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nameRegisterWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      keyHashes: BigNumberish[],
      values: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    origin(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    registerPrice(name: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    renew(name: string, duration: BigNumberish, overrides?: PayableOverrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    renewByRoot(name: string, duration: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    rentPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    root(overrides?: CallOverrides): Promise<[string]>;

    setCapacity(tokenId: BigNumberish, _capacity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    setPrices(
      basePrices: BigNumberish[],
      rentPrices: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRegistration(open: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    setSubdomain(tokenId: BigNumberish, name: string, to: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    totalRegisterPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    transferManagerOwnership(newManger: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    transferRootOwnership(newRoot: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    withdraw(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;
  };

  available(tokenId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  burn(tokenId: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  capacity(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  children(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  expires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getPrices(overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>;

  getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

  manager(overrides?: CallOverrides): Promise<string>;

  nameExpires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  nameRedeem(
    name: string,
    owner: string,
    duration: BigNumberish,
    code: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nameRedeemWithConfig(
    name: string,
    owner: string,
    duration: BigNumberish,
    code: BytesLike,
    resolver: string,
    operator: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nameRegister(
    name: string,
    owner: string,
    duration: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nameRegisterByManager(
    name: string,
    owner: string,
    duration: BigNumberish,
    resolver: string,
    operator: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nameRegisterWithConfig(
    name: string,
    owner: string,
    duration: BigNumberish,
    resolver: string,
    operator: string,
    keyHashes: BigNumberish[],
    values: string[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  origin(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  registerPrice(name: string, overrides?: CallOverrides): Promise<BigNumber>;

  renew(name: string, duration: BigNumberish, overrides?: PayableOverrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  renewByRoot(name: string, duration: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  rentPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  root(overrides?: CallOverrides): Promise<string>;

  setCapacity(tokenId: BigNumberish, _capacity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  setPrices(basePrices: BigNumberish[], rentPrices: BigNumberish[], overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  setRegistration(open: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  setSubdomain(tokenId: BigNumberish, name: string, to: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  totalRegisterPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  transferManagerOwnership(newManger: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  transferRootOwnership(newRoot: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  withdraw(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  callStatic: {
    available(tokenId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    burn(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    capacity(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    children(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    expires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPrices(overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>;

    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<string>;

    nameExpires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nameRedeem(name: string, owner: string, duration: BigNumberish, code: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    nameRedeemWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      resolver: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nameRegister(name: string, owner: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nameRegisterByManager(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nameRegisterWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      keyHashes: BigNumberish[],
      values: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    origin(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    registerPrice(name: string, overrides?: CallOverrides): Promise<BigNumber>;

    renew(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<void>;

    renewByRoot(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<void>;

    rentPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    root(overrides?: CallOverrides): Promise<string>;

    setCapacity(tokenId: BigNumberish, _capacity: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setPrices(basePrices: BigNumberish[], rentPrices: BigNumberish[], overrides?: CallOverrides): Promise<void>;

    setRegistration(open: boolean, overrides?: CallOverrides): Promise<void>;

    setSubdomain(tokenId: BigNumberish, name: string, to: string, overrides?: CallOverrides): Promise<void>;

    totalRegisterPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    transferManagerOwnership(newManger: string, overrides?: CallOverrides): Promise<void>;

    transferRootOwnership(newRoot: string, overrides?: CallOverrides): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "BasePriceChanged(uint256[])"(prices?: null): TypedEventFilter<[BigNumber[]], { prices: BigNumber[] }>;

    BasePriceChanged(prices?: null): TypedEventFilter<[BigNumber[]], { prices: BigNumber[] }>;

    "CapacityUpdated(uint256,uint256)"(tokenId?: null, capacity?: null): TypedEventFilter<[BigNumber, BigNumber], { tokenId: BigNumber; capacity: BigNumber }>;

    CapacityUpdated(tokenId?: null, capacity?: null): TypedEventFilter<[BigNumber, BigNumber], { tokenId: BigNumber; capacity: BigNumber }>;

    "ManagerOwnershipTransferred(address,address)"(
      oldManager?: string | null,
      newManager?: string | null
    ): TypedEventFilter<[string, string], { oldManager: string; newManager: string }>;

    ManagerOwnershipTransferred(
      oldManager?: string | null,
      newManager?: string | null
    ): TypedEventFilter<[string, string], { oldManager: string; newManager: string }>;

    "NameRegistered(string,uint256,address,uint256,uint256)"(
      name?: null,
      node?: BigNumberish | null,
      owner?: string | null,
      cost?: null,
      expires?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber, BigNumber],
      {
        name: string;
        node: BigNumber;
        owner: string;
        cost: BigNumber;
        expires: BigNumber;
      }
    >;

    NameRegistered(
      name?: null,
      node?: BigNumberish | null,
      owner?: string | null,
      cost?: null,
      expires?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber, BigNumber],
      {
        name: string;
        node: BigNumber;
        owner: string;
        cost: BigNumber;
        expires: BigNumber;
      }
    >;

    "NameRenewed(string,uint256,uint256,uint256)"(
      name?: null,
      node?: null,
      cost?: null,
      expires?: null
    ): TypedEventFilter<[string, BigNumber, BigNumber, BigNumber], { name: string; node: BigNumber; cost: BigNumber; expires: BigNumber }>;

    NameRenewed(
      name?: null,
      node?: null,
      cost?: null,
      expires?: null
    ): TypedEventFilter<[string, BigNumber, BigNumber, BigNumber], { name: string; node: BigNumber; cost: BigNumber; expires: BigNumber }>;

    "NewSubdomain(string,uint256,uint256,address)"(
      name?: null,
      node?: BigNumberish | null,
      parent?: BigNumberish | null,
      owner?: string | null
    ): TypedEventFilter<[string, BigNumber, BigNumber, string], { name: string; node: BigNumber; parent: BigNumber; owner: string }>;

    NewSubdomain(
      name?: null,
      node?: BigNumberish | null,
      parent?: BigNumberish | null,
      owner?: string | null
    ): TypedEventFilter<[string, BigNumber, BigNumber, string], { name: string; node: BigNumber; parent: BigNumber; owner: string }>;

    "RentPriceChanged(uint256[])"(prices?: null): TypedEventFilter<[BigNumber[]], { prices: BigNumber[] }>;

    RentPriceChanged(prices?: null): TypedEventFilter<[BigNumber[]], { prices: BigNumber[] }>;

    "RootOwnershipTransferred(address,address)"(
      oldRoot?: string | null,
      newRoot?: string | null
    ): TypedEventFilter<[string, string], { oldRoot: string; newRoot: string }>;

    RootOwnershipTransferred(oldRoot?: string | null, newRoot?: string | null): TypedEventFilter<[string, string], { oldRoot: string; newRoot: string }>;
  };

  estimateGas: {
    available(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    burn(tokenId: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    capacity(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    children(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    expires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPrices(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<BigNumber>;

    nameExpires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nameRedeem(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nameRedeemWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      resolver: string,
      operator: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nameRegister(name: string, owner: string, duration: BigNumberish, overrides?: PayableOverrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    nameRegisterByManager(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nameRegisterWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      keyHashes: BigNumberish[],
      values: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    origin(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    registerPrice(name: string, overrides?: CallOverrides): Promise<BigNumber>;

    renew(name: string, duration: BigNumberish, overrides?: PayableOverrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    renewByRoot(name: string, duration: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    rentPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    root(overrides?: CallOverrides): Promise<BigNumber>;

    setCapacity(tokenId: BigNumberish, _capacity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setPrices(basePrices: BigNumberish[], rentPrices: BigNumberish[], overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setRegistration(open: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setSubdomain(tokenId: BigNumberish, name: string, to: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    totalRegisterPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    transferManagerOwnership(newManger: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    transferRootOwnership(newRoot: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    withdraw(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    available(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    burn(tokenId: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    capacity(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    children(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    expires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPrices(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nameExpires(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nameRedeem(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nameRedeemWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      code: BytesLike,
      resolver: string,
      operator: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nameRegister(
      name: string,
      owner: string,
      duration: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nameRegisterByManager(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nameRegisterWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      resolver: string,
      operator: string,
      keyHashes: BigNumberish[],
      values: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    origin(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerPrice(name: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renew(name: string, duration: BigNumberish, overrides?: PayableOverrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    renewByRoot(name: string, duration: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    rentPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    root(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setCapacity(tokenId: BigNumberish, _capacity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    setPrices(
      basePrices: BigNumberish[],
      rentPrices: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRegistration(open: boolean, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    setSubdomain(tokenId: BigNumberish, name: string, to: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    totalRegisterPrice(name: string, duration: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferManagerOwnership(newManger: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    transferRootOwnership(newRoot: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    withdraw(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;
  };
}
