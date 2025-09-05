// Animation constants for consistent timing and easing
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.8,
  VERY_SLOW: 1.5,
} as const;

export const ANIMATION_DELAY = {
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.4,
  VERY_LONG: 0.6,
} as const;

export const EASING = {
  EASE_OUT: "easeOut",
  EASE_IN_OUT: "easeInOut",
  LINEAR: "linear",
} as const;

// Floating animation variants
export const FLOATING_VARIANTS = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// Hover animation variants
export const HOVER_VARIANTS = {
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: ANIMATION_DURATION.NORMAL,
      ease: EASING.EASE_OUT
    }
  }
};

// Stagger animation variants
export const STAGGER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: ANIMATION_DELAY.MEDIUM
    }
  }
};

export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.SLOW,
      ease: EASING.EASE_OUT
    }
  }
};
