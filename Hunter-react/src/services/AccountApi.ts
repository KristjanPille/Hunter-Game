import Axios from 'axios';
import {ILoginResponse} from "../domain/ILoginResponse";
import {IFetchResponse} from "../Types/IFetchResponse";


export abstract class AccountApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async login(email: string, password: string): Promise<IFetchResponse<ILoginResponse>> {
        try {
            const response = await this.axios.post('account/login', {
                email: email,
                password: password,
            });
            // happy case
            if (response.status >= 200 && response.status < 300) {
                const data = (await response.data) as ILoginResponse;
                return {
                    statusCode: response.status,
                    data: data
                }
            }
            // something went wrong
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    static async register(email: string, firstName: string, lastName: string, password: string, nameOfBase: string): Promise<any> {
        try {
            const response = await this.axios.post('account/register', {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                nameOfBase: nameOfBase
            });
            // happy case
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            // something went wrong
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }
}
