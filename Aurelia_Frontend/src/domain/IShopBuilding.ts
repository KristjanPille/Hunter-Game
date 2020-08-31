export interface IShopBuilding {
  id: string;
  nameOfBuilding: string
  maxHealth: number
  levelOfBuilding: number
  price: number
  buildingType: number
  buildingTypeVariant?: string
  rangeOfBuilding?: number
  attackDamage?: number
}
