// UI constants for consistent styling and behavior
export const COLORS = {
  PRIMARY: '#BF6BB3',
  PRIMARY_FOREGROUND: '#FFFFFF',
  BACKGROUND: 'hsl(230, 45%, 8%)',
  FOREGROUND: 'hsl(280, 20%, 95%)',
  CARD: 'hsl(235, 40%, 12%)',
  BORDER: 'hsl(240, 30%, 20%)',
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1400px',
} as const;

export const SPACING = {
  XS: '0.25rem',
  SM: '0.5rem',
  MD: '1rem',
  LG: '1.5rem',
  XL: '2rem',
  '2XL': '3rem',
} as const;

export const BORDER_RADIUS = {
  SM: '0.25rem',
  MD: '0.5rem',
  LG: '0.75rem',
  XL: '1rem',
  FULL: '9999px',
} as const;

export const SHADOWS = {
  SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  MD: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  LG: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  XL: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  COSMIC: '0 0 30px hsl(var(--cosmic-glow) / 0.3)',
  CARD: '0 10px 40px hsl(var(--cosmic-purple) / 0.4)',
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;
