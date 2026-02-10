/**
 * Budget Category Color Constants
 * 
 * These match the CSS variables in globals.css:
 * --color-category-future, --color-category-living, etc.
 * 
 * Use these in JavaScript/TypeScript when you need the actual hex values
 * (e.g., for charts, inline styles, or third-party libraries).
 */

export const CATEGORY_COLORS = {
  /** Future (Purple) - Savings/Investments */
  FUTURE: '#614FBB',
  /** Living (Green) - Needs/Essentials */
  LIVING: '#A9D9C7',
  /** Present (Red) - Wants/Lifestyle */
  PRESENT: '#C24656',
  /** Income/Total (Blue) */
  INCOME: '#65A1C9',
} as const;

export const CATEGORY_GLOWS = {
  FUTURE: 'none',
  LIVING: 'none',
  PRESENT: 'none',
  INCOME: 'none',
} as const;

/**
 * Tailwind-compatible color classes for budget categories.
 * Use these when applying Tailwind utilities.
 */
export const CATEGORY_TAILWIND = {
  FUTURE: {
    text: 'text-[#614FBB]',
    bg: 'bg-[#614FBB]',
    border: 'border-[#614FBB]',
  },
  LIVING: {
    text: 'text-[#A9D9C7]',
    bg: 'bg-[#A9D9C7]',
    border: 'border-[#A9D9C7]',
  },
  PRESENT: {
    text: 'text-[#C24656]',
    bg: 'bg-[#C24656]',
    border: 'border-[#C24656]',
  },
  INCOME: {
    text: 'text-[#65A1C9]',
    bg: 'bg-[#65A1C9]',
    border: 'border-[#65A1C9]',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY_COLORS;

/**
 * Get color by category key
 */
export function getCategoryColor(category: CategoryKey): string {
  return CATEGORY_COLORS[category];
}

/**
 * Get Tailwind classes by category key
 */
export function getCategoryClasses(category: CategoryKey) {
  return CATEGORY_TAILWIND[category];
}
