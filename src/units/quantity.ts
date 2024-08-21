
/**
 * Describes a unit in terms of its unit symbol and the conversion factor to the base unit of
 * that quantity.
 */
export interface UnitDescriptor {
  description?: string;
  /** Multiply the value of this unit by the following factor to get to the base unit. */
  factor: number;
  /** A string representing the units (like "liter"). */
  unitString: string;
}

/**
 * Represents a generic quantity in some base unit. Extend this to get more semantical!
 */
export class Quantity {
  private value: number;

  constructor(private readonly baseUnit: UnitDescriptor,
              private readonly otherUnits: UnitDescriptor[],
              val: number,
              startingUnit: UnitDescriptor = baseUnit) {
    this.set(val, startingUnit);
  }

  /** Retrieves the value of this quantity in the specified unit. */
  get(unitType: UnitDescriptor = this.baseUnit): number {
    if (unitType === this.baseUnit) return this.value;
    let unitDescIndex = this.otherUnits.indexOf(unitType);
    if (unitDescIndex === -1) {
      throw `Cannot convert to unit ${unitType.description}`;
    }

    return Number((this.value * this.otherUnits[unitDescIndex].factor).toFixed(2));
  }

  /** Sets the value of this quantity in the specified unit. */
  set(newValue: number, unitType: UnitDescriptor = this.baseUnit) {
    if (unitType === this.baseUnit) {
      this.value = newValue;
      return;
    }

    let unitDescIndex = this.otherUnits.indexOf(unitType);
    if (unitDescIndex === -1) {
      throw `Cannot set with units ${unitType.description}`;
    }
    this.value = newValue / this.otherUnits[unitDescIndex].factor;
  }
}
