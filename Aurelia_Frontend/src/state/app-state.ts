import {options} from "jest-cli/build/cli/args";
import * as jwt_decode from "jwt-decode";

export class AppState {
    private roles = [];
    constructor(){

    }

    public readonly baseUrl = 'https://localhost:5001/api/v1.0/';

    // JavaScript Object Notation Web Token
    // to keep track of logged in status
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    get jwt():string | null {
        return localStorage.getItem('jwt');
    }

    get email():string | null {
      return localStorage.getItem('email');
    }

    get token() {
        let roles = null;
        if (this.jwt !== null) {
            const decoded = jwt_decode(this.jwt)
            // @ts-ignore
            roles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        }
        this.roles = roles;
        if(this.roles != null && this.roles.length > 1){
            return roles[1].toString();
        }
        return;
    }

    get role():string | null {
        return localStorage.getItem('role');
    }

    set email(value: string | null){
      if (value){
        localStorage.setItem('email', value);
      } else {
        localStorage.removeItem('email');
      }
    }

    set jwt(value: string | null){
        if (value){
            localStorage.setItem('jwt', value);
        } else {
            localStorage.removeItem('jwt');
        }
    }
    private setValue(key: string, value: Record<string, string> | null): void {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key);
        }
    }
}
