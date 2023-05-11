
/**
 * Base metric unit for measuring liquid volume is the Litre.
 */

import { Quantity, UnitDescriptor } from './quantity.js';

export const ML: UnitDescriptor = { factor: 1, description: 'ML'};
export const LITRE: UnitDescriptor = { factor: 0.001, description: 'L' };
export const OZ: UnitDescriptor = { factor: 0.033814, description: 'OZ' };
export const GAL: UnitDescriptor = { factor: 0.000264172, description: 'GAL' };

export class LiquidVolume extends Quantity {
  constructor(value: number, startingUnit?: UnitDescriptor) {
    super(ML, [LITRE, OZ, GAL], value, startingUnit);
  }
}
