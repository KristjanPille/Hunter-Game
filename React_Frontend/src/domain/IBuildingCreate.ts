export interface IBuildingCreate {
  nameOfBuilding: string
  maxHealth: number
  levelOfBuilding: number
  buildingType: number
  rangeOfBuilding?: number
  attackDamage?: number
  AttackType?: number
  AttackSpeed?: number
  hunterBaseId: string
}
