import { autoinject, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration} from 'aurelia-router';
import { AppState } from 'state/app-state';
import {AlertType} from "./types/AlertType";
import {IAlertData} from "./types/IAlertData";
import '../static/site.css';
import {IState} from "./state/state";
import { Store, connectTo } from "aurelia-store";
import * as environment from '../config/environment.json';
import {HttpClient} from "aurelia-fetch-client";
import {IAccount} from "./domain/IAccount";
import {AccountService} from "./service/account-service";
import {HunterBaseService} from "./service/hunterBase-service";
import {IHunterBase} from "./domain/IHunterBase";

@connectTo()
@autoinject
export class App {
  private _alert: IAlertData | null = null;
  router?: Router;
  private userId: string = "";
  protected state!: IState;
  private _account?: IAccount;
  private hunterBases: IHunterBase[] = [];
  private baseId = "";

  constructor(private store: Store<IState>, private appState: AppState, private accountService: AccountService, private httpClient: HttpClient, private hunterBaseService: HunterBaseService) {
    this.httpClient.configure(config => {
      config
        .withBaseUrl(environment.backendUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  async attached(): Promise<void> {
    if (this.appState.jwt != null){
      await this.accountService.getUser().then(
        response => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            this._alert = null;
            this._account = response.data!;
            this.userId = this._account.id
          } else {
            // show error message
            this._alert = {
              message: response.statusCode.toString() + ' - ' + response.errorMessage,
              type: AlertType.Danger,
              dismissable: true,
            }
          }
        }
      );
    }
  }

  activate(){

  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;

    config.title = 'Aurelia exam';

    config.map([

      { route: ['Home/index'], name: 'Home', moduleId:
          PLATFORM.moduleName('views/Home/index'), nav: false, title: 'Home' },

      { route: ['account/login'], name: 'account-login', moduleId:
          PLATFORM.moduleName('views/account/login'), nav: false, title: 'Login' },

      { route: ['account/register'], name: 'account-register', moduleId:
          PLATFORM.moduleName('views/account/register'), nav: false, title: 'Register' },

      { route: ['HunterBases/edit'], name: 'HunterBases-edit', moduleId:
          PLATFORM.moduleName('views/HunterBases/edit'), nav: false, title: 'HunterBases Edit' },

      { route: ['HunterBaseAttack/attack/:id'], name: 'HunterBase-attack', moduleId:
          PLATFORM.moduleName('views/HunterBaseAttack/attack'), nav: false, title: 'HunterBase Attack' },
    ]);
    config.mapUnknownRoutes('views/Home/index');
  }

  logoutOnClick(){
    this.appState.email = null;
    this.appState.jwt = null;
    this.router!.navigateToRoute('account-login');
  }
}
