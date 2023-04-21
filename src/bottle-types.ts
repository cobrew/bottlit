
export enum BottleType {
  INDUSTRY_STANDARD_BOTTLE, // 12oz
  BRITISH,                  // 16oz
  BOMBER,                   // 22oz
}

export interface BottleInfo {
  bottleType: BottleType;
  bottleVolume: number; // In oz...
  name: string;
}

export const IndustryStandardBottleInfo: BottleInfo = {
  bottleType: BottleType.INDUSTRY_STANDARD_BOTTLE,
  bottleVolume: 12,
  name: 'Long Necks',
}

export const BritishBottleInfo: BottleInfo = {
  bottleType: BottleType.BRITISH,
  bottleVolume: 16,
  name: 'British',
}

export const BomberBottleInfo: BottleInfo = {
  bottleType: BottleType.BOMBER,
  bottleVolume: 22,
  name: 'Bomber',
}
