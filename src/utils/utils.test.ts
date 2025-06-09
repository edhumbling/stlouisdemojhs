import { describe, it, expect } from 'vitest'

// Test basic JavaScript functionality
describe('Utility functions', () => {
  it('should handle string operations', () => {
    const testString = 'Hello World'
    expect(testString.toLowerCase()).toBe('hello world')
    expect(testString.toUpperCase()).toBe('HELLO WORLD')
  })

  it('should handle array operations', () => {
    const testArray = [1, 2, 3, 4, 5]
    expect(testArray.length).toBe(5)
    expect(testArray.filter(n => n > 3)).toEqual([4, 5])
    expect(testArray.map(n => n * 2)).toEqual([2, 4, 6, 8, 10])
  })

  it('should handle object operations', () => {
    const testObject = { name: 'Test', value: 42 }
    expect(testObject.name).toBe('Test')
    expect(testObject.value).toBe(42)
    expect(Object.keys(testObject)).toEqual(['name', 'value'])
  })
})
