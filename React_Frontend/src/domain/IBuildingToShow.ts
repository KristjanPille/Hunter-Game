export interface IBuildingToShow {
  id: string;
  nameOfBuilding: string
  maxHealth: number
  levelOfBuilding: number
  buildingType: number
  buildingTypeVariant?: string
  rangeOfBuilding?: number
  attackDamage?: number
  AttackType?: number
  AttackSpeed?: number
  xCoordinate?: number
  yCoordinate?: number
  hunterBaseId?: string
}
