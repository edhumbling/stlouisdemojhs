import { describe, it, expect } from 'vitest'
import { programs, testimonials, navigationItems } from './index'

describe('Data exports', () => {
  it('should export programs array', () => {
    expect(Array.isArray(programs)).toBe(true)
    expect(programs.length).toBeGreaterThan(0)
  })

  it('should export testimonials array', () => {
    expect(Array.isArray(testimonials)).toBe(true)
    expect(testimonials.length).toBeGreaterThan(0)
  })

  it('should export navigationItems array', () => {
    expect(Array.isArray(navigationItems)).toBe(true)
    expect(navigationItems.length).toBeGreaterThan(0)
  })

  it('programs should have required properties', () => {
    programs.forEach(program => {
      expect(program).toHaveProperty('id')
      expect(program).toHaveProperty('title')
      expect(program).toHaveProperty('description')
      expect(typeof program.id).toBe('number')
      expect(typeof program.title).toBe('string')
      expect(typeof program.description).toBe('string')
    })
  })

  it('testimonials should have required properties', () => {
    testimonials.forEach(testimonial => {
      expect(testimonial).toHaveProperty('id')
      expect(testimonial).toHaveProperty('quote')
      expect(testimonial).toHaveProperty('author')
      expect(typeof testimonial.id).toBe('number')
      expect(typeof testimonial.quote).toBe('string')
      expect(typeof testimonial.author).toBe('string')
    })
  })

  it('navigationItems should have required properties', () => {
    navigationItems.forEach(item => {
      expect(item).toHaveProperty('label')
      expect(item).toHaveProperty('path')
      expect(typeof item.label).toBe('string')
      expect(typeof item.path).toBe('string')
    })
  })
})
