import React, {useEffect, useState} from 'react';

import '../../index.css';
import background from '../../Buildings_Gallery/background.jpg'
import initialiseBoard from "../Helpers/initialiseBoard";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {IHunterBase} from "../../domain/IHunterBase";
import {BuildingsApi} from "../../services/BuildingsApi";
import {IBuilding} from "../../domain/IBuilding";
import AttackBoard from "./BoardCreateAttack";
import AttackHeroes from "./AttackHeroes";
import {IHero} from "../../domain/IHero";
import {IAttackHero} from "../../domain/IAttackHero";

export default class AttackBase extends React.Component<{}, { squares: any,
    status: any, hunterBase: IHunterBase, buildings: IBuilding[], unplacedBuilding: IBuilding, activeHero: IAttackHero }> {
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
            }
        }
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
        this.setState({ activeHero })
    }

    // @ts-ignore
    handleUnPlacedBuilding = unplacedBuilding => {
        console.log(unplacedBuilding)
        this.setState({ unplacedBuilding })
    }

    async componentDidMount() {

        var base = await HunterBaseApi.getHunterBase().then(async (base) => {
            this.setState({ hunterBase: base })
            const buildings = await BuildingsApi.getHunterBaseSpecificBuildings(base.id).then((buildingList) => {
                this.setState({ buildings: buildingList })
            });
        })

    }

    handleClick(i: any) {
        const squares = [...this.state.squares];
    }

    render() {
        return (
            <div id="parentDiv" className="flex-container" style={{ backgroundImage: `url('${background}')`, position: "fixed"}}>
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
            </div>

        );
    }
}
