// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock("axios");
jest.mock('lodash', () => ({
  __esModule: true,
  throttle: (fn: (relativePath: string) => Promise<any>) => (path: string) => fn(path)
}));

describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;
  const testUrl = 'testUrl';
  const testResponseData = {
    data: 'testData'
  };

  beforeEach(() => {
    mockGet = jest.fn(() => Promise.resolve(testResponseData));
    (axios.create as jest.Mock).mockImplementation(() => ({ get: mockGet }));
  })
  
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(testUrl);
    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(testUrl);
    expect(mockGet).toBeCalledWith(testUrl);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(testUrl);
    expect(data).toBe('testData');
  });
});
