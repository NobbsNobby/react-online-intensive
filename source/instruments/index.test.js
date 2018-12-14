import { sum, delay, getUniqueID, getFullApiUrl } from './index';

describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called witch non-number type as first argument', () => {
        expect(() => {
            sum('1', 2);
        }).toThrow();
    });

    test('sum function should throw, when called witch non-number type as second argument', () => {
        expect(() => {
            sum(1, '2');
        }).toThrow();
    });

    test('sum function should return an additional of two arguments passed', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBe('A resolved promise');
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called witch non-number type argument', () => {
        expect(() => {
            getUniqueID('2');
        }).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(15)).toHaveLength(15);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called witch non-string type as first argument', () => {
        expect(() => {
            getFullApiUrl(1, '2');
        }).toThrow();
    });

    test('getFullApiUrl function should throw, when called witch non-string type as second argument', () => {
        expect(() => {
            getFullApiUrl('1', 2);
        }).toThrow();
    });

    test('getFullApiUrl function should return api string', () => {
        expect(typeof getFullApiUrl('api', 'id')).toBe('string');
        expect(getFullApiUrl('api', 'id')).toBe('api/id');
    });
});
