
export interface UnitDescriptor {
  description?: string;
  /** Multiply the base value by this to get to the base unit. */
  factor: number;
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

  get(unitType: UnitDescriptor = this.baseUnit): number {
    if (unitType === this.baseUnit) return this.value;
    let unitDescIndex = this.otherUnits.indexOf(unitType);
    if (unitDescIndex === -1) {
      throw `Cannot convert to unit ${unitType.description}`;
    }

    return this.value * this.otherUnits[unitDescIndex].factor;
  }

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
