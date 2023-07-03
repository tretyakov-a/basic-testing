// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path', () => ({
  __esModule: true,
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 100);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 100);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);
    jest.advanceTimersByTime(500);
    expect(callback).toBeCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('testPath');
    expect(join).toBeCalledTimes(1);
    expect(join).toBeCalledWith(expect.any(String), 'testPath');
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockImplementation(() => false);
    await expect(readFileAsynchronously('testPath')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockImplementation(() => true);
    (fsPromises.readFile as jest.Mock).mockImplementation(() =>
      Promise.resolve(Buffer.from('test content')),
    );
    await expect(readFileAsynchronously('testPath')).resolves.toBe(
      'test content',
    );
  });
});
