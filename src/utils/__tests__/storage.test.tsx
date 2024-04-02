import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, saveData} from '../storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Storage tests', () => {
  const testKey = 'testKey';
  const testData = {test: 'Test'};
  const mockGetItem = AsyncStorage.getItem as jest.Mock;
  const mockSetItem = AsyncStorage.setItem as jest.Mock;

  beforeEach(() => {
    mockGetItem.mockClear();
    mockSetItem.mockClear();
  });

  it('Test saves data correctly', async () => {
    await saveData(testKey, testData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      testKey,
      JSON.stringify(testData),
    );
  });

  it('Test retrieves existing data correctly', async () => {
    mockGetItem.mockResolvedValueOnce(JSON.stringify(testData));
    const result = await getData(testKey);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
    expect(result).toEqual(testData);
  });

  it('Test returns null for non-existent data', async () => {
    mockGetItem.mockResolvedValueOnce(null);
    const result = await getData('nonExistentKey');
    expect(result).toBeNull();
  });

  it('Test handles retrieval errors', async () => {
    const error = new Error('Failed to retrieve');
    mockGetItem.mockRejectedValueOnce(error);
    await expect(getData(testKey)).rejects.toThrow('Failed to retrieve');
  });

  it('Test handles saving error', async () => {
    const error = new Error('Failed to save');
    mockSetItem.mockRejectedValueOnce(error);
    await expect(saveData(testKey, testData)).rejects.toThrow('Failed to save');
  });
});
