const ACCOUNT_NUMBER_LENGTH = 10

const BANK_CODE_LENGTH = 3

const NUBAN_KEY = "373373373373"

const allBanks = [
    {
        name: 'Access Bank Plc',
        code: "044"
    },
    {
        name: 'Citibank Nigeria Limited',
        code: "023"
    },
    {
        name: "Diamond Bank",
        code: "063"
    },
    {
        name: 'Ecobank Nigeria Plc',
        code: "050"
    },
    {
        name: 'Fidelity Bank Plc',
        code: "070"
    },
    {
        name: 'First Bank Nigeria Ltd.',
        code: "011"
    },
    {
        name: 'First City Monument Bank Plc',
        code: "214"
    },
    {
        name: 'Globus Bank Limited',
        code: "058"
    },
    {
        name: 'Guaranty Trust Bank Plc',
        code: "038"
    },
    {
        name: 'Heritage Banking Company Ltd.',
        code: "030"
    },
    {
        name: "Jaiz Bank",
        code: "301"
    },
    {
        name: 'Keystone Bank',
        code: "082"
    },
    {
        name: 'Polaris Bank',
        code: "101"
    },
    {
        name: 'Providus Bank',
        code: "076"
    },
    {
        name: 'Stanbic IBTC Bank Ltd.',
        code: "221"
    },
    {
        name: 'Standard Chartered Bank Nigeria Ltd.',
        code: "068"
    },
    {
        name: 'Sterling Bank Plc',
        code: "232"
    },
    {
        name: 'SunTrust Bank Nigeria Limited',
        code: "100"
    },
    {
        name: 'Titan Trust Bank Ltd',
        code: "000"
    },
    {
        name: 'Union Bank of Nigeria Plc',
        code: "032"
    },
    {
        name: 'United Bank For Africa Plc',
        code: "033"
    },
    {
        name: 'Unity Bank Plc',
        code: "215"
    },
    {
        name: 'Wema Bank Plc',
        code: "035"
    },
    {
        name: 'Zenith Bank Plc',
        code: "057"
    }
]

class Nuban {

    constructor(accountNumber = null, bankCode = null, bankName = null) {
        // Constructor Variables Declarations
        this.accountNumber = accountNumber
        this.bankCode = bankCode
        this.bankName = bankName


        // // Validate Account Number
        // if (this.accountNumber && this.accountNumber.length !== ACCOUNT_NUMBER_LENGTH) {
        //     throw `Account Number Must Be ${ACCOUNT_NUMBER_LENGTH} Digits In Length`
        // }

        // // Validate Bank Code
        // if (this.bankCode && (typeof this.bankCode !== "string" || String(this.bankCode).length !== BANK_CODE_LENGTH)) {
        //     throw `Bank Code Must Either Be Blank Or Be A String & ${BANK_CODE_LENGTH} Digits In Length`
        // }

        // // Validate Bank Name
        // if (this.name && (typeof this.bankName !== "string")) {
        //     throw `Bank Name Must Either Be Blank Or Be A String`
        // }
    }

    static allBanks() {
        return allBanks
    }

    static allBankNames() {
        return allBanks.map(bank => bank.name)
    }

    static allBankCodes() {
        return allBanks.map(bank => bank.code)
    }

    static bankCode(bankName) {
        const foundBank = allBanks.find(bank => bank.name.toLowerCase() == bankName.toLowerCase())
        return foundBank ? foundBank.code : "No Bank Found"
    }

    static bankName(bankCode) {
        if (typeof bankCode !== "string") {
            return "Bank Code Must Be Provided As A String"
        }

        if (String(bankCode).length !== 3) {
            return `Bank Code Must Be ${BANK_CODE_LENGTH} Digits In Length`
        }

        const foundBank = allBanks.find(bank => bank.code == bankCode)

        return foundBank ? foundBank.name : "No Bank Found"
    }

    static evaluateNuban(accountNumber, bankCode) {
        let output = 0
        for (let i = 0; i < BANK_CODE_LENGTH; i++) {
            output += bankCode[i] * NUBAN_KEY[i]
        }
        for (let i = 0; i < ACCOUNT_NUMBER_LENGTH; i++) {
            output += accountNumber[i] * (NUBAN_KEY[BANK_CODE_LENGTH + i] ? NUBAN_KEY[BANK_CODE_LENGTH + i] : 0)
        }
        return output
    }

    static nubanFormula(accountNumberLastDigit, nubanCode) {
        let result = 10 - (nubanCode % 10)
        result = result < 10 ? result : 0
        return accountNumberLastDigit == result
    }

    static possibleBanks(accountNumber) {
        accountNumber = String(accountNumber)
        const output = []
        let bankCode, evaluatedNuban

        // Create Account
        for (let i = 0; i < allBanks.length; i++) {
            bankCode = allBanks[i].code
            evaluatedNuban = this.evaluateNuban(accountNumber, bankCode)
            if (this.nubanFormula(accountNumber[accountNumber.length - 1], evaluatedNuban)) {
                output.push(allBanks[i].name)
            }
        }

        return output
    }

    static validForBankCode(accountNumber, bankCode) {
        accountNumber = String(accountNumber)
        return this.nubanFormula(accountNumber[accountNumber.length - 1], bankCode)
    }

    static validForBankName(accountNumber, bankName) {
        return this.possibleBanks(accountNumber).includes(bankName.toUpperCase())
    }

    getBankCode() {
        return this.constructor.bankCode(this.bankName)
    }

    getPossibleBanks() {
        return this.constructor.possibleBanks(this.accountNumber)
    }

    isValidAccountNumber() {
        return this.getPossibleBanks(this.accountNumber).length > 0
    }

    isValidForBankCode() {
        if (this.bankCode) {
            return this.constructor.validForBankCode(this.accountNumber, this.bankCode)
        }
        return "Bank Code Not Provided"
    }

    isValidForBankName(bankName = null) {
        bankName = bankName ? bankName : this.bankName

        if (bankName) {
            return this.constructor.validForBankName(this.accountNumber, bankName.toUpperCase())
        }
        return "Bank Name Not Provided"
    }

    setAccountNumber(accountNumber) {
        accountNumber = String(accountNumber)
        this.accountNumber = accountNumber
        return true
    }

    setBankCode(bankCode) {
        this.bankCode = bankCode
        return true
    }
}

