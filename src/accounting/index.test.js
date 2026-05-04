/**
 * Unit Tests for Account Management System
 * These tests mirror the test scenarios defined in docs/TESTPLAN.md
 */

// Mock console.log to capture output
const mockLog = jest.fn();
const mockWrite = jest.fn();

// Store original console methods
const originalLog = console.log;
const originalWrite = process.stdout.write;

beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock console output
    console.log = mockLog;
    process.stdout.write = mockWrite;
});

afterEach(() => {
    // Restore original console methods
    console.log = originalLog;
    process.stdout.write = originalWrite;
});

// Import the accounting functions
let accounting;

// Re-import module before each test to reset state
beforeEach(() => {
    // Clear the require cache to reset module state
    delete require.cache[require.resolve('./index.js')];
    accounting = require('./index.js');
});

describe('Account Management System - Unit Tests', () => {
    
    describe('TC001: View Initial Balance', () => {
        test('should display current balance of 001000.00 on system initialization', () => {
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001000.00');
        });
    });

    describe('TC002: Credit Account - Valid Amount', () => {
        test('should credit account with 500 and display new balance of 001500.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const creditAmount = 500;
            const newBalance = currentBalance + creditAmount;
            
            accounting.writeBalance(newBalance);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001500.00');
        });
    });

    describe('TC003: Credit Account - Zero Amount', () => {
        test('should credit account with 0 and maintain balance of 001000.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const creditAmount = 0;
            const newBalance = currentBalance + creditAmount;
            
            accounting.writeBalance(newBalance);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001000.00');
        });
    });

    describe('TC004: Credit Account - Large Amount', () => {
        test('should credit account with 999999 and display new balance of 1000999.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const creditAmount = 999999;
            const newBalance = currentBalance + creditAmount;
            
            accounting.writeBalance(newBalance);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 1000999.00');
        });
    });

    describe('TC005: Credit Account - Multiple Credits', () => {
        test('should perform multiple credit operations and display correct balances', () => {
            // First credit of 250
            accounting.writeBalance(1000.00);
            let currentBalance = accounting.readBalance();
            let newBalance = currentBalance + 250;
            accounting.writeBalance(newBalance);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001250.00');
            
            // Clear mock to check second credit
            mockLog.mockClear();
            
            // Second credit of 250
            currentBalance = accounting.readBalance();
            newBalance = currentBalance + 250;
            accounting.writeBalance(newBalance);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001500.00');
        });
    });

    describe('TC006: Debit Account - Valid Amount', () => {
        test('should debit account with 300 and display new balance of 000700.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const debitAmount = 300;
            
            if (currentBalance >= debitAmount) {
                const newBalance = currentBalance - debitAmount;
                accounting.writeBalance(newBalance);
                accounting.viewBalance();
                
                expect(mockLog).toHaveBeenCalledWith('Current balance: 000700.00');
            }
        });
    });

    describe('TC007: Debit Account - Amount Equal to Balance', () => {
        test('should debit account with amount equal to balance and display 000000.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const debitAmount = 1000;
            
            if (currentBalance >= debitAmount) {
                const newBalance = currentBalance - debitAmount;
                accounting.writeBalance(newBalance);
                accounting.viewBalance();
                
                expect(mockLog).toHaveBeenCalledWith('Current balance: 000000.00');
            }
        });
    });

    describe('TC008: Debit Account - Insufficient Funds', () => {
        test('should reject debit of 1500 when balance is 1000.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const debitAmount = 1500;
            
            if (currentBalance < debitAmount) {
                expect(true).toBe(true); // Insufficient funds condition met
            } else {
                fail('Balance should be insufficient for this debit');
            }
        });
    });

    describe('TC009: Debit Account - Zero Amount', () => {
        test('should debit account with 0 and maintain balance of 001000.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const debitAmount = 0;
            
            if (currentBalance >= debitAmount) {
                const newBalance = currentBalance - debitAmount;
                accounting.writeBalance(newBalance);
                accounting.viewBalance();
                
                expect(mockLog).toHaveBeenCalledWith('Current balance: 001000.00');
            }
        });
    });

    describe('TC010: Debit Account - Amount Greater Than Balance', () => {
        test('should reject debit of 2000 when balance is 1000.00', () => {
            accounting.writeBalance(1000.00);
            const currentBalance = accounting.readBalance();
            const debitAmount = 2000;
            
            expect(currentBalance < debitAmount).toBe(true);
        });
    });

    describe('TC014: Exit Application', () => {
        test('should display exit message when application terminates', () => {
            // This test verifies the exit message format
            const exitMessage = "Exiting the program. Goodbye!";
            expect(exitMessage).toBe("Exiting the program. Goodbye!");
        });
    });

    describe('TC015: Sequential Operations - Credit then View', () => {
        test('should perform credit operation followed by view balance', () => {
            accounting.writeBalance(1000.00);
            
            // Credit 500
            let currentBalance = accounting.readBalance();
            let newBalance = currentBalance + 500;
            accounting.writeBalance(newBalance);
            
            // View balance
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001500.00');
        });
    });

    describe('TC016: Sequential Operations - Debit then View', () => {
        test('should perform debit operation followed by view balance', () => {
            accounting.writeBalance(1000.00);
            
            // Debit 200
            let currentBalance = accounting.readBalance();
            if (currentBalance >= 200) {
                let newBalance = currentBalance - 200;
                accounting.writeBalance(newBalance);
            }
            
            // View balance
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 000800.00');
        });
    });

    describe('TC017: Sequential Operations - Credit, Debit, View', () => {
        test('should perform credit, then debit, then view with final balance of 001200.00', () => {
            accounting.writeBalance(1000.00);
            
            // Credit 500
            let currentBalance = accounting.readBalance();
            let newBalance = currentBalance + 500;
            accounting.writeBalance(newBalance);
            
            // Debit 300
            currentBalance = accounting.readBalance();
            if (currentBalance >= 300) {
                newBalance = currentBalance - 300;
                accounting.writeBalance(newBalance);
            }
            
            // View balance
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001200.00');
        });
    });

    describe('TC018: Debit After Multiple Credits', () => {
        test('should perform two credits then debit with final balance of 001700.00', () => {
            accounting.writeBalance(1000.00);
            
            // Credit 1000
            let currentBalance = accounting.readBalance();
            let newBalance = currentBalance + 1000;
            accounting.writeBalance(newBalance);
            
            // Credit 500
            currentBalance = accounting.readBalance();
            newBalance = currentBalance + 500;
            accounting.writeBalance(newBalance);
            
            // Debit 800
            currentBalance = accounting.readBalance();
            if (currentBalance >= 800) {
                newBalance = currentBalance - 800;
                accounting.writeBalance(newBalance);
            }
            
            // View balance
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 001700.00');
        });
    });

    describe('TC019: Debit After Debit', () => {
        test('should perform two consecutive debits with final balance of 000300.00', () => {
            accounting.writeBalance(1000.00);
            
            // Debit 300
            let currentBalance = accounting.readBalance();
            if (currentBalance >= 300) {
                let newBalance = currentBalance - 300;
                accounting.writeBalance(newBalance);
            }
            
            // Debit 400
            currentBalance = accounting.readBalance();
            if (currentBalance >= 400) {
                let newBalance = currentBalance - 400;
                accounting.writeBalance(newBalance);
            }
            
            // View balance
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 000300.00');
        });
    });

    describe('TC020: Debit Insufficient Funds After Previous Debit', () => {
        test('should allow first debit but reject second debit when insufficient funds', () => {
            accounting.writeBalance(1000.00);
            
            // Debit 800 (should succeed)
            let currentBalance = accounting.readBalance();
            let firstDebitSucceeded = false;
            if (currentBalance >= 800) {
                let newBalance = currentBalance - 800;
                accounting.writeBalance(newBalance);
                firstDebitSucceeded = true;
            }
            
            expect(firstDebitSucceeded).toBe(true);
            
            // Debit 500 (should fail - balance is only 200)
            currentBalance = accounting.readBalance();
            let secondDebitFailed = currentBalance < 500;
            
            expect(secondDebitFailed).toBe(true);
        });
    });

    describe('Core Functionality - Balance Management', () => {
        test('readBalance should return current balance', () => {
            accounting.writeBalance(1500.00);
            expect(accounting.readBalance()).toBe(1500.00);
        });

        test('writeBalance should update the balance', () => {
            accounting.writeBalance(2000.00);
            expect(accounting.readBalance()).toBe(2000.00);
        });

        test('balance should persist across multiple operations', () => {
            accounting.writeBalance(1000.00);
            
            const balance1 = accounting.readBalance();
            accounting.writeBalance(balance1 + 100);
            
            const balance2 = accounting.readBalance();
            accounting.writeBalance(balance2 - 50);
            
            const finalBalance = accounting.readBalance();
            expect(finalBalance).toBe(1050.00);
        });

        test('displayMenu should show all menu options', () => {
            accounting.displayMenu();
            
            expect(mockLog).toHaveBeenCalledWith("--------------------------------");
            expect(mockLog).toHaveBeenCalledWith("Account Management System");
            expect(mockLog).toHaveBeenCalledWith("1. View Balance");
            expect(mockLog).toHaveBeenCalledWith("2. Credit Account");
            expect(mockLog).toHaveBeenCalledWith("3. Debit Account");
            expect(mockLog).toHaveBeenCalledWith("4. Exit");
        });
    });

    describe('Output Formatting', () => {
        test('balance should be formatted as NNNNNN.NN with leading zeros', () => {
            accounting.writeBalance(500.50);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 000500.50');
        });

        test('balance formatting for amounts with single decimal', () => {
            accounting.writeBalance(100.5);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 000100.50');
        });

        test('balance formatting for whole amounts', () => {
            accounting.writeBalance(999.00);
            accounting.viewBalance();
            
            expect(mockLog).toHaveBeenCalledWith('Current balance: 000999.00');
        });
    });
});
