# Account Management System - Test Plan

## Overview
This test plan outlines comprehensive test cases for the Account Management System COBOL application. The system manages account balance operations including viewing balance, crediting accounts, and debiting accounts.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC001 | View Initial Balance | System initialized with default balance of 1000.00 | 1. Start application<br>2. Select option 1 (View Balance) | Display "Current balance: 001000.00" | | | |
| TC002 | Credit Account - Valid Amount | Starting balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 500 | Display "Amount credited. New balance: 001500.00" | | | |
| TC003 | Credit Account - Zero Amount | Starting balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 0 | Display "Amount credited. New balance: 001000.00" | | | |
| TC004 | Credit Account - Large Amount | Starting balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 999999 | Display "Amount credited. New balance: 1000999.00" | | | |
| TC005 | Credit Account - Multiple Credits | Starting balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter 250<br>3. Select option 2 again<br>4. Enter 250 | Display first "Amount credited. New balance: 001250.00"<br>Then display "Amount credited. New balance: 001500.00" | | | |
| TC006 | Debit Account - Valid Amount | Starting balance is 1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 300 | Display "Amount debited. New balance: 000700.00" | | | |
| TC007 | Debit Account - Amount Equal to Balance | Starting balance is 1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 1000 | Display "Amount debited. New balance: 000000.00" | | | |
| TC008 | Debit Account - Insufficient Funds | Starting balance is 1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 1500 | Display "Insufficient funds for this debit." | | | |
| TC009 | Debit Account - Zero Amount | Starting balance is 1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 0 | Display "Amount debited. New balance: 001000.00" | | | |
| TC010 | Debit Account - Amount Greater Than Balance | Starting balance is 1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 2000 | Display "Insufficient funds for this debit." | | | |
| TC011 | Invalid Menu Choice - Option 5 | System displaying main menu | 1. Enter invalid choice: 5 | Display "Invalid choice, please select 1-4." and redisplay menu | | | |
| TC012 | Invalid Menu Choice - Option 0 | System displaying main menu | 1. Enter invalid choice: 0 | Display "Invalid choice, please select 1-4." and redisplay menu | | | |
| TC013 | Invalid Menu Choice - Non-numeric Input | System displaying main menu | 1. Enter invalid choice: ABC | Display "Invalid choice, please select 1-4." or appropriate error handling | | | |
| TC014 | Exit Application | Application is running | 1. Select option 4 (Exit) | Display "Exiting the program. Goodbye!" and terminate application | | | |
| TC015 | Sequential Operations - Credit then View | Starting balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter 500<br>3. Select option 1 (View Balance) | First display "Amount credited. New balance: 001500.00"<br>Then display "Current balance: 001500.00" | | | |
| TC016 | Sequential Operations - Debit then View | Starting balance is 1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter 200<br>3. Select option 1 (View Balance) | First display "Amount debited. New balance: 000800.00"<br>Then display "Current balance: 000800.00" | | | |
| TC017 | Sequential Operations - Credit, Debit, View | Starting balance is 1000.00 | 1. Select option 2 (Credit Account), enter 500<br>2. Select option 3 (Debit Account), enter 300<br>3. Select option 1 (View Balance) | Display balance after each operation<br>Final balance should be 001200.00 | | | |
| TC018 | Debit After Multiple Credits | Starting balance is 1000.00 | 1. Select option 2 (Credit Account), enter 1000<br>2. Select option 2 again, enter 500<br>3. Select option 3 (Debit Account), enter 800 | Display balance operations in sequence<br>Final balance should be 001700.00 | | | |
| TC019 | Debit After Debit | Starting balance is 1000.00 | 1. Select option 3 (Debit Account), enter 300<br>2. Select option 3 again, enter 400 | Both debit operations should succeed<br>Final balance should be 000300.00 | | | |
| TC020 | Debit Insufficient Funds After Previous Debit | Starting balance is 1000.00 | 1. Select option 3 (Debit Account), enter 800<br>2. Select option 3 (Debit Account), enter 500 | First debit succeeds, balance 000200.00<br>Second debit fails with "Insufficient funds for this debit." | | | |

## Notes
- All balance values are formatted as NNNNNN.NN (6 digits before decimal, 2 after)
- Default initial balance: 1000.00
- The system maintains balance state across operations during a single session
- Menu options are case-sensitive and numeric (1-4)
- Any input outside 1-4 should trigger invalid choice error
