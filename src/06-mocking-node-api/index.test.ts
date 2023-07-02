// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { join } from 'path';

const fsPromisesMock = fsPromises as { readFile: (path: fs.PathLike) => Promise<Buffer> };
const fsMock = fs as { existsSync: (path: fs.PathLike) => boolean };

jest.mock('fs', () => ({
  __esModule: true,
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  __esModule: true,
  readFile: jest.fn(),
}));

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
    fsMock.existsSync = () => false;
    await expect(readFileAsynchronously('testPath')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    fsMock.existsSync = () => true;
    fsPromisesMock.readFile = () => Promise.resolve(Buffer.from('test content'));
    await expect(readFileAsynchronously('testPath')).resolves.toBe('test content');
  });
});
