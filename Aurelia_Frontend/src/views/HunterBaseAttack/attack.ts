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

    private buildingsAttackCoordinatesDict = {};
    private heroPlace = false;
    private canBePlacedHere = false;
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
    timeLeft = 180;
    private cannonLastCoordinates = null;
    private cannonBallID = null;

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
      console.log(this.cannonBallID )
    let hero = this.selectedHero.nameOfHero.replace(/\s+/g, '').toUpperCase();
    if(e.key == "w"){
      if(this.oldXDocumentCoordinate - 1 >= 0  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate)).style.backgroundImage == ""
        || this.cannonBallID == this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate)){
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate);
        let newHeroPlaceW = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate));
        this.oldXDocumentCoordinate = this.oldXDocumentCoordinate - 1;
        newHeroPlaceW.style.backgroundImage = "url(" + hero + ".jpg" + ")"
        this.TowerCallOut(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
      }
    }
    if(e.key == "a") {
      if(this.oldYDocumentCoordinate - 1 >= 0  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1)).style.backgroundImage == ""
        || this.cannonBallID == this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1)) {
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1);
        let newHeroPlaceA = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate - 1));
        this.oldYDocumentCoordinate = this.oldYDocumentCoordinate - 1;
        newHeroPlaceA.style.backgroundImage = "url(" + hero + ".jpg" + ")"
        this.TowerCallOut(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
      }
    }
    if(e.key == "s") {
      if(this.oldXDocumentCoordinate + 1 <= 15  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate)).style.backgroundImage == ""
        || this.cannonBallID == this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate)) {
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate);
        let newHeroPlaceS = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate + 1, this.oldYDocumentCoordinate));
        this.oldXDocumentCoordinate = this.oldXDocumentCoordinate + 1;
        newHeroPlaceS.style.backgroundImage = "url(" + hero + ".jpg" + ")"
        this.TowerCallOut(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
      }
    }
    if(e.key == "d") {
      if(this.oldYDocumentCoordinate + 1 <= 15  && document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate + 1)).style.backgroundImage == ""
        || this.cannonBallID == this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate , this.oldYDocumentCoordinate + 1)) {
        this.deleteOldPlace(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
        this.towerDamageDistributor(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate + 1);
        let newHeroPlaceD = document.getElementById(this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate + 1));
        this.oldYDocumentCoordinate = this.oldYDocumentCoordinate + 1;
        newHeroPlaceD.style.backgroundImage = "url(" + hero + ".jpg" + ")"
        this.TowerCallOut(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate);
      }
    }
  }

  mouseOverInfo(xCoordinate: string, yCoordinate: string){
    let idList = [];
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
        idList = this.buildingsAttackCoordinatesDict[this.selectedBuilding.id];
        for (let i = 0; i < idList.length; i++){

          let xCoordinate = this.viewIDConvertorToCoordinates(idList[i])[0];
          let yCoordinate = this.viewIDConvertorToCoordinates(idList[i])[1];

          if(document.getElementById(idList[i])
            && idList[i] != this.coordinatesConvertorToViewID(this.selectedBuilding.xCoordinate, this.selectedBuilding.yCoordinate)
            && !this.buildings.find(m => m.xCoordinate == Number(xCoordinate) && m.yCoordinate == Number(yCoordinate)) ){
            document.getElementById(idList[i]).style.boxShadow = "inset 0 0 0 50vw rgba(255,0,150,0.3)";
          }
        }

        this.selectedBuilding.buildingTypeVariant = "Attack Tower"
        document.getElementById('selectedPeacefulBuilding').style.display = 'none';
        document.getElementById('selectedAttackBuilding').style.display = 'block';
      }
      // we have a building, now lets show info about it
    }
    else {
      if(this.xDocumentCoordinate != null && this.yDocumentCoordinate != null){
        for (const [key, value] of Object.entries(this.buildingsAttackCoordinatesDict)) {
          for (let i = 0; i < this.buildingsAttackCoordinatesDict[key].length; i++){
            if(document.getElementById(this.buildingsAttackCoordinatesDict[key][i])){
              document.getElementById(this.buildingsAttackCoordinatesDict[key][i]).style.boxShadow = "none";
            }
          }
        }
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
            this.buildingRadiusAdderToAttackDict();
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
    let potentialBuilding = this.buildings.find(m => m.xCoordinate == Number(xCoordinate) && m.yCoordinate == Number(yCoordinate));
      if(this.heroPlace == false && potentialBuilding == null && this.placementToOuterRim(xCoordinate, yCoordinate) == true){
        document.getElementById("timeParent").style.display = "block";
        let display = document.querySelector('#time');
        this.startTimer(display);
        let heroPlace = document.getElementById(this.coordinatesConvertorToViewID(Number(xCoordinate), Number(yCoordinate)));

        this.oldXDocumentCoordinate = Number(xCoordinate);
        this.oldYDocumentCoordinate = Number(yCoordinate);

        let hero = this.selectedHero.nameOfHero.replace(/\s+/g, '').toUpperCase();
        heroPlace.style.backgroundImage = "url(" + hero + ".jpg" + ")"
        this.heroPlace = true;
      }
  }

  placementToOuterRim(xCoordinate: string, yCoordinate: string){
      return Number(yCoordinate) == 15 || Number(xCoordinate) == 15 || Number(xCoordinate) == 0 || Number(yCoordinate) == 0;
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
      if(this.buildings.find(building => building.xCoordinate == xCoordinate - 1 && building.yCoordinate == yCoordinate).maxHealth <= 0){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate)).style.backgroundImage = "url(" + "SKULL" + ".jpg" + ")";
      }
    }
    else if(this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate) != null){
      let oldBuilding = this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate)
      let buildingHP  = oldBuilding.maxHealth - this.selectedHero.attackDamage;
      this.buildings.find(building => building.xCoordinate == xCoordinate + 1 && building.yCoordinate == yCoordinate).maxHealth = buildingHP
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
    }
    else if(this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1) != null){
      let oldBuilding = this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1)
      let buildingHP  = oldBuilding.maxHealth - this.selectedHero.attackDamage;
      this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1).maxHealth = buildingHP
      if(this.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate + 1).maxHealth <= 0){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate + 1)).style.backgroundImage = "url(" + "SKULL" + ".jpg" + ")";
      }
    }
  }

  startTimer(display) {
    let start = Date.now(),
      diff,
      minutes,
      seconds;
    function timer() {
      // get the number of seconds that have elapsed since
      // startTimer() was called
      diff = 180 - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }
    }
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
  }

  buildingRadiusAdderToAttackDict(){
      for (let i = 0; i < this.buildings.length; i++){
        let idNeg = null;
        let idPos = null;
        // Building type 1 means it is attack tower
        if(this.buildings[i].buildingType == 2){
          let xNeg = null;
          let xPos = null;
          let yNeg = null;
          this.buildingsAttackCoordinatesDict[this.buildings[i].id] = new Array();
          for (let j = 0; j <= this.buildings[i].rangeOfBuilding; j++) {
            xNeg = this.buildings[i].xCoordinate - j;
            xPos = this.buildings[i].xCoordinate + j;
            yNeg = this.buildings[i].yCoordinate
            idNeg = this.coordinatesConvertorToViewID(xNeg, yNeg);
            idPos = this.coordinatesConvertorToViewID(xPos, yNeg);
            if(!this.buildingsAttackCoordinatesDict[this.buildings[i].id].includes(idNeg)){
              this.buildingsAttackCoordinatesDict[this.buildings[i].id].push(idNeg);
            }
            if(!this.buildingsAttackCoordinatesDict[this.buildings[i].id].includes(idPos)){
              this.buildingsAttackCoordinatesDict[this.buildings[i].id].push(idPos);
            }
            for (let q = 1; q <= this.buildings[i].rangeOfBuilding; q++) {
              yNeg = this.buildings[i].yCoordinate + q
              idNeg = this.coordinatesConvertorToViewID(xNeg, yNeg);
              idPos = this.coordinatesConvertorToViewID(xPos, yNeg);
              if(!this.buildingsAttackCoordinatesDict[this.buildings[i].id].includes(idNeg)){
                this.buildingsAttackCoordinatesDict[this.buildings[i].id].push(idNeg);
              }
              if(!this.buildingsAttackCoordinatesDict[this.buildings[i].id].includes(idPos)){
                this.buildingsAttackCoordinatesDict[this.buildings[i].id].push(idPos);
              }

              yNeg = this.buildings[i].yCoordinate - q
              idNeg = this.coordinatesConvertorToViewID(xNeg, yNeg);
              idPos = this.coordinatesConvertorToViewID(xPos, yNeg);
              if(!this.buildingsAttackCoordinatesDict[this.buildings[i].id].includes(idNeg)){
                this.buildingsAttackCoordinatesDict[this.buildings[i].id].push(idNeg);
              }
              if(!this.buildingsAttackCoordinatesDict[this.buildings[i].id].includes(idPos)){
                this.buildingsAttackCoordinatesDict[this.buildings[i].id].push(idPos);
              }
            }
          }
          idNeg = null;
          idPos = null;
        }
      }
  }

  TowerCallOut(xCoordinate: number, yCoordinate: number){
    for (const [key, value] of Object.entries(this.buildingsAttackCoordinatesDict)) {
      for (let i = 0; i < this.buildingsAttackCoordinatesDict[key].length; i++){
        if(this.buildingsAttackCoordinatesDict[key][i] == this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)
          && this.buildings.find(m => m.id == key).nameOfBuilding == "Cannon tower"){
            this.CannonActive(this.buildings.find(m => m.id == key), null, xCoordinate, yCoordinate);
        }
      }
    }
  }

  CannonActive(cannon: IBuilding, direction?: string, xCoordinate?: number, yCoordinate?: number){
    let hero = this.selectedHero.nameOfHero.replace(/\s+/g, '').toUpperCase();
    let xBall = null;
    let yBall = null;
    // Initial cannon ball start POS
    // when xCoordinate is smaller than cannons xCoordinate than ball starts going up x axios
    if(xCoordinate < cannon.xCoordinate && direction == null){
      xBall = cannon.xCoordinate -1;
      yBall = cannon.yCoordinate;
      document.getElementById(this.coordinatesConvertorToViewID(xBall, yBall)).style.backgroundImage = "url(" + "CANNONTOWER_AMMO" + ".jpg" + ")";
      this.cannonLastCoordinates = this.coordinatesConvertorToViewID(xBall, yBall);
      setTimeout(this.CannonActive.bind(this, cannon, "UP", xBall, yBall), 500);
    }
    else if(xCoordinate > cannon.xCoordinate && direction == null){
      xBall = cannon.xCoordinate + 1;
      yBall = cannon.yCoordinate;
      document.getElementById(this.coordinatesConvertorToViewID(xBall, yBall)).style.backgroundImage = "url(" + "CANNONTOWER_AMMO" + ".jpg" + ")";
      this.cannonLastCoordinates = this.coordinatesConvertorToViewID(xBall, yBall);

      setTimeout(this.CannonActive.bind(this, cannon, "DOWN", xBall, yBall), 500);
    }
    else if(direction != null){
      if(direction == "UP" && document.getElementById(this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate)) != null){

        this.cannonBallID = this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate);

        if(this.cannonBallID == this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate - 1, this.oldYDocumentCoordinate)){
          document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = "";
          document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = "url(" + hero + ".jpg" + ")";
        }
        else if(this.cannonBallID == this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate)){
          document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = "";
        }
        else if(this.cannonBallID != this.coordinatesConvertorToViewID(this.oldXDocumentCoordinate, this.oldYDocumentCoordinate)){
          document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = "";
          document.getElementById(this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate)).style.backgroundImage = "url(" + "CANNONTOWER_AMMO" + ".jpg" + ")";

          this.cannonLastCoordinates = this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate);

          setTimeout(this.CannonActive.bind(this, cannon, "UP", xCoordinate - 1, yCoordinate), 500);
        }
      }
      else if(direction == "DOWN" && document.getElementById(this.coordinatesConvertorToViewID(xCoordinate + 1, yCoordinate)) != null){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = ""
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate + 1, yCoordinate)).style.backgroundImage = "url(" + "CANNONTOWER_AMMO" + ".jpg" + ")";

        this.cannonLastCoordinates = this.coordinatesConvertorToViewID(xCoordinate + 1, yCoordinate);

        this.cannonBallID = this.coordinatesConvertorToViewID(xCoordinate + 1, yCoordinate);

        setTimeout(this.CannonActive.bind(this, cannon, "DOWN", xCoordinate + 1, yCoordinate), 500);
      }
      else if(this.buildings.find(m => m.xCoordinate == xCoordinate + 1) && this.buildings.find(m => m.yCoordinate == yCoordinate) != null){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = "";
      }
      else if(document.getElementById(this.coordinatesConvertorToViewID(xCoordinate + 1, yCoordinate)) == null || document.getElementById(this.coordinatesConvertorToViewID(xCoordinate - 1, yCoordinate)) == null){
        document.getElementById(this.coordinatesConvertorToViewID(xCoordinate, yCoordinate)).style.backgroundImage = "";
      }
    }
  }

}
