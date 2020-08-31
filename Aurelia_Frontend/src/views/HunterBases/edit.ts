import {autoinject} from 'aurelia-framework';
import {NavigationInstruction, RouteConfig, Router} from 'aurelia-router';
import {IAlertData} from 'types/IAlertData';
import {AlertType} from 'types/AlertType';
import {connectTo} from "aurelia-store";
import {HunterBaseService} from "../../service/hunterBase-service";
import {IHunterBase} from "../../domain/IHunterBase";
import {BuildingService} from "../../service/buildingService";
import {IBuilding} from "../../domain/IBuilding";
import {IBuildingToShow} from "../../domain/IBuildingToShow";
import {ShopBuildingService} from "../../service/shopBuilding-Service";
import {IShopBuilding} from "../../domain/IShopBuilding";
import {IHero} from "../../domain/IHero";
import {HeroService} from "../../service/Hero-Service";


@connectTo()
@autoinject
export class BuildingEdit {
    private _alert: IAlertData | null = null;

    _hunterBase: IHunterBase;
    selectedBuilding: IBuildingToShow;
    selectedBuildingFromShop: IShopBuilding;
    unplacedBuildingActive: IBuilding;
    private buildings: IBuilding[] = [];
    private heroes: IHero[] = [];
    private unplacedBuildings: IBuilding[] = [];
    private shopBuildings: IShopBuilding[] = [];
    private xMoveCoordinate = null;
    private yMoveCoordinate = null;
    private movingInProcess = false;
    private xDocumentCoordinate = null;
    private yDocumentCoordinate = null;


    constructor(private hunterBaseService: HunterBaseService, private buildingService: BuildingService, private router: Router, private shopBuildingService: ShopBuildingService,
                private heroService: HeroService) {
    }

    async attached() {
      await this.hunterBaseService.getHunterBase().then(
        response => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            this._alert = null;
            this._hunterBase = response.data!;
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
      await this.getHunterBaseBuildings();

      await this.heroService.getAll().then(
        response => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            this._alert = null;
            this.heroes = response.data!;
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

      // Gets shop buildings
      await this.shopBuildingService.getAll().then(
        response => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            this._alert = null;
            this.shopBuildings = response.data!;
            for (let i = 0; i < this.shopBuildings.length; i++){
              if(this.shopBuildings[i].buildingType == 1){
                this.shopBuildings[i].buildingTypeVariant = "Peaceful Tower"
              }
              else if(this.shopBuildings[i].buildingType == 2){
                this.shopBuildings[i].buildingTypeVariant = "Attack Tower"
              }
            }
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
    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {

    }

    async getHunterBaseBuildings(){
      await this.buildingService.getHunterBaseSpecificBuildings(this._hunterBase.id).then(
        response => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            this._alert = null;
            this.buildings = response.data!;
            if(this.buildings.length > 0){
              for (let i = 0; i < this.buildings.length; i++){
                if(this.buildings[i] != null && this.buildings[i].xCoordinate != null && this.buildings[i].yCoordinate != null){
                  let building = document.getElementById(this.coordinatesConvertorToViewID(this.buildings[i].xCoordinate, this.buildings[i].yCoordinate));
                  let pictureName = this.buildings[i].nameOfBuilding.replace(/\s+/g, '').toUpperCase();
                  building.style.backgroundImage = "url(" + pictureName + ".jpg" + ")"
                }
                else {
                  if(this.unplacedBuildings.find(b => b.id == this.buildings[i].id) == null){
                    this.unplacedBuildings.push(this.buildings[i]);
                    document.getElementById("unplacedBuildings").style.display = "block";
                  }
                }
              }
            }
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

    mouseOverInfo(xCoordinate: string, yCoordinate: string){
      this.selectedBuilding = this.buildings.find(building => building.xCoordinate == Number(xCoordinate) && building.yCoordinate == Number(yCoordinate));
      if(this.selectedBuilding != null){
        this.xDocumentCoordinate = Number(xCoordinate);
        this.yDocumentCoordinate = Number(yCoordinate);
        if(this.selectedBuilding.buildingType == 1){
          this.selectedBuilding.buildingTypeVariant = "Peaceful Tower"
          document.getElementById('selectedAttackBuilding').style.display = 'none';
          document.getElementById('selectedPeacefulBuilding').style.display = 'block';
        }
        else if(this.selectedBuilding.buildingType == 2){
          this.selectedBuilding.buildingTypeVariant = "Attack Tower"
          document.getElementById('selectedPeacefulBuilding').style.display = 'none';
          document.getElementById('selectedAttackBuilding').style.display = 'block';
        }
        // we have a building, now lets show info about it
      }
      else {
        if(this.xDocumentCoordinate != null && this.yDocumentCoordinate != null){
          document.getElementById('selectedPeacefulBuilding').style.display = 'none';
          document.getElementById('selectedAttackBuilding').style.display = 'none';
          this.selectedBuilding = null;
        }
      }
    }

    async moveBuilding(xCoordinate: string, yCoordinate: string){
      if(this.unplacedBuildingActive == null){
      if(this.movingInProcess == false && this.buildings.find(building => building.xCoordinate == Number(xCoordinate) && building.yCoordinate == Number(yCoordinate))){
        this.xMoveCoordinate = xCoordinate;
        this.yMoveCoordinate = yCoordinate;
        this.movingInProcess = true;
        document.getElementById(this.coordinatesConvertorToViewID(Number(xCoordinate), Number(yCoordinate))).style.backgroundImage = "url(grass.jpg)"
      }
      else if(this.movingInProcess == true){
        if(this.buildings.find(building => building.xCoordinate == Number(xCoordinate) && building.yCoordinate == Number(yCoordinate)) == null){
        let moveBuilding = this.buildings.find(building => building.xCoordinate == this.xMoveCoordinate && building.yCoordinate == this.yMoveCoordinate)
        moveBuilding.xCoordinate = Number(xCoordinate);
        moveBuilding.yCoordinate = Number(yCoordinate);
        this.updateBuildingCoordinates(moveBuilding);

        document.getElementById(this.coordinatesConvertorToViewID(Number(xCoordinate), Number(yCoordinate))).style.backgroundImage = "url(" + moveBuilding.nameOfBuilding.replace(/\s+/g, '').toUpperCase() + ".jpg)"
        this.movingInProcess = false;
        }
      }
      }
      else {
        {
          let indexOfUnplacedBuilding = this.unplacedBuildings.indexOf(this.unplacedBuildingActive)
          {
            if (this.buildings.find(building => building.xCoordinate == Number(xCoordinate) && building.yCoordinate == Number(yCoordinate)) == null) {
              this.buildings.find(building => building.id == this.unplacedBuildingActive.id).xCoordinate = Number(xCoordinate);
              this.buildings.find(building => building.id == this.unplacedBuildingActive.id).yCoordinate = Number(yCoordinate);
              await this.buildingService.updateBuilding(this.buildings.find(building => building.id == this.unplacedBuildingActive.id)).then(
                response => {
                  if (response.statusCode >= 200 && response.statusCode < 300) {
                    this._alert = null;
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
              await this.getHunterBaseBuildings();
            }
            {
              if (indexOfUnplacedBuilding > -1) {
                this.unplacedBuildings.splice(indexOfUnplacedBuilding, 1);
              }
              if(this.unplacedBuildings.length == 0){
                document.getElementById("unplacedBuildings").style.display = "none";
              }
              this.unplacedBuildingActive = null;
            }
          }
        }
      }
    }

    updateBuildingCoordinates(building: IBuilding){
        this.buildingService
          .updateBuilding(building)
          .then(
            response => {
              if (response.statusCode >= 200 && response.statusCode < 300) {
                this._alert = null;
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


    coordinatesConvertorToViewID(xCoordinate: number, yCoordinate: number){
      return xCoordinate + '|' + yCoordinate;
    }

    // Returns a list with 2 members: xCoordinate & yCoordinate
    viewIDConvertorToCoordinates(ID: string){
      return ID.split("|");
    }



    onSubmit(event: Event) {
        event.preventDefault();
    }

    buildingSelectedFromShop(buildingID: string){
      this.shopBuildingService.getShopBuilding(buildingID)
        .then(
          response => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
              this.selectedBuildingFromShop = response.data!;
              this._alert = null;
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
      document.getElementById("overlay").style.display = "block";
    }

    async buildingSelectedFromShopConfirm(){
      if(this._hunterBase.coins - this.selectedBuildingFromShop.price >= 0){
        this._hunterBase.coins = this._hunterBase.coins - this.selectedBuildingFromShop.price;

        await this.buildingService.createBuilding({ nameOfBuilding: this.selectedBuildingFromShop.nameOfBuilding,
          maxHealth: this.selectedBuildingFromShop.maxHealth, levelOfBuilding: this.selectedBuildingFromShop.levelOfBuilding,
          buildingType: this.selectedBuildingFromShop.buildingType, rangeOfBuilding: this.selectedBuildingFromShop.rangeOfBuilding,
          attackDamage: this.selectedBuildingFromShop.attackDamage, hunterBaseId: this._hunterBase.id
        })
          .then(
            response => {
              if (response.statusCode >= 200 && response.statusCode < 300) {
                this.hunterBaseService.updateHunterBase(this._hunterBase).then(
                  response => {
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                      this._alert = null;
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

                this._alert = null;
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
        await this.buildingService.getHunterBaseSpecificBuildings(this._hunterBase.id).then(
          response => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
              this._alert = null;
              this.buildings = response.data!;
              for (let i = 0; i < this.buildings.length; i++){
                if(this.buildings[i].xCoordinate == null && this.buildings[i].yCoordinate == null){
                  let unplacedBuilding = this.unplacedBuildings.find(building => building.id == this.buildings[i].id);
                  if(unplacedBuilding == null && this.unplacedBuildings.find(building => building.id == this.buildings[i].id) == null){
                    this.unplacedBuildings.push(this.buildings[i]);
                  }
                }
              }
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
        this.selectedBuildingFromShop = null;
        document.getElementById("overlay").style.display = "none";
        document.getElementById("unplacedBuildings").style.display = "block";
      }
      else{
        document.getElementById("overlay").style.display = "none";
        alert ("You don't have enough money for " + this.selectedBuildingFromShop.nameOfBuilding);
      }
    }
    buildingSelectedFromShopCancel(buildingID: string){
      this.selectedBuildingFromShop = null;
      document.getElementById("overlay").style.display = "none";
    }

    unselectedBuildingSelect(unplacedBuildingID: string){
      this.unplacedBuildingActive = this.unplacedBuildings.find(building => building.id == unplacedBuildingID)

    }

    //Deletes event listeners!!!
    get hasMoreThanOne() {
      if(this.unplacedBuildings.length > 1){
        return true;
      }
      return this.unplacedBuildings.length >= 0;
    }

}
