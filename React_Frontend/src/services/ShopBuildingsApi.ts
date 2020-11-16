import {IBuilding} from "../domain/IBuilding";
import Axios from "axios";
import {IHunterBase} from "../domain/IHunterBase";
import {IBuildingToShow} from "../domain/IBuildingToShow";
import {IShopBuilding} from "../domain/IShopBuilding";


export abstract class ShopBuildingsApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/shopBuildings/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAll(): Promise<IShopBuilding[]> {
        const url = "";
        try {
            const response = await this.axios.get<IShopBuilding[]>(url);
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

}
