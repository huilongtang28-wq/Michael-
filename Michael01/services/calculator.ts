
import { CalculationResult, CalculationSettings, CargoSpec, ContainerSpec, PackedItem } from '../types';

/**
 * A simplified packing algorithm.
 * It calculates the best simplistic arrangement (stacking) to fill the volume.
 * It does not perform complex irregular packing (Tetris-like) but finds the optimal
 * homogeneous stacking pattern (rows, columns, layers).
 */
export const calculatePacking = (
  container: ContainerSpec,
  cargo: CargoSpec,
  settings: CalculationSettings
): CalculationResult => {
  const { innerDimensions, maxWeight } = container;
  const { dimensions: box, weight: boxWeight } = cargo;

  // Effective dimensions based on utilization settings
  // We reduce the container dimensions slightly to simulate space utilization clearance
  // Space Util % effectively scales down the available volume limits
  const utilFactor = settings.spaceUtilization / 100;
  
  const effContainerL = innerDimensions.length;
  const effContainerW = innerDimensions.width;
  const effContainerH = innerDimensions.height;

  // Max weight allowance in kg (Settings is in Tons)
  const allowedWeight = settings.maxWeightLimit * 1000;

  // Strategy: Try 2 orientations for the base layer (Length-wise or Width-wise)
  // Orientation A: Box Length aligned with Container Length
  // Orientation B: Box Width aligned with Container Length (Rotated 90deg on Y)
  
  const attemptPack = (alignLengthWithContainerLength: boolean): PackedItem[] => {
    const items: PackedItem[] = [];
    
    const dimL = alignLengthWithContainerLength ? box.length : box.width;
    const dimW = alignLengthWithContainerLength ? box.width : box.length;
    const dimH = box.height; // Assuming upright strictly for now

    const countL = Math.floor(effContainerL / dimL);
    const countW = Math.floor(effContainerW / dimW);
    const countH = Math.floor(effContainerH / dimH);

    // Center offset to start placing (Container center is 0,0,0)
    // ThreeJS coordinate system for this app: X = Length, Y = Height, Z = Width
    // Container starts at -L/2, 0, -W/2 approx (assuming floor at Y=0)
    
    const startX = - (effContainerL / 2) * 0.01; // meters
    const startZ = - (effContainerW / 2) * 0.01; // meters
    const startY = 0;

    const boxLenM = dimL * 0.01;
    const boxWidM = dimW * 0.01;
    const boxHgtM = dimH * 0.01;

    let totalVolumePacked = 0;
    const containerVolume = (effContainerL * effContainerW * effContainerH);
    const maxVol = containerVolume * utilFactor;

    for (let y = 0; y < countH; y++) {
      for (let z = 0; z < countW; z++) {
        for (let x = 0; x < countL; x++) {
          
          // Check utilization cap (Volume based)
          const currentVol = (items.length + 1) * (box.length * box.width * box.height);
          if (currentVol > maxVol) continue;

           // Check weight cap based on USER LIMIT
           const currentWeight = (items.length + 1) * boxWeight;
           if (currentWeight > allowedWeight) continue;

          items.push({
            position: [
              startX + (x * boxLenM) + (boxLenM / 2),
              startY + (y * boxHgtM) + (boxHgtM / 2),
              startZ + (z * boxWidM) + (boxWidM / 2)
            ],
            // If aligned length-wise (Length matches Length), no rotation.
            // If rotated (Width matches Length), rotate 90 deg around Y.
            rotation: alignLengthWithContainerLength ? [0, 0, 0] : [0, Math.PI / 2, 0],
            // Visual size needs to match the logical dimensions used for placement
            // If rotated, the visual geometry is still L,H,W but rotated.
            // We pass the RAW box dimensions to the visualizer, the rotation handles alignment.
            size: [box.length * 0.01, box.height * 0.01, box.width * 0.01] 
          });
        }
      }
    }
    return items;
  };

  const packA = attemptPack(true);
  const packB = attemptPack(false);

  // Choose the one with more items
  const bestPack = packA.length > packB.length ? packA : packB;

  const totalCount = bestPack.length;
  const totalWeight = totalCount * boxWeight;
  const totalVolumeCBM = (totalCount * box.length * box.width * box.height) / 1000000;

  // fitByWeight is true if the loop stopped because of weight, 
  // or if we reached close to the allowed weight limit.
  // Actually, simplistic check: if we are at the limit.
  // We'll return fitByWeight as "Did weight limit constrain us?" 
  // A rough heuristic: if totalWeight is >= allowedWeight - one box weight.
  const hitWeightLimit = totalWeight >= (allowedWeight - boxWeight);

  return {
    totalCount,
    totalWeight,
    totalVolume: totalVolumeCBM,
    weightUtilizationPercent: (totalWeight / maxWeight) * 100, // Utilization of PHYSICAL container
    volumeUtilizationPercent: (totalVolumeCBM / (container.volume)) * 100,
    packedItems: bestPack,
    containerSpec: container,
    fitByWeight: hitWeightLimit,
    fitByVolume: !hitWeightLimit // If not weight, likely volume (or just count limits)
  };
};
