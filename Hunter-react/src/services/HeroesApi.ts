import {IBuilding} from "../domain/IBuilding";
import Axios from "axios";
import {IHunterBase} from "../domain/IHunterBase";
import {IHero} from "../domain/IHero";


export abstract class HeroesApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/heroes/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )
    // @ts-ignore
    static async getAll(): IHero[] {
        const url = "";
        try {
            const response = await this.axios.get<IHero[]>(url);
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
