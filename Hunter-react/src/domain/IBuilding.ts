export interface IBuilding {
    id: string;
    nameOfBuilding: string
    maxHealth: number
    levelOfBuilding: number
    buildingType: number
    rangeOfBuilding?: number
    attackDamage?: number
    AttackType?: number
    AttackSpeed?: number
    xCoordinate?: number
    yCoordinate?: number
    hunterBaseId?: string
}
