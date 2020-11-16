export interface IBuilding {
    id: string;
    nameOfBuilding: string
    maxHealth: number
    levelOfBuilding: number
    buildingType: number
    rangeOfBuilding?: number
    attackDamage?: number
    attackType?: number
    attackSpeed?: number
    xCoordinate?: number
    yCoordinate?: number
    hunterBaseId?: string
}
