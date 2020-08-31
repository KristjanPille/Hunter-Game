import {autoinject, LogManager, observable} from 'aurelia-framework';
import { AccountService } from 'service/account-service';
import { AppState } from 'state/app-state';
import { Router } from 'aurelia-router';
import {AlertType} from "../../types/AlertType";
import {IAlertData} from "../../types/IAlertData";
import {connectTo, Store} from "aurelia-store";
import {IState} from "../../state/state";


@connectTo()
@autoinject
export class AccountRegister {
    private _alert: IAlertData | null = null;
    private _email: string = "";
    private password: string = "";
    private _firstname: string = "";
    private _lastname: string = "";
    private _phoneNr: string = "";
    private _hunterBaseName: string = "";
    private confirmPassword: string = "";
    private _errorMessage: string | null = null;
    private emailError = "";
    private firstNameError = "";
    private lastNameError = "";
    private phoneNrError = "";
    private _hunterBaseNameError = "";
    private passwordError = "";
    private passwordConfirmError = "";
    protected newState!: IState;
    @observable
    protected state!: IState;

    constructor(
        private accountService: AccountService,
        private appState: AppState,
        private router: Router,
        private store: Store<IState>
      ) {

      }
    attached() {

    }

    private stateChanged(newValue: IState): void {
        this.newState = newValue;
    }



    submit(): void {
        if(this._email == ""){
          this.emailError = "Please enter email";
            // @ts-ignore
            document.getElementById('popupEmail').style.display = 'block';
            return
        }
      if(this._hunterBaseName == ""){
        this._hunterBaseNameError = "Please enter hunter Base name";
        // @ts-ignore
        document.getElementById('popupEmail').style.display = 'block';
        return
      }
        if(this._firstname == ""){
          this.firstNameError = "Palun sisestage eesnimi";
            // @ts-ignore
            document.getElementById('popupFirstName').style.display = 'block';
            return
        }
        if(this._lastname == ""){

                this.lastNameError = "Palun sisestage perekonna nimi";

            // @ts-ignore
            document.getElementById('popupLastName').style.display = 'block';

            return
        }
        if(this._phoneNr=="" || this._phoneNr.length > 20 || !/^\d+$/.test(this._phoneNr)){

          this.phoneNrError = "Please enter valid phone number";

            // @ts-ignore
            document.getElementById('popupPhoneNr').style.display = 'block';

            return
        }
        if(this.confirmPassword==""){

          this.passwordConfirmError = "Please confirm your password";

            // @ts-ignore
            document.getElementById('popupPasswordConfirm').style.display = 'block';

            return
        }
        if( this.password != this.confirmPassword){

          this.passwordError = "Passwords do not match";
          this.passwordConfirmError = "Passwords do not match";

            // @ts-ignore
            document.getElementById('popupPasswordConfirm').style.display = 'block';
            // @ts-ignore
            document.getElementById('popupPassword').style.display = 'block';
            return
        }
        if(this.password == ""){

          this.passwordError = "Please enter password";

            // @ts-ignore
            document.getElementById('popupPassword').style.display = 'block';

            return
        }


      this.accountService.register(this._email, this.password, this._firstname, this._lastname, this._phoneNr)
        .then(response => {
          if (response !== undefined && response.token.length > 5) {
            this.appState.jwt = response.token;
            this.accountService.login(this._email, this.password).then(
              response => {
                if (response.statusCode == 200) {
                  this.appState.jwt = response.data!.token;
                  this.router!.navigateToRoute('Home');
                } else {
                  this._errorMessage = response.statusCode.toString() + ' ' + response.errorMessage!
                }
              }
            );
          }
        });
    }
}
