/**
 * Centralized color palette for the Kibo application
 * These colors are used across Quick Entry, charts, and UI components
 */

export const KIBO_COLORS = {
    // Target/Budget Colors
    Living: '#A9D9C7',      // Green (Mint) for Living expenses
    Present: '#C24656',      // Red
    Saving: '#65A1C9',       // Blue (for savings/totals)
    Future: '#614FBB',       // Purple

    // UI Colors
    CyberCyan: '#A9D9C7',
    Background: '#1B4034',

    // Feeling Colors (for Quick Entry)
    FeelingGreat: '#22c55e',
    FeelingGood: '#A9D9C7',
    FeelingNeutral: '#94a3b8',
    FeelingSlightRegret: '#f59e0b',
    FeelingRegret: '#C24656',
} as const;

// Type for target colors
export type TargetColor = typeof KIBO_COLORS.Living | typeof KIBO_COLORS.Present | typeof KIBO_COLORS.Saving | typeof KIBO_COLORS.Future;
