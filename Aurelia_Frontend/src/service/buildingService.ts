import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IFetchResponse } from 'types/IFetchResponse';
import { AppState } from 'state/app-state';
import {BaseService} from "./base-service";
import {IBuilding} from "../domain/IBuilding";
import {IBuildingCreate} from "../domain/IBuildingCreate";

@autoinject
export class BuildingService extends BaseService<IBuilding> {
  constructor(private appState: AppState, protected httpClient: HttpClient) {
    super('Buildings', httpClient);
    this.httpClient.baseUrl = this.appState.baseUrl;
  }

  private readonly _baseUrl = 'Buildings';


  async getAll(): Promise<IFetchResponse<IBuilding[]>> {
    try {
      const response = await this.httpClient
        .fetch(this.apiEndpointUrl, {
          cache: "no-store"
        });
      // happy case
      if (response.ok) {
        const data = (await response.json()) as IBuilding[];
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


  async getHunterBaseSpecificBuildings(id: string): Promise<IFetchResponse<IBuilding[]>> {
    try {
      const response = await this.httpClient
        .fetch(this._baseUrl + '/homeBase/' + id, {
          cache: "no-store",
          headers: {
            authorization: "Bearer " + this.appState.jwt
          }
        });
      // happy case
      if (response.ok) {
        const data = (await response.json()) as IBuilding[];
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

  async getBuilding(id: string): Promise<IFetchResponse<IBuilding>> {
    try {
      const response = await this.httpClient
        .fetch(this._baseUrl + '/' + id, {
          cache: "no-store",
          headers: {
            authorization: "Bearer " + this.appState.jwt
          }
        });

      if (response.status >= 200 && response.status < 300) {
        const data = (await response.json()) as IBuilding;
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

  async updateBuilding(Building: IBuilding): Promise<IFetchResponse<string>> {
    try {
      const response = await this.httpClient
        .put(this._baseUrl + '/' + Building.id, JSON.stringify(Building), {
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


  async createBuilding(BuildingCreate: IBuildingCreate): Promise<IFetchResponse<string>> {
    try {
      const response = await this.httpClient
        .post(this._baseUrl, JSON.stringify(BuildingCreate), {
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

  async deleteBuilding(id: string): Promise<IFetchResponse<string>> {

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
