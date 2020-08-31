import { autoinject, LogManager } from 'aurelia-framework';
import { AppState } from 'state/app-state';
import { HttpClient, json } from 'aurelia-fetch-client';
import { IFetchResponse } from 'types/IFetchResponse';
import { ILoginResponse } from 'domain/ILoginResponse';
import {IAccount} from "../domain/IAccount";

export var log = LogManager.getLogger('IdentityService');

@autoinject
export class AccountService {
    constructor(
        private appState: AppState,
        private httpClient: HttpClient) {
        this.httpClient.baseUrl = this.appState.baseUrl;
    }
    private readonly _baseUrl = 'appusers';

    async updateAccount(account: IAccount): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient
                .put(this._baseUrl + '/' + account.id, JSON.stringify(account), {
                    cache: 'no-store',
                    headers: {
                        authorization: "Bearer " + this.appState.jwt
                    }
                });

            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status
                    // no data
                }
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        }
        catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async getUser(): Promise<IFetchResponse<IAccount>> {
        try {
            const response = await this.httpClient
                .fetch(this._baseUrl + '/appuser', {
                    cache: "no-store",
                    headers: {
                        authorization: "Bearer " + this.appState.jwt
                    }
                });

            if (response.status >= 200 && response.status < 300) {
                const data = (await response.json()) as IAccount;
                return {

                    statusCode: response.status,
                    data: data
                }
            }

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

    async login(email: string, password: string): Promise<IFetchResponse<ILoginResponse>> {
        try {
            const response = await this.httpClient.post('account/login', JSON.stringify({
                email: email,
                password: password,
            }), {
                cache: 'no-store'
            });

            // happy case
            if (response.status >= 200 && response.status < 300){
                const data = (await response.json()) as ILoginResponse;
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
        }
        catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }


  async register(user: string, password: string, firstname: string, lastname:string, phoneNumber:string): Promise<any> {
    let url = this.appState.baseUrl + "account/register";
    let registerDTO = {
      email: user,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
    }

    try {
      const response = await this.httpClient.post(url, JSON.stringify(registerDTO), { cache: 'no-store' });
      log.debug('response', response);
      return response.json();
    }
    catch (reason) {
      log.debug('catch reason', reason);
    }
  }
}
