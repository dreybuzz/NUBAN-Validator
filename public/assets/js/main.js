const themeToggler = document.getElementById("theme-toggle")
const themeToggleText = document.getElementById("theme-toggle-text")
const logoImage = document.getElementById("logo-img")
const possibleBanksDIV = document.getElementById("possible-banks")

themeToggler.addEventListener("click", () => {
  let themeState = JSON.parse(themeToggler.dataset.state)
  themeToggler.dataset.state = !themeState
  if (themeState) {
    themeToggler.classList.remove("bi-lightbulb-fill")
    themeToggler.classList.add("bi-lightbulb")
    document.body.classList.remove("dark-mode")
    document.body.classList.add("light-mode")
    themeToggleText.textContent = "Darkness, Come Forth!"
    logoImage.src = "./assets/img/logo_black.svg"
  } else {
    themeToggler.classList.add("bi-lightbulb-fill")
    themeToggler.classList.remove("bi-lightbulb")
    document.body.classList.add("dark-mode")
    document.body.classList.remove("light-mode")
    themeToggleText.textContent = "Let There Be Light"
    logoImage.src = "./assets/img/logo_white.svg"
  }
})

document.body.addEventListener("click", () => { })





// Account Number Input
const accountNumberInput = document.getElementById("account-number")

accountNumberInput.addEventListener("input", (e) => {
  let parsedInput = e.target.value.split("").filter(char => !isNaN(char)).join("")
  parsedInput = parsedInput.length > 10 ? parsedInput.substring(0, 10) : parsedInput
  accountNumberInput.value = parsedInput
  parsedInput.length === 10 ? getPossibleBanks(parsedInput) : possibleBanksDIV.innerHTML = ``

})


function getPossibleBanks(accountNumber) {
  const accountNumberValidator = new Nuban(accountNumber)
  const possibleBanks = accountNumberValidator.getPossibleBanks()
  if (possibleBanks.length) {
    possibleBanksDIV.innerHTML = ''
    for (let i = 0; i < possibleBanks.length; i++) {
      possibleBanksDIV.innerHTML +=
        `
      <div class="mt-3 col-lg-5 d-flex border border-2 p-2 rounded justify-content-between align-items-center mx-auto zoomIn" role="button">
        <div class="col col-lg-2 p-3">
          <img src="./assets/img/${possibleBanks[i]}.png" alt="" class="img-fluid" />
        </div>

        <div class="col col-sm-8 p-3">
          <span>${capitalizeFirsts(possibleBanks[i].toLowerCase())}</span>
        </div>
      </div>
      `
    }
  }

}

function capitalizeFirsts(name) {
  const splitName = name.split(" ")
  const namesUpper = []
  for (const n of splitName) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1))
  }
  return namesUpper.join(" ")
}