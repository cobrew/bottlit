
/**
 * Base metric unit for measuring liquid volume is the Litre.
 */

import { Quantity, UnitDescriptor } from './quantity.js';

// TODO: Add CUPS, TBSP, TSP?
export const ML: UnitDescriptor = { factor: 1, description: 'ML', unitString: 'milliliter'};
export const LITRE: UnitDescriptor = { factor: 0.001, description: 'L', unitString: 'liter' };
// TODO: Rename to FLUID_OUNCE?
export const OZ: UnitDescriptor = { factor: 0.033814, description: 'OZ', unitString: 'ounce' };
export const GAL: UnitDescriptor = { factor: 0.000264172, description: 'GAL', unitString: 'gallon' };

export class LiquidVolume extends Quantity {
  constructor(value: number, startingUnit?: UnitDescriptor) {
    super(ML, [LITRE, OZ, GAL], value, startingUnit);
  }
}
