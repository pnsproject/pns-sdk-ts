import "./style.css";

import {
  switchChain,
  setup,
  getProvider,
  getSigner,
  getAccount,
  getOwner,
  ownerOf,
  exists,
  getResolver,
  totalRegisterPrice,
  register,
  controllerRoot,
  setResolver,
  setKey,
  getKey,
  setKeys,
  getKeys,
} from "./sdk";

async function main() {
  console.log("hello");
  // switchChain(43113)
  // switchChain(1287)
  await setup();

  console.log("dot owner", await getOwner("dot"));
  console.log("dot owner", await ownerOf("dot"));
  console.log("dot owner", await exists("dot"));
  console.log("dot owner", await getResolver("dot"));

  console.log("eth owner", await getOwner("eth"));
  console.log("eth owner", await exists("eth"));

  console.log("gavinwood123.dot owner", await getOwner("gavinwood123.dot"));

  let account = getAccount();
  // console.log("gavinwood001.dot register", await register("gavinwood001", account, 28 * 86400));
  // console.log("gavinwood001.dot register", await setResolver("gavinwood001.dot"));
  console.log("gavinwood001.dot resolver", await getResolver("gavinwood001.dot"));

  // console.log("gavinwood001.dot setKey", await setKey("gavinwood001.dot", "ETH", account));
  console.log("gavinwood001.dot getKey", await getKey("gavinwood001.dot", "ETH"));

  // console.log("gavinwood001.dot setKeys", await setKeys("gavinwood001.dot", ["BTC"], [account]));
  console.log("gavinwood001.dot getKeys", await getKeys("gavinwood001.dot", ["BTC"]));
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
