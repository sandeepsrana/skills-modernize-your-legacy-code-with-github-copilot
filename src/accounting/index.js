const prompt = require('prompt-sync')();

// Account data storage (equivalent to STORAGE-BALANCE in DataProgram)
let accountBalance = 1000.00;

/**
 * Read the current account balance
 * @returns {number} The current account balance
 */
function readBalance() {
    return accountBalance;
}

/**
 * Write/Update the account balance
 * @param {number} newBalance - The new balance to store
 */
function writeBalance(newBalance) {
    accountBalance = newBalance;
}

/**
 * View Balance Operation
 * Equivalent to COBOL OPERATION-TYPE = 'TOTAL'
 */
function viewBalance() {
    const balance = readBalance();
    // Format balance to NNNNNN.NN format
    console.log(`Current balance: ${String(Math.floor(balance)).padStart(6, '0')}.${String(Math.round((balance % 1) * 100)).padStart(2, '0')}`);
}

/**
 * Credit Account Operation
 * Equivalent to COBOL OPERATION-TYPE = 'CREDIT'
 */
function creditAccount() {
    process.stdout.write("Enter credit amount: ");
    const amountInput = prompt();
    
    let amount = parseFloat(amountInput);
    
    // Validate input
    if (isNaN(amount) || amount < 0) {
        console.log("Invalid amount. Please enter a valid number.");
        return;
    }
    
    const currentBalance = readBalance();
    const newBalance = currentBalance + amount;
    writeBalance(newBalance);
    
    // Format balance to NNNNNN.NN format
    console.log(`Amount credited. New balance: ${String(Math.floor(newBalance)).padStart(6, '0')}.${String(Math.round((newBalance % 1) * 100)).padStart(2, '0')}`);
}

/**
 * Debit Account Operation
 * Equivalent to COBOL OPERATION-TYPE = 'DEBIT'
 */
function debitAccount() {
    process.stdout.write("Enter debit amount: ");
    const amountInput = prompt();
    
    let amount = parseFloat(amountInput);
    
    // Validate input
    if (isNaN(amount) || amount < 0) {
        console.log("Invalid amount. Please enter a valid number.");
        return;
    }
    
    const currentBalance = readBalance();
    
    // Check if sufficient funds
    if (currentBalance >= amount) {
        const newBalance = currentBalance - amount;
        writeBalance(newBalance);
        
        // Format balance to NNNNNN.NN format
        console.log(`Amount debited. New balance: ${String(Math.floor(newBalance)).padStart(6, '0')}.${String(Math.round((newBalance % 1) * 100)).padStart(2, '0')}`);
    } else {
        console.log("Insufficient funds for this debit.");
    }
}

/**
 * Display the main menu and handle user choice
 */
function displayMenu() {
    console.log("--------------------------------");
    console.log("Account Management System");
    console.log("1. View Balance");
    console.log("2. Credit Account");
    console.log("3. Debit Account");
    console.log("4. Exit");
    console.log("--------------------------------");
}

/**
 * Main program loop
 * Equivalent to COBOL MAIN-LOGIC
 */
function main() {
    let continueFlag = true;
    
    while (continueFlag) {
        displayMenu();
        process.stdout.write("Enter your choice (1-4): ");
        const userChoice = prompt();
        
        switch (userChoice) {
            case '1':
                viewBalance();
                break;
            case '2':
                creditAccount();
                break;
            case '3':
                debitAccount();
                break;
            case '4':
                console.log("Exiting the program. Goodbye!");
                continueFlag = false;
                break;
            default:
                console.log("Invalid choice, please select 1-4.");
        }
    }
}

// Export functions for testing
module.exports = {
    readBalance,
    writeBalance,
    viewBalance,
    creditAccount,
    debitAccount,
    displayMenu,
    main
};

// Run the application only if this is the main module
if (require.main === module) {
    main();
}
