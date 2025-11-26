
export enum ContainerType {
  GP20 = '20GP',
  GP40 = '40GP',
  HQ40 = '40HQ'
}

export interface Dimensions {
  length: number; // cm
  width: number; // cm
  height: number; // cm
}

export interface ContainerSpec {
  type: ContainerType;
  name: string;
  innerDimensions: Dimensions; // cm
  maxWeight: number; // kg
  volume: number; // m3
}

export interface CargoSpec {
  dimensions: Dimensions; // cm
  weight: number; // kg per unit
  name: string;
}

export interface CalculationSettings {
  spaceUtilization: number; // 0-100 percentage
  maxWeightLimit: number; // Tons (T)
}

export interface PackedItem {
  position: [number, number, number]; // x, y, z center in meters
  rotation: [number, number, number]; // Euler angles
  size: [number, number, number]; // x, y, z size in meters
}

export interface CalculationResult {
  totalCount: number;
  totalWeight: number;
  totalVolume: number;
  weightUtilizationPercent: number;
  volumeUtilizationPercent: number;
  packedItems: PackedItem[];
  containerSpec: ContainerSpec;
  fitByWeight: boolean;
  fitByVolume: boolean;
}
