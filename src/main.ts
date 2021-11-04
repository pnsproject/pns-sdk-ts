import './style.css'

import {
  switchChain,
  setup,
} from "./sdk";

async function main() {
  console.log('hello')
  // switchChain(43113)
  // switchChain(1287)
  setup()

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
