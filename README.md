# NUBAN-Validator-JavaScript
Nigerian Uniform Bank Account Number Validator - Inspired by <a href="https://github.com/Zifah/Nigeria-Bank-Account-NUBAN-Algorithm">this repo</a>.

# Demo
A Live demo can be found [here](https://nuban-validator.netlify.app/).

## Description
This repo contains a JavaScript class which generates and validates bank account numbers based on NUBAN (Nigeria Uniform Bank Account Number) specifications. The algorithm is based this publicly available <a href="https://www.cbn.gov.ng/OUT/2011/CIRCULARS/BSPD/NUBAN%20PROPOSALS%20V%200%204-%2003%2009%202010.PDF">CBN specification</a>.

## Setting Up
  - Clone repo or download repo files.
  - The class file (NubanValidator.js) can be found in the `src` folder.

## Usage

_Browser_

```js
  <script src="./NubanValidator.js"></script
```

_Node Project_

  - Export all variables and main class in the NubanValidator.js file.
  - Import or require the exported variables and class in your project.

## Class Usage
  - The constructor accepts optional params of 'accountNumber`, `bankCode` & `bankName`.

```js
// Object Instantiation
const validator = new Nuban()
validator.setAccountNumber("0186321433")
validator.possibleBanks()

// Object Instantiation With Account Number
  const validator = new Nuban("0186321433")
  validator.possibleBanks()
 
// Static Usage 
Nuban.possibleBanks("0186321433")
```

_Static Methods_

  - allBanks - `Returns *ALL* banks data from the *allBanks* array`.
  ```js
    Nuban.allBanks()
  ```
  - allBankNames - `Returns *ONLY* the *names* of banks in the *allBanks* array`.
  ```js
    Nuban.allBankNames()
  ```
  - allBankCodes - `Returns *ONLY* the NUBAN codes of all banks in the *allBanks* array`.
   ```js
    Nuban.allBankCodes()
  ```
  - bankCode - `Accepts one param, a bank name and returns the NUBAN code of the bank provided`
   ```js
    Nuban.bankCode("Zenith Bank")
    // Outputs 057
  ```
  - bankName - `Accepts one param, a NUBAN bank code and returns the bank name matching the bank code provided`
  ```js
    Nuban.bankName("057")
    // Outputs "Zenith Bank"
  ```
  - evaluateNuban - `Accepts two params, *accountNumber* & *bankCode* and returns the calculated Nuban Code`
  ```js
    Nuban.evaluateNuban("2388025873", "057")
    // Outputs 229
  ```
  - nubanFormula - `Accepts two params, *accountNumberLastDigit* & *bankCode*, this method uses the first param as the check digit and validates it for that bank. Returns a boolean`
  ```js
    Nuban.evaluateNuban("2388025873", "057")
    // Outputs false - This means that *2388025873* account number is not valid for the bank code *057 - (Zenith Bank).*
  ```
  - possibleBanks - `Accepts one param, the account number and returns an array of all possible banks under which the provided account number is valid.`
  ```js
    Nuban.possibleBanks("2388025873")
    // Outputs [ 'Diamond Bank', 'Heritage Banking Company Ltd.' ].
  ```
  - validForBankCode - `Accepts two params, *accountNumber* & *bankCode*, this method checks if the provided account number is valid under the bank code. Returns a boolean`
```js
    Nuban.validForBankCode("2388025873", "057")
    // Outputs true.
  ```
  - validForBankName - `Accepts two params, *accountNumber* & *bankName*, this method checks if the provided account number is valid under the bank name. Returns a boolean`
```js
    Nuban.validForBankCode("2388025873", "Zenith Bank")
    // Outputs true.
  ```
  
 # Class Methods
  *All methods below all call the static methods provided above.*
  
  _Setters_
  - setAccountNumber - `Set or change account Number`
  - setBankCode - `Set or change bank code.`

  _Getters_
  - getBankCode - `Returns bank code of object instance.`
  - getPossibleBanks - `Returns an array of all possible banks under which the provided account number is valid.`
  
  _Others_
  - isValidAccountNumber - `Checks if the account number is valid under the NUBAN standard & returns a boolean.`
  - isValidForBankCode - `Checks if the account number is valid under object's current bank code.`
  - isValidForBankName - `Accepts one param, the bank name & checks if the account number is valid under the bank name & returns a boolean.`
  
