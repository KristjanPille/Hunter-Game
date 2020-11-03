import Axios from 'axios';
import {IHunterBaseCreate} from "../domain/IHunterBaseCreate";
import {IHunterBase} from "../domain/IHunterBase";
export abstract class HunterBaseApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/hunterBases/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )
    static async getAll(): Promise<IHunterBase[]> {
        const url = "";
        try {
            const response = await this.axios.get<IHunterBase[]>(url);
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

    static async getHunterBase(): Promise<IHunterBase> {
        const url = "base";
        try {
            const response = await this.axios.get<IHunterBase>(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            console.log('getHunterBase response', response);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return error;
        }
    }

    static async update(HunterBase: IHunterBase): Promise<void> {
        const url = "" + HunterBase.id;
        try {
            const response = await this.axios.put<IHunterBase>(url, HunterBase, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            console.log('update response', response);
            if (response.status === 200) {
                return
            }
            return
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }

    static async create(HunterBase: IHunterBaseCreate): Promise<void> {
        const url = "";
        try {
            const response = await this.axios.post<IHunterBaseCreate>(url, HunterBase, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            console.log('update response', response);
            if (response.status === 200) {
                return
            }
            return
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }

    static async delete(id: string): Promise<void> {
        const url = "" + id;
        try {
            const response = await this.axios.delete<IHunterBase>(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } })
            if (response.status === 200) {
                return
            }
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }
}
