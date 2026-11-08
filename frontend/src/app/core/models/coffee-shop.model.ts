import type { IconName } from '../../shared/icon/icon.component';

export type AmenityKey =
  | 'wifi'
  | 'power'
  | 'quietCorners'
  | 'outdoorSeating'
  | 'laptopFriendly'
  | 'food'
  | 'petFriendly'
  | 'lateHours'
  | 'plants'
  | 'rooftop'
  | 'bikeParking'
  | 'cozySeating';

export type DrinkKey =
  | 'espresso'
  | 'latte'
  | 'pourOver'
  | 'coldBrew'
  | 'matcha'
  | 'tea'
  | 'chai'
  | 'mocha'
  | 'seasonal';

export type SeatingType = 'indoor' | 'outdoor' | 'both';

export interface CoffeeShop {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  location: string;
  neighborhood: string;
  distanceMinutes: number;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  priceRange: string;
  atmosphere: string[];
  specialties: string[];
  drinkTypes: DrinkKey[];
  amenities: AmenityKey[];
  seating: SeatingType;
  signature: string;
}

export interface AmenityMeta {
  label: string;
  icon: IconName;
}
