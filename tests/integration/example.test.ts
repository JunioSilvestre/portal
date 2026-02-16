/**
 * @file example.test.ts
 * @description Example integration test to demonstrate mocking API calls.
 */

describe('Integration Tests - Example', () => {
    it('should simulate an API call', async () => {
        // Mock a simple async operation
        const fetchData = async () => {
            return new Promise((resolve) => setTimeout(() => resolve({ data: 'success' }), 100));
        };

        const result = await fetchData();
        expect(result).toEqual({ data: 'success' });
    });
});
