import { ContainerSpec, ContainerType } from './types';

export const APP_VERSION = 'mk1';

// Standard container dimensions (Inner)
// Source: Average industry standards. Note: dimensions can vary slightly by manufacturer.
export const CONTAINER_SPECS: Record<ContainerType, ContainerSpec> = {
  [ContainerType.GP20]: {
    type: ContainerType.GP20,
    name: "20尺平柜 (20GP)",
    innerDimensions: { length: 589, width: 235, height: 239 },
    maxWeight: 28000, // kg
    volume: 33.1 // m3
  },
  [ContainerType.GP40]: {
    type: ContainerType.GP40,
    name: "40尺平柜 (40GP)",
    innerDimensions: { length: 1203, width: 235, height: 239 },
    maxWeight: 26000, // kg
    volume: 67.5 // m3
  },
  [ContainerType.HQ40]: {
    type: ContainerType.HQ40,
    name: "40尺高柜 (40HQ)",
    innerDimensions: { length: 1203, width: 235, height: 269 },
    maxWeight: 26000, // kg
    volume: 76.1 // m3
  }
};

export const DEFAULT_CARGO = {
  length: 0,
  width: 0,
  height: 0,
  weight: 0
};