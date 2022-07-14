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
        for (let i = 0; i < possibleBanks.length; i++) {
            possibleBanksDIV.innerHTML += `<div class="row justify-content-center">
            <!-- Logo -->
            <div
              class="col p-1 border border-2 rounded d-flex justify-content-center fadeIn"
            >
              <img
                src="./assets/img/logo_white.svg"
                alt=""
                class="col-1 img-fluid"
              />
            </div>

            <!-- Name -->
            <div
              class="col p-1 border border-2 rounded d-flex justify-content-center fadeIn"
            >
              <span>Zenith Bank</span>
            </div>

            <!-- Website -->
            <div
              class="col p-1 border border-2 rounded d-flex justify-content-center fadeIn"
            >
              <span>https://zenith.com</span>
            </div>
          </div>`
        }
    }

}