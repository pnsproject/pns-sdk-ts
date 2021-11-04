import './style.css'

import {
  switchChain,
  setup,
  getOwner,
  ownerOf,
  exists,
  getResolver,
} from "./sdk";

async function main() {
  console.log('hello')
  // switchChain(43113)
  // switchChain(1287)
  await setup()

  console.log("dot owner", await getOwner("dot"));
  console.log("dot owner", await ownerOf("dot"));
  console.log("dot owner", await exists("dot"));
  console.log("dot owner", await getResolver("dot"));

  console.log("eth owner", await getOwner("eth"));
  console.log("eth owner", await exists("eth"));

  console.log("gavinwood123.dot owner", await getOwner("gavinwood123.dot"));
}

async function start() {
  let button = document.querySelector("button")
  if (button) {
    button.addEventListener("click", async () => {
      await main()
    })
  }
}

if (document) {
  start()
  .catch(console.error)
  .finally(() => {});
}
