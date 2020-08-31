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
import {IHero} from "../../domain/IHero";
import {HeroService} from "../../service/Hero-Service";


@connectTo()
@autoinject
export class BuildingEdit {
    private _alert: IAlertData | null = null;

    homeBase: IHunterBase;
    selectedBuilding: IBuildingToShow;
    private buildings: IBuilding[] = [];
    private xDocumentCoordinate = null;
    private yDocumentCoordinate = null;
    private oldXDocumentCoordinate = null;
    private oldYDocumentCoordinate = null;
    private heroes: IHero[] = [];
    selectedHero: IHero;
    myKeypressCallback: any

    constructor(private hunterBaseService: HunterBaseService, private buildingService: BuildingService, private router: Router, private shopBuildingService: ShopBuildingService,
                private heroService: HeroService) {
      this.myKeypressCallback = this.keypressInput.bind(this);
    }

    async attached() {
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
    }
    async activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {
      await this.hunterBaseService.getHomeBaseId(params.id).then(
        response => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            this._alert = null;
            this.homeBase = response.data!;
            this.getHunterBaseBuildings();
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
      window.addEventListener('keypress', this.myKeypressCallback, false);
    }
  keypressInput(e) {
    let hero = this.selectedHero.nameOfHero.replace(/\s+/g, '').toUpperCase();
    if(e.key == "w"){
      if(this.oldXDocumentCoordinate - 1 >= 0  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate)).style.backgroundImage == ""){
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate);
        let newHeroPlaceW = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate));
        this.oldXDocumentCoordinate = this.oldXDocumentCoordinate - 1;
        newHeroPlaceW.style.backgroundImage = "url(" + hero + ".jpg" + ")"
      }
    }
    if(e.key == "a") {
      if(this.oldYDocumentCoordinate - 1 >= 0  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1)).style.backgroundImage == "") {
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1);
        let newHeroPlaceA = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1));
        this.oldYDocumentCoordinate = this.oldYDocumentCoordinate - 1;
        newHeroPlaceA.style.backgroundImage = "url(" + hero + ".jpg" + ")"
      }
    }
    if(e.key == "s") {
      if(this.oldXDocumentCoordinate + 1 <= 15  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate)).style.backgroundImage == "") {
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate);
        let newHeroPlaceS = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate));
        this.oldXDocumentCoordinate = this.oldXDocumentCoordinate + 1;
        newHeroPlaceS.style.backgroundImage = "url(" + hero + ".jpg" + ")"
      }
    }
    if(e.key == "d") {
      if(this.oldYDocumentCoordinate + 1 <= 15  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate + 1)).style.backgroundImage == "") {
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate + 1);
        let newHeroPlaceD = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate + 1));
        this.oldYDocumentCoordinate = this.oldYDocumentCoordinate + 1;
        newHeroPlaceD.style.backgroundImage = "url(" + hero + ".jpg" + ")"
      }
    }
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


  async getHunterBaseBuildings(){
    await this.buildingService.getHunterBaseSpecificBuildings(this.homeBase.id).then(
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

  selectHero(heroID: string){
      this.selectedHero = this.heroes.find(hero => hero.id == heroID);
      for (let i = 0; i < this.heroes.length; i++) {
        // @ts-ignore
        document.getElementById(this.heroes[i].id).style.backgroundColor = '#383838';
      }
     document.getElementById(heroID).style.backgroundColor = 'red';
  }

  placeHero(xCoordinate: string, yCoordinate: string){
    let heroPlace = document.getElementById(this.coordinatesConvertorToViewID(Number(xCoordinate), Number(yCoordinate)));

    this.oldXDocumentCoordinate = Number(xCoordinate);
    this.oldYDocumentCoordinate = Number(yCoordinate);

    let hero = this.selectedHero.nameOfHero.replace(/\s+/g, '').toUpperCase();
    heroPlace.style.backgroundImage = "url(" + hero + ".jpg" + ")"
  }

  deleteOldPlace(xCoordinate: string, yCoordinate: string){
    let heroPlace = document.getElementById(this.coordinatesConvertorToViewID(Number(xCoordinate), Number(yCoordinate)));
    heroPlace.style.backgroundImage = "";
  }


  coordinatesConvertorToViewID(xCoordinate: number, yCoordinate: number){
    return xCoordinate + '|' + yCoordinate;
  }

  // Returns a list with 2 members: xCoordinate & yCoordinate
  viewIDConvertorToCoordinates(ID: string){
    return ID.split("|");
  }


  towerDamageDistributor(xCoordinate: number, yCoordinate: number){
    if(this.buildings.find(building => building.xCoordinate == xCoordinate - 1 && building.yCoordinate == yCoordinate) != null){
      let oldBuilding = this.buildings.find(building => building.xCoordinate == xCoordinate - 1 && building.yCoordinate == yCoordinate)
      let buildingHP  = oldBuilding.maxHealth - this.selectedHero.attackDamage;
      this.buildings.find(building => building.xCoordinate == xCoordinate - 1 && building.yCoordinate == yCoordinate).maxHealth = buildingHP
      console.log(buildingHP)
      if(this.buildings.find(building => building.xCoordinate == xCoordinate - 1 && building.yCoordinate == yCoordinate).maxHealth <= 0){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate)).style.backgroundImage = "url(" + "SKULL" + ".jpg" + ")";
      }
    }
    else if(this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate) != null){
      let oldBuilding = this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate)
      let buildingHP  = oldBuilding.maxHealth - this.selectedHero.attackDamage;
      this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate).maxHealth = buildingHP
      console.log(buildingHP)
      if(this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate).maxHealth <= 0){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate + 1, yCoordinate)).style.backgroundImage ="url(" + "SKULL" + ".jpg" + ")";
      }
    }
    else if(this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate - 1) != null){
      let oldBuilding = this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate - 1)
      let buildingHP  = oldBuilding.maxHealth - this.selectedHero.attackDamage;
      this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate - 1).maxHealth = buildingHP
      if(this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate - 1).maxHealth <= 0){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate - 1)).style.backgroundImage = "url(" + "SKULL" + ".jpg" + ")";
      }
      console.log(buildingHP)
    }
    else if(this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1) != null){
      let oldBuilding = this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1)
      let buildingHP  = oldBuilding.maxHealth - this.selectedHero.attackDamage;
      this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1).maxHealth = buildingHP
      if(this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1).maxHealth <= 0){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate + 1)).style.backgroundImage = "url(" + "SKULL" + ".jpg" + ")";
      }
      console.log(buildingHP)
    }
  }
}
