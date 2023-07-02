// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import * as lodash from 'lodash';

const lodashMock = lodash as { random: () => number };

jest.mock('lodash', () => ({
  __esModule: true,
  random: jest.fn(),
}));


describe('BankAccount', () => {
  const startBalance = 100;
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(startBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(startBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(startBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(startBalance + 1, getBankAccount(0))).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(startBalance, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(100).getBalance()).toBe(startBalance + 100);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(50).getBalance()).toBe(startBalance - 50);
  });

  test('should transfer money', () => {
    const offshoreBankAccount = getBankAccount(0);
    expect(bankAccount.transfer(startBalance, offshoreBankAccount).getBalance()).toBe(0);
    expect(offshoreBankAccount.getBalance()).toBe(startBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodashMock.random = () => 42;
    let result = await bankAccount.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodashMock.random = () => 42;
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodashMock.random = () => 0;
    await expect(bankAccount.synchronizeBalance()).rejects.toBeInstanceOf(SynchronizationFailedError);
  });
});
