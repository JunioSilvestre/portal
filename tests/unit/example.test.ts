/**
 * @file example.test.ts
 * @description Example unit test to demonstrate testing pure logic.
 */

describe('Unit Tests - Example', () => {
    it('should perform basic arithmetic correctly', () => {
        expect(1 + 1).toBe(2);
    });

    it('should handle string manipulation', () => {
        const str = 'hello world';
        expect(str.toUpperCase()).toBe('HELLO WORLD');
    });
});
