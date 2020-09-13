import { IResearchData } from "./iResearchData";
import { TECHNOLOGIES } from "./technologyData";
import {
  OPTIMIZED_SHIP_PREFIX,
  ORIGIN_1_TECH_MULTI,
  ORIGIN_1_TECH_2_MULTI,
  REPEATABLE_RES_PRICE_MULTI,
  IDS,
  MAT_IDS,
  MEGA_IDS
} from "../CONSTANTS";
import { ExclusiveResGroups } from "../researches/exclusiveResGroups";

export const RESEARCHES: IResearchData[] = [
  //#region Researches
  {
    id: "m",
    name: "Metallurgist",
    description: "Unlock Metallurgists",
    unitsToUnlock: ["A", "a", "w", "W", "4", "5"],
    researchToUnlock: [
      "h",
      "p",
      "E",
      "M",
      "s1",
      "n",
      OPTIMIZED_SHIP_PREFIX + 1
    ],
    max: 1,
    priceMulti: 500,
    type: TECHNOLOGIES.MilitaryEngineering,
    technologiesToUnlock: ["e", TECHNOLOGIES.CivilEngineering.id],
    prodMulti: [
      { unitId: "m", multi: 0.5 },
      { unitId: "e", multi: 0.2 }
    ]
  },
  {
    id: "p",
    name: "Physics",
    description: "Unlock Physics Technology",
    max: 1,
    type: TECHNOLOGIES.Physics,
    researchToUnlock: ["c", "p0", "or1"],
    technologiesToUnlock: ["p"],
    modulesToUnlock: ["s"],
    effMulti: [{ unitId: "s", multi: 0.5 }],
    inspirationBuildingId: "3"
  },
  {
    id: "c",
    name: "Computing",
    description: "Unlock Computing Technology",
    max: 1,
    type: TECHNOLOGIES.Computing,
    spellToUnlock: "d1",
    computingPerSec: 3,
    technologiesToUnlock: ["c"],
    researchToUnlock: ["c1"]
  },
  {
    id: "n",
    name: "Naval Logistics",
    description: "Increase Naval Capacity",
    max: 1,
    type: TECHNOLOGIES.Naval,
    technologiesToUnlock: [TECHNOLOGIES.Naval.id],
    researchToUnlock: ["n1", "ns", "or2"],
    navalCapacity: 10,
    materialMulti: 0.5,
    districtMulti: 0.3
  },
  {
    id: "h",
    name: "Searching",
    description: "Unlock Searchers",
    max: 1,
    type: TECHNOLOGIES.Search,
    unitsToUnlock: ["r", "R", "6"],
    researchToUnlock: ["h0"],
    technologiesToUnlock: ["r"],
    inspirationDescription: "Defeat an enemy"
  },
  {
    id: "P",
    name: "Propulsion",
    description: "Unlock Propulsion",
    max: 1,
    type: TECHNOLOGIES.Propulsion,
    technologiesToUnlock: [TECHNOLOGIES.Propulsion.id],
    researchToUnlock: ["P1"],
    modulesToUnlock: ["d"]
  },
  {
    id: "x",
    name: "Robotics",
    description: "Unlock Replicators",
    max: 1,
    type: TECHNOLOGIES.Robotics,
    unitsToUnlock: ["x", "X", "7", "9"],
    technologiesToUnlock: [TECHNOLOGIES.Robotics.id],
    researchToUnlock: ["x1"],
    prodMulti: [
      { unitId: "m", multi: 0.3 },
      { unitId: "e", multi: 0.1 },
      { unitId: "s", multi: 0.3 },
      { unitId: "a", multi: 0.3 },
      { unitId: "w", multi: 0.3 },
      { unitId: "r", multi: 0.3 },
      { unitId: "X", multi: 0.3 },
      { unitId: "B", multi: 0.3 }
    ],
    inspirationDescription: "Mod any drones"
  },
  {
    id: "M",
    name: "Materials",
    description: "Unlock Materials Technology",
    max: 1,
    type: TECHNOLOGIES.Materials,
    technologiesToUnlock: ["m"],
    researchToUnlock: ["x", "N", "P", "M0", "or3"],
    inspirationBuildingId: "1",
    prodMulti: [
      { unitId: "m", multi: 0.4 },
      { unitId: "e", multi: 0.15 }
    ]
  },
  {
    id: "N",
    name: "Mining",
    description: "Unlock Mining Technology",
    max: 1,
    type: TECHNOLOGIES.Mining,
    technologiesToUnlock: [TECHNOLOGIES.Mining.id],
    prodMulti: [{ unitId: "m", multi: 0.5 }],
    researchToUnlock: ["N1", "N-0"],
    inspirationBuildingId: "1"
  },
  {
    id: "E",
    name: "Energy",
    description: "Unlock Energy Technology",
    max: 1,
    type: TECHNOLOGIES.Energy,
    technologiesToUnlock: [TECHNOLOGIES.Energy.id],
    limitMulti: [{ unitId: "E", multi: 1 }],
    effMulti: [{ unitId: "e", multi: 0.1 }],
    researchToUnlock: ["E0", "E-0"],
    inspirationBuildingId: "2"
  },
  {
    id: "b",
    name: "Nuke",
    description: "Nuke",
    max: 1,
    type: TECHNOLOGIES.MilitaryEngineering,
    unitsToUnlock: ["b", "B", "10", "11"],
    inspirationDescription: "Win a battle vs. ground defences"
  },
  {
    id: "ns",
    name: "Scavenging",
    description: "Increase materials gain from battles",
    type: TECHNOLOGIES.Naval,
    researchToUnlock: ["ns1"],
    materialMulti: 1,
    battleMulti: [
      { materialId: "M", multi: 1 },
      { materialId: "E", multi: 1 }
    ],
    inspirationDescription: "Defeat an enemy"
  },
  {
    id: "ns1",
    name: "Assimilation",
    description: "Increase components gain from battles",
    type: TECHNOLOGIES.Naval,
    battleMulti: [{ materialId: MAT_IDS.Components, multi: 1 }],
    inspirationDescription: "Defeat an enemy"
  },
  //#endregion
  //#region Search
  {
    id: "hz1",
    name: "Habitable zone",
    description: "",
    type: TECHNOLOGIES.Search,
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    unlockFrom: "h",
    districtMulti: 0.2
  },
  {
    id: "hz3",
    name: "Improved searching",
    description: "",
    type: TECHNOLOGIES.Search,
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    unlockFrom: "h0",
    effMulti: [{ unitId: "r", multi: 0.05 }]
  },
  {
    id: "hz2",
    name: "Optimistic zone",
    description: "",
    type: TECHNOLOGIES.Search,
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    unlockFrom: "h1",
    districtMulti: 0.25
  },
  //#endregion
  //#region Energy
  {
    id: "E-0",
    name: "Energy optimization",
    description: "",
    type: TECHNOLOGIES.Energy,
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    effMulti: [{ unitId: IDS.Technician, multi: 0.05 }]
  },
  {
    id: "E-1",
    name: "Renewable energy",
    description: "",
    type: TECHNOLOGIES.Energy,
    unlockFrom: "E0",
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    energyDistMulti: 0.3
  },
  //#endregion
  //#region Mining
  {
    id: "N-0",
    name: "Space mining",
    description: "",
    type: TECHNOLOGIES.Mining,
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    prodMulti: [{ unitId: IDS.Miner, multi: 0.1 }]
  },
  {
    id: "N-1",
    name: "Deep mining",
    description: "",
    type: TECHNOLOGIES.Mining,
    unlockFrom: "N1",
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    miningDistMulti: 0.3
  },
  //#endregion
  //#region Robotic
  {
    id: "X-1",
    name: "Assembly patterns",
    description: "",
    type: TECHNOLOGIES.Robotics,
    unlockFrom: "x",
    priceMulti: REPEATABLE_RES_PRICE_MULTI,
    effMulti: [{ unitId: IDS.Replicator, multi: 0.05 }]
  },
  //#endregion
  //#region Propulsion
  {
    id: "P-1",
    name: "Gravity assist",
    description: "",
    unlockFrom: "P2",
    type: TECHNOLOGIES.Propulsion,
    accelerationMulti: 0.05,
    max: 10
  },
  {
    id: "P-2",
    name: "Black Hole Gravity assist",
    description: "",
    unlockFrom: "P5",
    type: TECHNOLOGIES.Propulsion,
    accelerationMulti: 0.1,
    max: 10
  },
  {
    id: "P-3",
    name: "Wormhole travel",
    description: "",
    unlockFrom: "P8",
    type: TECHNOLOGIES.Propulsion,
    accelerationMulti: 0.15,
    max: 10
  },
  //#endregion
  //#region Origin Science
  {
    id: "or1",
    name: "Scientists origin",
    max: 1,
    description:
      "Droids were originally build for assisting in researches and exploring the space. This path focus on science, physics and searching. It can adapt to any play style.",
    type: TECHNOLOGIES.Physics,
    exclusiveGroup: ExclusiveResGroups.FIRST_ORIGIN,
    researchToUnlock: ["or11", "or13", "or14"],
    prodMulti: [{ unitId: "s", multi: 0.2 }],
    spellToUnlock: "or1",
    technologyBonus: [
      { techId: TECHNOLOGIES.Physics.id, multi: ORIGIN_1_TECH_MULTI },
      { techId: TECHNOLOGIES.Search.id, multi: ORIGIN_1_TECH_2_MULTI }
    ]
  },
  {
    id: "or11",
    name: "Research Module",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Physics,
    modulesToUnlock: ["N"],
    researchToUnlock: ["or12"],
    scienceMulti: 1
  },
  {
    id: "or12",
    name: "Orbital Research Lab",
    max: 10,
    description: "",
    type: TECHNOLOGIES.Physics,
    researchToUnlock: ["or15", "or16"],
    effMulti: [{ unitId: "s", multi: 0.015, secondUnitId: "i1" }],
    inspirationSpaceStationId: "i1"
  },
  {
    id: "or13",
    name: "Improved Laboratory",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Physics,
    buildingPoints: [{ buildingId: "3", quantity: 2 }],
    technologyBonus: [
      { techId: TECHNOLOGIES.Physics.id, multi: ORIGIN_1_TECH_MULTI * 0.5 }
    ]
  },
  {
    id: "or14",
    name: "Improved Observatory",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Search,
    buildingPoints: [{ buildingId: "6", quantity: 2 }],
    technologyBonus: [
      { techId: TECHNOLOGIES.Search.id, multi: ORIGIN_1_TECH_MULTI * 0.5 }
    ]
  },
  {
    id: "or15",
    name: "Scientist Yards",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    limitMulti: [{ unitId: IDS.Scientist, multi: 0.01, secondUnitId: "i2" }],
    inspirationSpaceStationId: "i2"
  },
  {
    id: "or16",
    name: "Searchers Yards",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Search,
    limitMulti: [{ unitId: IDS.Searcher, multi: 0.01, secondUnitId: "i2" }],
    inspirationSpaceStationId: "i2"
  },
  //#endregion
  //#region Origin War
  {
    id: "or2",
    name: "War origin",
    max: 1,
    description:
      "Droids were originally build for warfare. This path focus on battle (active style).",
    type: TECHNOLOGIES.Naval,
    exclusiveGroup: ExclusiveResGroups.FIRST_ORIGIN,
    spellToUnlock: "or2",
    researchToUnlock: ["or21", "or23", "or24"],
    technologyBonus: [
      { techId: TECHNOLOGIES.Naval.id, multi: ORIGIN_1_TECH_MULTI },
      {
        techId: TECHNOLOGIES.MilitaryEngineering.id,
        multi: ORIGIN_1_TECH_2_MULTI
      }
    ]
  },
  {
    id: "or21",
    name: "Tactics",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Naval,
    researchToUnlock: ["or27"],
    modulesToUnlock: ["W"],
    navalCapacity: 150
  },
  {
    id: "or22",
    name: "Planetary Acquisition",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Naval,
    districtMulti: 1
  },
  {
    id: "or23",
    name: "Military Industry",
    max: 1,
    description: "",
    type: TECHNOLOGIES.MilitaryEngineering,
    researchToUnlock: ["or25"],
    buildingPoints: [
      { buildingId: "4", quantity: 1 },
      { buildingId: "10", quantity: 1 }
    ],
    technologyBonus: [
      {
        techId: TECHNOLOGIES.MilitaryEngineering.id,
        multi: ORIGIN_1_TECH_MULTI * 0.25
      },
      { techId: TECHNOLOGIES.Naval.id, multi: ORIGIN_1_TECH_MULTI * 0.25 }
    ],
    limitMulti: [{ unitId: MAT_IDS.Nuke, multi: 1 }]
  },
  {
    id: "or24",
    name: "Pillage",
    max: 10,
    description: "",
    type: TECHNOLOGIES.Naval,
    researchToUnlock: ["or26"],
    materialMulti: 1
  },
  {
    id: "or25",
    name: "Military Focus",
    max: 1,
    description: "",
    type: TECHNOLOGIES.MilitaryEngineering,
    limitMulti: [
      { unitId: IDS.NukeSpecialist, multi: 0.2 },
      { unitId: IDS.Worker, multi: 0.2 },
      { unitId: MAT_IDS.Nuke, multi: 1 }
    ],
    buildingPoints: [
      { buildingId: "5", quantity: 1 },
      { buildingId: "10", quantity: 1 }
    ]
  },
  {
    id: "or26",
    name: "Ransack",
    max: 10,
    description: "",
    type: TECHNOLOGIES.Naval,
    researchToUnlock: ["or22"],
    materialMulti: 0.2,
    speedMulti: 0.1
  },
  {
    id: "or27",
    name: "Grand strategy",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Naval,
    modulesToUnlock: ["W"],
    navalCapacity: 200,
    technologyBonus: [
      { techId: TECHNOLOGIES.Naval.id, multi: ORIGIN_1_TECH_MULTI }
    ]
  },
  //#endregion
  //#region Origin Builders
  {
    id: "or3",
    name: "Builders origin",
    max: 1,
    description:
      "Droids were originally designed for industry. This path focus on idle style, with less reliance on battles.",
    type: TECHNOLOGIES.CivilEngineering,
    exclusiveGroup: ExclusiveResGroups.FIRST_ORIGIN,
    prodMulti: [{ unitId: "w", multi: 0.2 }],
    spellToUnlock: "or3",
    technologyBonus: [
      { techId: TECHNOLOGIES.CivilEngineering.id, multi: ORIGIN_1_TECH_MULTI },
      { techId: TECHNOLOGIES.Materials.id, multi: ORIGIN_1_TECH_2_MULTI }
    ],
    researchToUnlock: ["or31", "or33", "or34", "or36"]
  },
  {
    id: "or31",
    name: "Reactive Armour",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    modulesToUnlock: ["V"],
    researchToUnlock: ["or32"],
    shipProductionBonusAll: 1
  },
  {
    id: "or32",
    name: "Advanced Space Stations",
    max: 10,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    stationToUp: [],
    inspirationDescription: "Build any space station"
  },
  {
    id: "or33",
    name: "Primary Industry",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    researchToUnlock: ["or35"],
    buildingPoints: [
      { buildingId: "1", quantity: 1 },
      { buildingId: "2", quantity: 1 }
    ],
    technologyBonus: [
      { techId: TECHNOLOGIES.Mining.id, multi: ORIGIN_1_TECH_MULTI * 0.25 },
      { techId: TECHNOLOGIES.Energy.id, multi: ORIGIN_1_TECH_MULTI * 0.25 }
    ]
  },
  {
    id: "or34",
    name: "Secondary Industry",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    buildingPoints: [
      { buildingId: "4", quantity: 1 },
      { buildingId: "5", quantity: 1 }
    ],
    technologyBonus: [
      { techId: TECHNOLOGIES.Materials.id, multi: ORIGIN_1_TECH_MULTI * 0.25 },
      {
        techId: TECHNOLOGIES.CivilEngineering.id,
        multi: ORIGIN_1_TECH_MULTI * 0.25
      }
    ]
  },
  {
    id: "or35",
    name: "Orbital Satellites",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    researchToUnlock: ["or37", "or38"],
    effMulti: [{ unitId: IDS.Technician, multi: 0.02, secondUnitId: "i1" }],
    inspirationSpaceStationId: "i1"
  },
  {
    id: "or36",
    name: "Primary Industry focus",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    inspirationBuildingId: "2",
    limitMulti: [
      {
        unitId: IDS.Miner,
        multi: 0.4
      },
      {
        unitId: IDS.Technician,
        multi: 0.4
      }
    ]
  },
  {
    id: "or37",
    name: "Mining Drones Yards",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    limitMulti: [{ unitId: IDS.Miner, multi: 0.01, secondUnitId: "i2" }],
    inspirationSpaceStationId: "i2"
  },
  {
    id: "or38",
    name: "Technicians Yards",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    limitMulti: [{ unitId: IDS.Technician, multi: 0.01, secondUnitId: "i2" }],
    inspirationSpaceStationId: "i2"
  },
  //#endregion
  //#region MegStructures
  {
    id: "M" + MEGA_IDS.DysonSphere,
    name: "Dyson Sphere",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Energy,
    unitsToUnlock: [MEGA_IDS.DysonSphere],
    unlockFrom: "E8"
  },
  {
    id: "M" + MEGA_IDS.MegaFoundry,
    name: "Mega Foundry",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Materials,
    unitsToUnlock: [MEGA_IDS.MegaFoundry],
    unlockFrom: "M8"
  },
  {
    id: "M" + MEGA_IDS.MegaLaboratory,
    name: "Mega Laboratory",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Physics,
    unitsToUnlock: [MEGA_IDS.MegaLaboratory],
    unlockFrom: "p8"
  },
  {
    id: "M" + MEGA_IDS.MegaShipyard,
    name: "Mega Shipyard",
    max: 1,
    description: "",
    type: TECHNOLOGIES.CivilEngineering,
    unitsToUnlock: [MEGA_IDS.MegaShipyard],
    unlockFrom: "i6"
  },
  {
    id: "M" + MEGA_IDS.MegaTelescope,
    name: "Mega Telescope",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Search,
    unitsToUnlock: [MEGA_IDS.MegaTelescope],
    unlockFrom: "h8"
  },
  {
    id: "M" + MEGA_IDS.MegaNaval,
    name: "Mega Coordination Center",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Naval,
    unitsToUnlock: [MEGA_IDS.MegaNaval],
    unlockFrom: "n9"
  },
  {
    id: "M" + MEGA_IDS.Gateway,
    name: "Gateway",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Propulsion,
    unitsToUnlock: [MEGA_IDS.Gateway],
    unlockFrom: "P-3"
  },
  {
    id: "M" + MEGA_IDS.MegaComputing,
    name: "Mega Computing Center",
    max: 1,
    description: "",
    type: TECHNOLOGIES.Computing,
    unitsToUnlock: [MEGA_IDS.MegaComputing],
    unlockFrom: "c8"
  }
  //#endregion
];
