import Axios from 'axios';
import { IService } from '../domain/IService';
export abstract class ServicesApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/Services/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )
    static async getAll(): Promise<IService[]> {
        const url = "";
        try {
            const response = await this.axios.get<IService[]>(url);
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
