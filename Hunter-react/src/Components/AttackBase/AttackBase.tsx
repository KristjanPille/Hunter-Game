import React, {useEffect, useState} from 'react';

import '../../index.css';
import background from '../../Buildings_Gallery/background.jpg'
import dirt from '../../Buildings_Gallery/dirt.jpg'
import cannonTowerAmmo from '../../Buildings_Gallery/CANNONTOWER_AMMO.jpg'
import initialiseBoard from "../Helpers/initialiseBoard";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {IHunterBase} from "../../domain/IHunterBase";
import {BuildingsApi} from "../../services/BuildingsApi";
import {IBuilding} from "../../domain/IBuilding";
import AttackBoard from "./BoardCreateAttack";
import AttackHeroes from "./AttackHeroes";
import {IAttackHero} from "../../domain/IAttackHero";

export default class AttackBase extends React.Component<{}, { squares: any,
    status: any, hunterBase: IHunterBase, buildings: IBuilding[], unplacedBuilding: IBuilding, activeHero: IAttackHero, buildingsAttackCoordinates: {} }> {
    constructor(props: any) {
        super(props);
        this.state = {
            squares: initialiseBoard(),
            status: '',
            hunterBase: {
                appUserId: "",
                coins: 0,
                id: "",
                levelOfBase: 0,
                nameOfBase: "",
            },
            buildings: [],
            unplacedBuilding: {
                id: "",
                nameOfBuilding: "",
                maxHealth: 0,
                levelOfBuilding: 0,
                buildingType: 0,
            },
            activeHero: {
                id: "",
                nameOfHero: "",
                maxHealth: 0,
                attackDamage: 0,
                levelOfHero: 0,
                hunterBaseId: "",
            },
            buildingsAttackCoordinates: {
            }
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    // @ts-ignore
    handleHunterBase = hunterBase => {
        this.setState({ hunterBase })
    }

    // @ts-ignore
    handleBuildings = buildings => {
        this.setState({ buildings })
    }

    // @ts-ignore
    handleHero = activeHero => {
        this.setState({ activeHero: activeHero })
    }

    // @ts-ignore
    handleUnPlacedBuilding = unplacedBuilding => {
        this.setState({ unplacedBuilding })
    }

    handleTowerActivationsRange(){

        let heroCoordinates = this.coordinatesToViewID(this.state.activeHero.xCoordinate!, this.state.activeHero.yCoordinate!)

        for (const [key, value] of Object.entries(this.state.buildingsAttackCoordinates)) {
            // @ts-ignore
            for (let i = 0; i < this.state.buildingsAttackCoordinates[key].length; i++){
                // @ts-ignore
                if(this.state.buildingsAttackCoordinates[key][i] == this.coordinatesToViewID(this.state.activeHero.xCoordinate, this.state.activeHero.yCoordinate)){

                    if(this.state.buildings.find(building => building.id == key)){
                        let building = this.state.buildings.find(building => building.id == key)!;

                        // Cannon logic from here on...
                        if(building.nameOfBuilding == "Cannon tower"){

                            let distance = Math.abs(building.xCoordinate! - this.state.activeHero.xCoordinate!);
                            // Shoots up on board
                            if(this.state.activeHero.xCoordinate! < building.xCoordinate!){
                                let xCoordinate = building.xCoordinate! - 1;
                                let yCoordinate = building.yCoordinate!;
                                this.cannonBallMover(building, xCoordinate, yCoordinate, distance, 0);

                            }
                            // Shoots down on board
                            else if(this.state.activeHero.xCoordinate! > building.xCoordinate!){


                            }
                        }
                    }
                }
            }
        }
    }

    cannonBallMover(building: IBuilding, xCoordinate: number, yCoordinate: number, distance: number, startDistance: number){

        if(!this.state.buildings.find(building => building.xCoordinate == xCoordinate && building.yCoordinate == yCoordinate)){

            if(startDistance < distance && this.state.activeHero.xCoordinate! < xCoordinate){
                let ID = this.coordinatesToViewID(xCoordinate - startDistance , yCoordinate);
                document.getElementById(ID)!.style.backgroundImage = "url(" + cannonTowerAmmo + ")";
                if(0 < startDistance){
                    let oldID = this.coordinatesToViewID(xCoordinate - startDistance + 1 , yCoordinate);
                    document.getElementById(oldID)!.style.backgroundImage = "url(" + dirt + ")";
                }
                startDistance += 1;
                // @ts-ignore
                setTimeout(this.cannonBallMover.bind(this, building, xCoordinate, yCoordinate, distance, startDistance), building.attackSpeed);
            }
            else if(startDistance == distance){
                let ID = this.coordinatesToViewID(xCoordinate - distance + 1, yCoordinate);
                document.getElementById(ID)!.style.backgroundImage = "url(" + dirt + ")";
            }
        }

    }

    coordinatesToViewID(xCoordinate: number, yCoordinate: number){
        return xCoordinate + '|' + yCoordinate;
    }

    IDToCoordinates(ID: string){
        return ID.split("|");
    }

    handleKeyPress(e: any){

        if(e.key === "w" && this.state.buildings.find(building => building.xCoordinate === this.state.activeHero.xCoordinate! - 1 && building.yCoordinate === this.state.activeHero.yCoordinate) == null){
            if(0 <= this.state.activeHero.xCoordinate! - 1){
                this.state.activeHero.xCoordinate = this.state.activeHero.xCoordinate! - 1;
            }
        }
        else if(e.key === "a" && this.state.buildings.find(building => building.xCoordinate === this.state.activeHero.xCoordinate && building.yCoordinate === this.state.activeHero.yCoordinate! - 1) == null){
            if(0 <= this.state.activeHero.yCoordinate! - 1) {
                this.state.activeHero.yCoordinate = this.state.activeHero.yCoordinate! - 1;
            }
        }
        else if(e.key === "s" && this.state.buildings.find(building => building.xCoordinate === this.state.activeHero.xCoordinate! + 1 && building.yCoordinate === this.state.activeHero.yCoordinate) == null){
            if(this.state.activeHero.xCoordinate! + 1 <= 11) {
                this.state.activeHero.xCoordinate = this.state.activeHero.xCoordinate! + 1;
            }
        }
        else if(e.key === "d" && this.state.buildings.find(building => building.xCoordinate === this.state.activeHero.xCoordinate && building.yCoordinate === this.state.activeHero.yCoordinate! + 1) == null){
            if(this.state.activeHero.yCoordinate! + 1 <= 11) {
                this.state.activeHero.yCoordinate = this.state.activeHero.yCoordinate! + 1;
            }
        }
        this.setState({ activeHero: this.state.activeHero })
        this.handleTowerActivationsRange();

    }

    async componentWillMount() {

        let base = await HunterBaseApi.getHunterBase().then(async (base) => {
            this.setState({ hunterBase: base })
            const buildings = await BuildingsApi.getHunterBaseSpecificBuildings(base.id).then((buildingList) => {
                this.setState({ buildings: buildingList })

                for (let i = 0; i < buildingList.length; i++) {

                    if(buildingList[i].buildingType == 2){

                        if(buildingList[i].attackType == 4){

                            let buildingID = buildingList[i].id;
                            let rangeOfBuilding = buildingList[i].rangeOfBuilding!;
                            let arrayOfCoordinates = [];
                            let buildingMaxCoordinate = buildingList[i].rangeOfBuilding!;

                            let xCoordinate = buildingList[i].xCoordinate!;
                            let yCoordinate = buildingList[i].yCoordinate!;

                            for (let i = 1; i <= rangeOfBuilding; i++) {
                                arrayOfCoordinates.push(this.coordinatesToViewID(xCoordinate + i, yCoordinate))
                                arrayOfCoordinates.push(this.coordinatesToViewID(xCoordinate - buildingMaxCoordinate, yCoordinate));
                                buildingMaxCoordinate -= 1;
                            }
                            this.setState({ buildingsAttackCoordinates: {[buildingID]: arrayOfCoordinates} })

                        }

                    }

                }

            });
        })

    }

    handleClick(i: any) {
        const squares = [...this.state.squares];
    }

    render() {
        return (
            <div tabIndex={-1} id="parentDiv" className="flex-container" style={{ backgroundImage: `url('${background}')`, position: "fixed"}} onKeyPress={this.handleKeyPress}>
                <div className="flex-child magenta" >
                    <div className="game-board">

                        <div id="baseInfo">
                            <table className="table" style={{backgroundColor: "black", color: "red"}}>
                                <thead>
                                <tr>
                                    <th scope="col">{this.state.hunterBase.nameOfBase}</th>
                                    <th scope="col" style={{color: "gold"}}> <b style={{color: "red"}}>Money: </b> {this.state.hunterBase.coins}</th>
                                    <th scope="col" style={{color: "gold"}}> <b style={{color: "red"}}>LVL: </b> {this.state.hunterBase.levelOfBase}</th>
                                </tr>
                                </thead>
                            </table>
                        </div >

                        <div id="buildings">
                            <AttackHeroes
                                activeHeroHandler={this.handleHero}
                                activeHero={this.state.activeHero}
                            />
                        </div>
                        <div id="board">
                            <AttackBoard
                                parentBuildings={this.state.buildings}
                                buildingsChange={this.handleBuildings}
                                activeHero={this.state.activeHero}
                                handleHero={this.handleHero}
                            />
                        </div>
                    </div>
                </div>
            </div    >

        );
    }
}
