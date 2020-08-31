import {autoinject, observable} from 'aurelia-framework';
import { IAlertData } from 'types/IAlertData';
import { AlertType } from 'types/AlertType';
import { AppState } from 'state/app-state';
import {IState} from "../../state/state";
import {connectTo, Store} from "aurelia-store";
import {IHunterBase} from "../../domain/IHunterBase";
import {HunterBaseService} from "../../service/hunterBase-service";

@connectTo()
@autoinject
export class CampaignsIndex{
   private _hunterBases: IHunterBase[] = [];
   private _alert: IAlertData | null = null;
    @observable
    protected state!: IState;

    constructor(private store: Store<IState>, private hunterBaseService: HunterBaseService, private appState: AppState){

    }

    async attached() {
        await this.hunterBaseService.getAll().then(
            response => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                  console.log(response.data!)
                    this._alert = null;
                    this._hunterBases = response.data!;
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
