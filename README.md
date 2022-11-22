# PNS SDK

Javascript SDK for PNS project

## development process:

 * yarn
 * yarn dev

## publish process:

 * update package.json version
 * yarn prettier
 * yarn build
 * npm publish

## contract update process:

 * modify `src/constants.ts` when contract address update
 * rebuild the repo

## API

#### `namehash(name: string)`

return the EIP-137 namehash of a domain

#### `ownerOfId(tokenId: TokenId)`

return the owner address of a tokenId

#### `ownerOfName(name: DomainString)`

return the owner address of a domain

#### `exists(name: DomainString): Promise<boolean>`

check if a domain exists

#### `async getOwner(name: DomainString)`

check if a domain exists and return the owner address

#### `async totalRegisterPrice(name: LabelString, duration: number): Promise<BigNumber>`

return the totalRegisterPrice for a domain, which is sum of basePrice and rentPrice

#### `async renewPrice(name: LabelString, duration: number): Promise<BigNumber>`

return the renewPrice for a domain

#### `async basePrice(name: LabelString): Promise<BigNumber>`

return the one-time basePrice for a domain

#### `async rentPrice(name: LabelString, duration: number): Promise<BigNumber>`

return the annual rentPrice for a domain

#### `async getPrices()`

return the price configuration of PNS

#### `async getTokenPrice()`

get current token price of the contract

#### `async nameExpires(label: DomainString): Promise<BigNumber>`

return the exipry time of a domain

#### `async available(label: DomainString): Promise<boolean>`

check if a domain is available for registration

#### `async register(label: DomainString, account: string, duration: number)`

register a domain

#### `async registerWithConfig(name: DomainString, to: string, duration: number, data: number, keysHash: string[], values: string[])`

register a domain with configs

#### `async mintSubdomain(newOwner: HexAddress, name: DomainString, label: LabelString)`

mint a new subdomain

#### `async approve(name: DomainString, approved: HexAddress)`

approve a new operator for a domain (ERC721 method)

#### `async getApproved(name: DomainString): Promise<HexAddress>`

get the approved operator for a domain (ERC721 method)

#### `async setName(addr: HexAddress, name: DomainString, resv?: IResolver)`

set reverse domain name for an address

#### `async getName(addr: HexAddress): Promise<BigNumber>`

get reverse domain name for an address

#### `async setNftName(nftAddr: HexAddress, nftTokenId: string, nameTokenId: TokenId)`

set reverse domain name for a NFT

#### `async getNftName(nftAddr: HexAddress, nftTokenId: string)`

get reverse domain name for a NFT

#### `async getKey(name: DomainString, key: string): Promise<string>`

get a specific record for a domain

#### `async setKeysByHash(name: DomainString, keys: string[], values: string[])`

get a specific record by key hash for a domain

#### `async getKeys(name: DomainString, key: string[], resv?: IResolver): Promise<string[]>`

get records for a domain

#### `async getKeysByHash(name: DomainString, key: string[], resv?: IResolver)`

get records by key hashes for a domain

#### `async getDomainDetails(name: DomainString): Promise<DomainDetails>`

get domain details

#### `async renew(label: LabelString, duration: number)`

renew a domain with fee

#### `async transferName(name: DomainString, newOwner: HexAddress)`

transfer the ownership of a domain

#### `async burn(domain: string)`

burn a domain
