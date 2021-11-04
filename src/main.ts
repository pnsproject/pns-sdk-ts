import './style.css'

async function main() {
  console.log('hello')
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
