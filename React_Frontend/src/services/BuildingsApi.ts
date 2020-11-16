import {IBuilding} from "../domain/IBuilding";
import Axios from "axios";
import {IHunterBase} from "../domain/IHunterBase";
import {IBuildingToShow} from "../domain/IBuildingToShow";
import {IHunterBaseCreate} from "../domain/IHunterBaseCreate";
import {IBuildingCreate} from "../domain/IBuildingCreate";


export abstract class BuildingsApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/buildings/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async create(building: IBuildingCreate): Promise<void> {
        const url = "";
        try {
            const response = await this.axios.post<IBuildingCreate>(url, building, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            console.log('update response', response);
            if (response.status === 200) {
                return
            }
            return
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }

    static async getAll(): Promise<IBuilding[]> {
        const url = "";
        try {
            const response = await this.axios.get<IBuildingToShow[]>(url);
            console.log('getAll response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getHunterBaseSpecificBuildings(id: string): Promise<IBuilding[]> {
        const url = 'homeBase/' + id;
        console.log( id);
        try {
            const response = await this.axios.get<IBuilding[]>(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            console.log('getHunterBaseSpecificBuildings response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async update(building: IBuilding): Promise<void> {
        const url = "" + building.id;
        try {
            const response = await this.axios.put<IHunterBase>(url, building, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            console.log('update response', response);
            if (response.status === 200) {
                return
            }
            return
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }
}
