import { IUnitData } from "../data/iUnitData";
import { Production } from "./production";
import { IBase } from "../iBase";
import { BonusStack } from "../bonus/bonusStack";
import { MultiPrice } from "../prices/multiPrice";
import {
  ZERO,
  ONE,
  MOD_PER_ROBOTICS,
  TEN,
  COMPONENT_PRICE,
  MOD_COMPONENTS,
  MOD_RECYCLING,
  MAX_RECYCLING
} from "../CONSTANTS";
import { IUnlockable } from "../iUnlocable";
import { Game } from "../game";
import { ModStack } from "./modStack";

export class Unit implements IBase, IUnlockable {
  id = "";
  name = "";
  description = "";
  unlocked = false;
  icon = "";
  colorClass = "";
  showUiLimit = false;

  operativity = 100;
  production = new Array<Production>();
  makers = new Array<Production>();

  prodAllBonus = new BonusStack();
  prodEfficiency = new BonusStack();
  prodBy = new BonusStack();

  buyPrice = new MultiPrice();
  manualBought = ZERO;

  endIn = Number.POSITIVE_INFINITY;
  fullIn = Number.POSITIVE_INFINITY;
  isEnding = false;
  limit = Decimal.MAX_VALUE;
  limitTemp = Decimal.MAX_VALUE;
  private _oldLimit = Decimal.MAX_VALUE;

  buildingLimit: Unit;
  buildingLimitQuantity: Decimal;

  storedComponents = ZERO;
  needComponents = ZERO;
  components = COMPONENT_PRICE;
  componentsTemp = COMPONENT_PRICE;
  recycle = ZERO;
  recycleTemp = ZERO;
  assemblyPriority = 50;
  assemblyPriorityEnding = 500;

  quantity = new Decimal();
  private _quantityOld = this.quantity;

  perSec = new Decimal();
  private _perSecOld = this.perSec;

  buildPrice = ZERO;
  habSpace = ZERO;
  buildPriceNext = ZERO;
  modStack: ModStack;
  maxMods: Decimal = ZERO;
  unusedMods: Decimal = ZERO;

  constructor(public unitData: IUnitData) {
    this.id = unitData.id;
    this.name = unitData.name;
    this.description = unitData.description;
    if ("startQuantity" in unitData) {
      this.unlocked = true;
      this.quantity = new Decimal(unitData.startQuantity);
    }
    if ("icon" in unitData) this.icon = unitData.icon;
    if ("colorClass" in unitData) this.colorClass = unitData.colorClass;
    if ("buildingLimitQuantity" in unitData) {
      this.buildingLimitQuantity = new Decimal(unitData.buildingLimitQuantity);
    }
    if ("showUiLimit" in unitData) {
      this.showUiLimit = unitData.showUiLimit;
    }
  }
  public get uiLimit() {
    return this.limit;
  }
  setRelations() {
    if ("buildingLimit" in this.unitData) {
      this.buildingLimit = Game.getGame().resourceManager.units.find(
        u => u.id === this.unitData.buildingLimit
      );
    }
  }
  public getId(): string {
    return this.id;
  }
  unlock(): boolean {
    if (this.unlocked) return false;
    this.unlocked = true;
    if (this.buildingLimit) {
      this.buildingLimit.unlock();
      this.buildingLimit.quantity = ONE;
    }
    Game.getGame().resourceManager.reloadLists();
  }
  postUpdate() {
    if (this._quantityOld.eq(this.quantity)) {
      this.quantity = this._quantityOld;
    } else {
      this._quantityOld = this.quantity;
    }
    if (this._perSecOld.eq(this.perSec)) {
      this.perSec = this._perSecOld;
    } else {
      this._perSecOld = this.perSec;
    }

    this.reloadLimit();
    if (this._oldLimit.eq(this.limit)) {
      this.limit = this._oldLimit;
    } else {
      this._oldLimit = this.limit;
    }
    this.reloadNeedComponent();
  }
  buy(quantity: Decimal): boolean {
    if (
      this.buyPrice.buy(
        quantity,
        this.manualBought,
        this.limit.minus(this.quantity)
      )
    ) {
      this.manualBought = this.manualBought.plus(quantity);
      this.quantity = this.quantity.plus(quantity);
      this.afterBuy();
      return true;
    }
    return false;
  }
  afterBuy(): boolean {
    const rs = Game.getGame().resourceManager;
    switch (this.id) {
      case "f":
      case "e":
      case "m":
        if (rs.miner.quantity.gte(3) && rs.technician.quantity.gte(3)) {
          rs.scientist.unlock();
          rs.science.unlock();
          rs.reloadLists();
        }
        break;
    }

    return true;
  }
  reloadLimit() {
    if (!(this.buildingLimit && this.buildingLimitQuantity)) return false;
    this.limit = this.buildingLimit.quantity.times(this.buildingLimitQuantity);
    this.limitTemp = this.limit;
    if (this.modStack && this.modStack.droneMod) {
      this.limit = this.limit.times(this.modStack.droneMod.totalBonus);
      this.limitTemp = this.limit.times(this.modStack.droneMod.totalBonusTemp);
    }

    this.quantity = this.quantity.min(this.limit);
  }
  reloadMaxBuy() {
    this.buyPrice.reload(
      this.manualBought,
      ONE,
      this.limit.minus(this.quantity)
    );
  }
  reloadComponentPrice() {
    this.components = COMPONENT_PRICE;
    this.componentsTemp = COMPONENT_PRICE;
    if (this.modStack && this.modStack.componentsMod) {
      this.components = this.components.minus(
        this.modStack.componentsMod.quantity.times(MOD_COMPONENTS)
      );
      this.componentsTemp = this.components.minus(
        this.modStack.componentsMod.uiQuantity.times(MOD_COMPONENTS)
      );
    }
    this.recycle = ZERO;
    this.recycleTemp = ZERO;
    if (this.modStack && this.modStack.recyclingMod) {
      this.recycle = this.recycle.plus(
        this.modStack.recyclingMod.quantity.times(MOD_RECYCLING)
      );
      this.recycleTemp = this.recycleTemp.plus(
        this.modStack.recyclingMod.uiQuantity.times(MOD_RECYCLING)
      );
    }
    this.recycle = Decimal.min(
      this.recycle,
      this.components.times(MAX_RECYCLING)
    );
    this.recycleTemp = Decimal.min(
      this.recycleTemp,
      this.componentsTemp.times(MAX_RECYCLING)
    );
  }
  reloadNeedComponent() {
    this.needComponents = this.limit
      .minus(this.quantity)
      .times(this.components)
      .minus(this.storedComponents)
      .max(0);
  }
  getBuildPrice(index = Number.POSITIVE_INFINITY) {
    const toDoList = Game.getGame().spaceStationManager.toDo;
    let queued = 0;

    if (toDoList.length > 0) {
      for (let i = 0, n = Math.min(index, toDoList.length); i < n; i++) {
        if (toDoList[i].spaceStation === this) queued++;
      }
    }

    return Decimal.pow(1.1, this.quantity.plus(queued))
      .times(this.buildPrice)
      .floor();
  }
  reloadBuildPrice() {
    this.buildPriceNext = this.getBuildPrice();
  }
  addHabSpace(newHabSpace: Decimal) {
    if (newHabSpace.gt(0) && this.quantity.gt(0)) {
      const habSpace = Game.getGame().resourceManager.habitableSpace;
      habSpace.quantity = habSpace.quantity.plus(
        newHabSpace.times(this.quantity)
      );
    }
    this.habSpace = this.habSpace.plus(newHabSpace);
  }
  //#region Mods
  makeMods() {
    this.modStack = new ModStack(this.id !== "e");
  }
  reloadMaxMods() {
    const rs = Game.getGame().researchManager;
    this.maxMods = rs.roboticsTech.quantity.times(MOD_PER_ROBOTICS);

    this.maxMods = this.maxMods.floor();
  }
  //#endregion

  //#region Save and Load
  getSave(): any {
    const ret: any = {};
    ret.i = this.id;
    if (this.operativity !== 100) ret.o = this.operativity;
    if (!this.quantity.eq(0)) ret.q = this.quantity;
    if (!this.manualBought.eq(0)) ret.m = this.manualBought;
    if (this.modStack) ret.t = this.modStack.getSave();
    return ret;
  }
  load(save: any) {
    if (!("i" in save) || save.i !== this.id) return false;
    if ("o" in save) this.operativity = save.o;
    if ("q" in save) this.quantity = new Decimal(save.q);
    if ("m" in save) this.manualBought = new Decimal(save.m);
    if ("t" in save) this.modStack.load(save.t);
  }
  //#endregion
}
