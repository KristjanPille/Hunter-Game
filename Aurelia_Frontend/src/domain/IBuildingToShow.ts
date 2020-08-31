export interface IBuildingToShow {
  id: string;
  nameOfBuilding: string
  maxHealth: number
  levelOfBuilding: number
  buildingType: number
  buildingTypeVariant?: string
  rangeOfBuilding?: number
  attackDamage?: number
  xCoordinate?: number
  yCoordinate?: number
  hunterBaseId?: string
}
