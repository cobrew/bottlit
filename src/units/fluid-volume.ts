
/**
 * Base metric unit for measuring liquid volume is the Litre.
 */

import { Quantity } from './quantity.js';

export enum FluidVolumeUnits {
  // Metric units.
  LITRE = 'VOLUME_LITRE',

  // U.S. Customary units.
  OZ = 'VOLUME_OZ',
  GALLON = 'VOLUME_GALLON',
}

const baseUnitType: FluidVolumeUnits = FluidVolumeUnits.LITRE;

interface VolumeQuantity extends Quantity<FluidVolumeUnits> {}

const toBaseUnitMap: Map<FluidVolumeUnits, (VolumeQuantity) => VolumeQuantity> = new Map();
const fromBaseUnitMap: Map<FluidVolumeUnits, (VolumeQuantity) => VolumeQuantity> = new Map();

const OZ_PER_LITRE = 33.814;
const GALLONS_PER_LITRE = 0.264172;

// Convert OZ to LITRE.
toBaseUnitMap.set(FluidVolumeUnits.OZ, (q: VolumeQuantity) => {
  return {
    type: baseUnitType,
    value: q.value / OZ_PER_LITRE,
  };
})

// Convert LITRE to OZ.
fromBaseUnitMap.set(FluidVolumeUnits.OZ, (q: VolumeQuantity) => {
  return {
    type: FluidVolumeUnits.OZ,
    value: q.value * OZ_PER_LITRE,
  }
});

// Convert GALLON to LITRE.
fromBaseUnitMap.set(FluidVolumeUnits.GALLON, (q: VolumeQuantity) => {
  return {
    type: baseUnitType,
    value: q.value / GALLONS_PER_LITRE,
  };
});

// Convert LITRE to GALLON.
toBaseUnitMap.set(FluidVolumeUnits.GALLON, (q: VolumeQuantity) => {
  return {
    type: FluidVolumeUnits.GALLON,
    value: q.value * GALLONS_PER_LITRE,
  };
});

function convertVolume(oq: VolumeQuantity, unitType: FluidVolumeUnits): VolumeQuantity {
  if (oq.type === unitType) return oq;

  let q: VolumeQuantity = oq;

  if (oq.type !== baseUnitType) {
    const converterFn = toBaseUnitMap.get(oq.type);
    if (!converterFn) {
      throw `Do not have a converter function that goes from ${oq.type} to ${baseUnitType}`;
    }
    q = converterFn(oq);
  }

  if (unitType !== baseUnitType) {
    const converterFn = fromBaseUnitMap.get(unitType);
    if (!converterFn) {
      throw `Do not have a converter function that goes from ${baseUnitType} to ${unitType}`;
    }
    q = converterFn(q);
  }

  return q;
}
