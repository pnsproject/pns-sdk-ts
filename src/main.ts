// main

import "./style.css";

import { ethers, Signer } from "ethers";

import { SDK, sha3, getNamehash } from "./sdk";
import { ContractAddrMap } from "./constants";

async function main() {
  let provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");

  await provider.send("eth_requestAccounts", []);
  let chainId = (await provider.getNetwork()).chainId;
  console.log("chainId", chainId);

  let signer = await provider.getSigner();
  let loginAddress = await signer.getAddress();

  console.log(loginAddress);
  console.log(ContractAddrMap[chainId]);

  let contracts = ContractAddrMap[chainId];
  let sdk = new SDK(contracts["pns"], contracts["controller"], signer);
  // console.log(await sdk.namehash("gavinwood000.dot"))
  // console.log(await sdk.ownerOfId(getNamehash("gavinwood000.dot")))
  // console.log(await sdk.ownerOfName("gavinwood000.dot"))
  // console.log(await sdk.exists("gavinwood000.dot"))
  // console.log(await sdk.getOwner("gavinwood000.dot"))
  // console.log(await sdk.totalRegisterPrice("gavinwood000.dot", 86400*365))
  // console.log(await sdk.renewPrice("gavinwood000.dot", 86400*365))

  // console.log(await sdk.getPnsRoot())
  // console.log(await sdk.getControllerRoot())

  // console.log(await sdk.basePrice("gavinwood000.dot"))
  // console.log(await sdk.rentPrice("gavinwood000.dot", 86400*365))
  // console.log(await sdk.getPrices())
  // console.log(await sdk.getTokenPrice())

  // console.log(await sdk.nameExpires("gavinwood000.dot"))
  // console.log(await sdk.available("gavinwood000.dot"))
  // console.log(await sdk.register("gavinwood000", loginAddress, 365*86400))
  // console.log(await sdk.registerWithConfig("gavin000", loginAddress, 365*86400, 1, [], []))
  // console.log(await sdk.mintSubdomain(loginAddress, "gavin000.dot", "sub0"))
  // console.log(await sdk.approve("sub0.gavin000.dot", threeAddr))
  // console.log(await sdk.getApproved("sub0.gavin000.dot"))

  // console.log(await sdk.setName(loginAddress, "gavinwood000.dot"))
  // console.log('getName', await sdk.getName(loginAddress))

  // console.log('addr', loginAddress)
  // console.log('addr', await sdk.ownerOfName("gavinwood000.dot"))
  // console.log(await sdk.exists("gavinwood000.dot"))

  // console.log(await sdk.setNftName(sdk.pns.address, getNamehash("sub0.gavin000.dot"), getNamehash("gavin000.dot")))
  // console.log(await sdk.getNftName(sdk.pns.address, getNamehash("sub0.gavin000.dot")))

  // console.log(await sdk.setKeysByHash("gavin000.dot", [sha3("ETH")], [loginAddress]))

  // console.log(await sdk.getKey("gavin000.dot", "ETH"))
  // console.log(await sdk.getKeys("gavin000.dot", ["ETH"]))
  // console.log(await sdk.getKeysByHash("gavin000.dot", [sha3("ETH")]))
  // console.log(await sdk.getDomainDetails("gavin000.dot"))

  // console.log(await sdk.registerByManager("gavin002", loginAddress, 365*86400, 1, [], []))
  // console.log(await sdk.renew("gavin000", 86400*365))
  // console.log(await sdk.renewByManager("gavin000", 86400*365))

  // console.log(await sdk.transferName("sub0.gavin000.dot", threeAddr))
  // console.log(await sdk.mintSubdomain(loginAddress, "gavin000.dot", "sub1"))
  // console.log(await sdk.burn("sub1.gavin000.dot"))
}

async function start() {
  let button = document.querySelector("button");
  if (button) {
    button.addEventListener("click", async () => {
      await main();
    });
  }
}

if (document) {
  start()
    .catch(console.error)
    .finally(() => {});
}
