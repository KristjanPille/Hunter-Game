export interface IBuilding {
  id: string;
  nameOfBuilding: string
  maxHealth: number
  levelOfBuilding: number
  buildingType: number
  rangeOfBuilding?: number
  attackDamage?: number
  xCoordinate?: number
  yCoordinate?: number
  hunterBaseId?: string
}
