import "./style.css";

import {
  switchChain,
  setup,
  login,
  getProvider,
  getSigner,
  getAccount,
  getOwner,
  ownerOf,
  exists,
  getResolver,
  register,
  setResolver,
  setKey,
  getKey,
  setKeys,
  getKeys,
  getDomainDetails,
  mintSubdomain,
  controllerRoot,
  totalRegisterPrice,
  rentPrice,
  nameExpires,
  available,
  renew,
  mintRedeem,
  nameRedeemAny,
  transfer,
  generateRedeemCode,
  getDomains,
  getSubdomains,
  getNamehash,
  setProvider,
  checkRedeem,
  setName,
  getName,
  sha3,
  getCurrencyRate,
  getUsdBasePrices,
  getUsdRentPrices,
  getBasePrices,
  getRentPrices,
  registerPayWithOtherCurrency,
  registerWithProxy,
  updateWithProxy,
  getController,
  getResovlerContract,
  signing,
  encodeData,
} from "./sdk";

import { ethers, Signer, BigNumber } from "ethers";

async function main() {
  console.log("hello");
  // switchChain(43113)
  // switchChain(1287)
  await setProvider();
  await login();

  // console.log(sha3("dot"));
  // console.log("getDomains", await getDomains("0x1c4e1d79049dae82a901ae501b0847d197395f47"));
  // console.log("getSubdomains", await getSubdomains("dot"));

  // console.log("dot owner", await getOwner("dot"));
  // console.log("dot owner", await ownerOf("dot"));
  // console.log("dot owner", await exists("dot"));
  // console.log("dot owner", await getResolver("dot"));

  // console.log("eth owner", await getOwner("eth"));
  // console.log("eth owner", await exists("eth"));

  // console.log("controllerRoot", await controllerRoot());

  // console.log("gavinwood001.dot owner", await getOwner("gavinwood001.dot"));

  let account = getAccount();
  console.log("account", account);

  // console.log("gavinwood001.dot register", await register("gavinwood001", account, 28 * 86400));
  // console.log("gavinwood001.dot setResolver", await setResolver("gavinwood001.dot"));
  // console.log("gavinwood001.dot resolver", await getResolver("gavinwood001.dot"));

  // console.log("gavinwood001.dot mintSubdomain", await mintSubdomain("gavinwood001.dot", "sub123", account));
  // console.log("sub123.gavinwood001.dot owner", await getOwner("sub123.gavinwood001.dot"));

  // console.log("gavinwood001.dot setKey", await setKey("gavinwood001.dot", "ETH", account));
  // console.log("gavinwood001.dot getKey", await getKey("gavinwood001.dot", "ETH"));

  // console.log("gavinwood001.dot setKeys", await setKeys("gavinwood001.dot", ["BTC"], [account]));
  // console.log("gavinwood001.dot getKeys", await getKeys("gavinwood001.dot", ["BTC"]));

  // console.log("getDomainDetails", await getDomainDetails("gavinwood001.dot"));

  // console.log("totalRegisterPrice", await totalRegisterPrice("gavinwood001", 86400 * 365));
  // console.log("rentPrice", await rentPrice("gavinwood001", 86400 * 365));
  // console.log("nameExpires", await nameExpires("gavinwood001.dot"));
  // console.log("available", await available("gavinwood001.dot"));

  // console.log("renew", await renew("gavinwood001", 86400 * 365));
  // console.log("nameExpires", await nameExpires("gavinwood001.dot"));

  // console.log("gavinwood196.dot owner", await getOwner("gavinwood196.dot"));
  // console.log("mintRedeem", await mintRedeem(196, 200));
  // let signer = getSigner()
  // let sig = await generateRedeemCode(86400 * 365, 298, signer)
  // console.log('redeem', sig)
  // nameRedeemAny('gavinwood196', account, 86400*365, 196, sig)
  // let sig = "";
  // console.log("nameRedeemAny", await nameRedeemAny("gavinwood298", account, 86400 * 365, 298, sig));

  // console.log("gavinwood298 owner", await getOwner("gavinwood298.dot"));
  // console.log("gavinwood298 checkRedeem", await checkRedeem(298));

  // console.log("gavinwood298 setName", await setName("gavinwood298.dot"));
  // console.log(getNamehash("gavinwood298.dot"));
  // console.log("account getName", (await getName(account)).toHexString());
  // console.log(await getDomains(account));
  // console.log(await getSubdomains("gavinwood298.dot"));
  // console.log("getSubdomains", await getSubdomains(getNamehash("gavinwood298.dot")));
  // console.log("getCurrencyRate", (await getCurrencyRate()).toString());
  // console.log("getUsdBasePrices", (await getUsdBasePrices()).toString());
  // console.log("getUsdRentPrices", (await getUsdRentPrices()).toString());
  // console.log("getBasePrices", (await getBasePrices()).toString());
  // console.log("getRentPrices", (await getRentPrices()).toString());

  // let res = await registerPayWithOtherCurrency("avax", "gavinwood3001", 86400*365)
  // console.log(res.data)
  // await res.tx.wait()
  // res = await registerWithProxy(res.data)
  // console.log('res', res)

  // let provider = getProvider()
  // console.log('tx', await provider.getTransaction(""))

  console.log("gavinwood3001.dot owner", await getOwner("gavinwood3001.dot"));
  console.log("gavinwood3001.dot getDomainDetails", await getDomainDetails("gavinwood3001.dot"));

  // let keyHashes = [sha3("text.email")]
  // let values = ["user@gmail.com"]
  // let tokenId = getNamehash("gavinwood3001.dot")
  // updateWithProxy({keyHashes, values, tokenId})
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
