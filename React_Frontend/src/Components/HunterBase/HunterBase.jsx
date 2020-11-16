import React, {useEffect, useState} from 'react';

import '../../index.css';
import background from '../../BuildingsGallery/background.jpg'
import initialiseBoard from "../Helpers/initialiseBoard";
import Buildings from "./HomeBuildings";
import Heroes from "./BaseHeroes";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {IHunterBase} from "../../domain/IHunterBase";
import Board from "./BoardCreate";
import {BuildingsApi} from "../../services/BuildingsApi";
import {IBuilding} from "../../domain/IBuilding";
import PlayerStore from "./PlayerStore";
import HunterStore from "./HunterStore";

export default class Game extends React.Component {
    constructor(props) {
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

    handleClick(i) {
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
                        <Buildings
                            parentBuildings={this.state.buildings}
                            unPlacedBuilding={this.handleUnPlacedBuilding}
                        />
                        <Heroes/>
                        </div>
                        <div id="board">
                        <Board
                            // @ts-ignore
                            onClick={(i) => this.handleClick(i)}
                            parentBuildings={this.state.buildings}
                            unPlacedBuilding={this.state.unplacedBuilding}
                            unPlacedBuildingHandler={this.handleUnPlacedBuilding}
                            buildingsChange={this.handleBuildings}
                        />
                        </div>
                    </div>
                </div>
                <div className="flex-child green">
                    <HunterStore
                        parentBuildings={this.state.buildings}
                        parentHunterBase={this.state.hunterBase}
                        hunterBaseChange={this.handleHunterBase}
                        buildingsChange={this.handleBuildings}
                    />
                </div>
            </div>

        );
    }
}
