// Maps each car category to one of 6 content "profiles" so CarDetail copy is
// genuinely use-case-distinct (a Bentley ≠ a Cayenne ≠ a V-Class) while
// remaining maintainable and native-quality across the 5 locales.
// Uniqueness per car comes from: profile angle + interpolated brand/model/
// price + the per-car `description` already in cars.js.

import { cars } from './cars'

const CATEGORY_PROFILE = {
  'ultra-luxury-suv': 'ultra',
  'luxury-suv': 'luxurySuv',
  'premium-suv': 'luxurySuv',
  'suv-premium': 'luxurySuv',
  suv: 'luxurySuv',
  'luxury-van': 'van',
  'executive-sedan': 'executive',
  'premium-sedan': 'executive',
  'sport-suv': 'sport',
  'sport-compact': 'sport',
  'compact-sport': 'sport',
  'compact-premium': 'compact',
  compact: 'compact',
  economy: 'compact',
  'city-car': 'compact',
}

export function carProfile(category) {
  return CATEGORY_PROFILE[category] || 'luxurySuv'
}

// Up to 3 other cars sharing the same category (for the "Similar models" links).
export function similarCars(car, limit = 3) {
  return cars
    .filter((c) => c.id !== car.id && c.category === car.category)
    .slice(0, limit)
}

// Contextual published-blog slug to link from a car page (single slug per post,
// language-agnostic — the existing blog routing localises the prefix).
export function contextualBlogSlug(car) {
  if (car.id === 'porsche-cayenne') return 'location-porsche-cayenne-marrakech'
  const profile = carProfile(car.category)
  if (profile === 'ultra' || profile === 'luxurySuv' || profile === 'van') {
    return 'quelle-voiture-luxe-choisir-marrakech'
  }
  return 'location-voiture-luxe-marrakech-guide'
}
