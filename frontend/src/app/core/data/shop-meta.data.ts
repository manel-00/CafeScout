import type { AmenityKey, AmenityMeta, SeatingType } from '../models/coffee-shop.model';

export const AMENITY_META: Record<AmenityKey, AmenityMeta> = {
  wifi: { label: 'Reliable Wi-Fi', icon: 'wifi' },
  power: { label: 'Power outlets', icon: 'bolt' },
  quietCorners: { label: 'Quiet corners', icon: 'mute' },
  outdoorSeating: { label: 'Outdoor seating', icon: 'sun' },
  laptopFriendly: { label: 'Laptop-friendly', icon: 'laptop' },
  food: { label: 'Food menu', icon: 'utensils' },
  petFriendly: { label: 'Pet-friendly', icon: 'paw' },
  lateHours: { label: 'Open late', icon: 'clock' },
  plants: { label: 'Plants & greenery', icon: 'leaf' },
  rooftop: { label: 'Rooftop / terrace', icon: 'building' },
  bikeParking: { label: 'Bike parking', icon: 'bike' },
  cozySeating: { label: 'Cozy seating', icon: 'home' },
};

export const SEATING_LABELS: Record<SeatingType, string> = {
  indoor: 'Indoor seating',
  outdoor: 'Outdoor seating',
  both: 'Indoor & outdoor seating',
};
