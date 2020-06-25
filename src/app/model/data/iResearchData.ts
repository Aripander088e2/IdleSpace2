import { BonusStack } from "../bonus/bonusStack";
import { ExclusiveResGroups } from "../researches/exclusiveResGroups";

export interface IJobType {
  id: string;
  name: string;
  icon: string;
  color?: string;
  darkColor: string;
  lightColor: string;
  bonus?: BonusStack;
}

export interface IResearchData {
  id: string;
  name: string;
  description: string;
  max?: number;
  priceMulti?: number;
  growRate?: number;
  unitsToUnlock?: string[];
  researchToUnlock?: string[];
  unlockFrom?: string;
  technologiesToUnlock?: string[];
  type: IJobType;
  researchBonus?: { type: IJobType; bonus: DecimalSource }[];
  navalCapacity?: number;
  stationToUp?: { stationId: string; habSpace: DecimalSource }[];
  battleMulti?: { materialId: string; multi: DecimalSource }[];
  prodMulti?: { unitId: string; multi: number }[];
  effMulti?: { unitId: string; multi: number }[];
  shipTypeToUnlock?: number;
  limitMulti?: { unitId: string; multi: number }[];
  recycling?: number;
  modulesToUnlock?: string[];
  modPoints?: { unitId: string; multi: number }[];
  buildingPoints?: { buildingId: string; quantity: number }[];
  shipProductionBonus?: { shipType: number; multi: number }[];
  speedMulti?: number;
  inspirationDescription?: string;
  inspirationBuildingId?: string;
  districtMulti?: number;
  habSpaceMulti?: number;
  miningDistMulti?: number;
  energyDistMulti?: number;
  exclusiveGroup?: ExclusiveResGroups;
  spellToUnlock?: string;
}
