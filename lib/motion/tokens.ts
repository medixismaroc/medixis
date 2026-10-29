/** Source unique de durées/easing — tout le site partage une seule "voix" de mouvement. */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const MOTION = {
  ease: EASE_OUT_EXPO,
  duration: {
    fast: 0.35,
    base: 0.6,
    slow: 0.9,
  },
  distance: {
    sm: 16,
    base: 24,
    lg: 40,
  },
  stagger: 0.09,
} as const
