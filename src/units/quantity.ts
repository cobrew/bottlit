
export interface Quantity<AnyUnitType> {
  value: number;
  type: AnyUnitType;
}

export function qToString<T>(q: Quantity<T>): string {
  return `${q.type}:${q.value}`;
}
