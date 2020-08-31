import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IFetchResponse } from 'types/IFetchResponse';
import { AppState } from 'state/app-state';
import {BaseService} from "./base-service";
import {IHunterBase} from "../domain/IHunterBase";
import {IHunterBaseCreate} from "../domain/IHunterBaseCreate";
import {IBuilding} from "../domain/IBuilding";

@autoinject
export class HunterBaseService extends BaseService<IHunterBase> {
  constructor(private appState: AppState, protected httpClient: HttpClient) {
    super('hunterBases', httpClient);
    this.httpClient.baseUrl = this.appState.baseUrl;
  }

  private readonly _baseUrl = 'hunterBases';


  attached(){

  }

  async getHunterBase(): Promise<IFetchResponse<IHunterBase>> {
    try {
      const response = await this.httpClient
        .fetch(this._baseUrl + '/base', {
          cache: "no-store",
          headers: {
            authorization: "Bearer " + this.appState.jwt
          }
        });

      if (response.status >= 200 && response.status < 300) {
        const data = (await response.json()) as IHunterBase;
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


  async getHomeBaseId(id: string): Promise<IFetchResponse<IHunterBase>> {
    try {
      const response = await this.httpClient
        .fetch(this._baseUrl + "/" + id, {
          cache: "no-store",
          headers: {
            authorization: "Bearer " + this.appState.jwt
          }
        });

      if (response.status >= 200 && response.status < 300) {
        const data = (await response.json()) as IHunterBase;
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

  async updateHunterBase(hunterBas: IHunterBase): Promise<IFetchResponse<string>> {
    try {
      const response = await this.httpClient
        .put(this._baseUrl + '/' + hunterBas.id, JSON.stringify(hunterBas), {
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


  async createHunterBas(hunterBase: IHunterBaseCreate): Promise<IFetchResponse<string>> {
    try {
      const response = await this.httpClient
        .post(this._baseUrl, JSON.stringify(hunterBase), {
          cache: 'no-store',
          headers: {
            authorization: "Bearer " + this.appState.jwt
          }
        })

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

  async deleteHunterBas(id: string): Promise<IFetchResponse<string>> {

    try {
      const response = await this.httpClient
        .delete(this._baseUrl + '/' + id, null, {
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
}
