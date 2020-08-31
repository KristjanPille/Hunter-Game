import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IFetchResponse } from 'types/IFetchResponse';
import { AppState } from 'state/app-state';
import {BaseService} from "./base-service";
import {IShopBuilding} from "../domain/IShopBuilding";
import {IShopBuildingCreate} from "../domain/IShopBuildingCreate";

@autoinject
export class ShopBuildingService extends BaseService<IShopBuilding> {
  constructor(private appState: AppState, protected httpClient: HttpClient) {
    super('ShopBuildings', httpClient);
    this.httpClient.baseUrl = this.appState.baseUrl;
  }

  private readonly _baseUrl = 'ShopBuildings';


  async getAll(): Promise<IFetchResponse<IShopBuilding[]>> {
    try {
      const response = await this.httpClient
        .fetch(this.apiEndpointUrl, {
          cache: "no-store"
        });
      // happy case
      if (response.ok) {
        const data = (await response.json()) as IShopBuilding[];
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

  async getShopBuilding(id: string): Promise<IFetchResponse<IShopBuilding>> {
    try {
      const response = await this.httpClient
        .fetch(this._baseUrl + '/' + id, {
          cache: "no-store",
          headers: {
            authorization: "Bearer " + this.appState.jwt
          }
        });

      if (response.status >= 200 && response.status < 300) {
        const data = (await response.json()) as IShopBuilding;
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

  async updateShopBuilding(ShopBuilding: IShopBuilding): Promise<IFetchResponse<string>> {
    try {
      const response = await this.httpClient
        .put(this._baseUrl + '/' + ShopBuilding.id, JSON.stringify(ShopBuilding), {
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


  async createShopBuilding(ShopBuildingCreate: IShopBuildingCreate): Promise<IFetchResponse<string>> {
    try {
      const response = await this.httpClient
        .post(this._baseUrl, JSON.stringify(ShopBuildingCreate), {
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

  async deleteShopBuilding(id: string): Promise<IFetchResponse<string>> {

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
