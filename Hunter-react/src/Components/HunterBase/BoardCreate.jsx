import React, {useCallback, useState} from 'react';

import Square from './square.js';
import dirt from '../../Buildings_Gallery/dirt.jpg'
import CANNONTOWER from '../../Buildings_Gallery/CANNONTOWER.jpg'
import HUNTERHUT from '../../Buildings_Gallery/HUNTERHUT.jpg'
import NUCLEARHORNET from '../../Buildings_Gallery/NUCLEARHORNET.jpg'
import ARCHERTOWER from '../../Buildings_Gallery/ARCHERTOWER.jpg'
import initialiseBoard from "../Helpers/initialiseBoard";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {BuildingsApi} from "../../services/BuildingsApi";
import {IHunterBase} from "../../domain/IHunterBase";
import {IBuilding} from "../../domain/IBuilding";
import {IHero} from "../../domain/IHero";
import HunterStore from "./HunterStore";

function Board({ parentBuildings, unPlacedBuilding, unPlacedBuildingHandler, buildingsChange }) {

    const [squares, setSquares] = initialiseBoard();
    const [homeBase, setHomeBase] = useState({});
    const [activeBuildingID, setActiveBuildingID] = useState("");


    function coordinatesToViewID(xCoordinate, yCoordinate){
        return xCoordinate + '|' + yCoordinate;
    }

    function IDToCoordinates(ID){
        return ID.split("|");
    }

    const handleBuildings = useCallback((parentBuildings) => {
        buildingsChange(parentBuildings);
    }, []);

    async function towerMover(id) {
        if (activeBuildingID === "" && parentBuildings.find(building => coordinatesToViewID(building.xCoordinate, building.yCoordinate) === id) && unPlacedBuilding.id === "") {
            let building = parentBuildings.find(building => coordinatesToViewID(building.xCoordinate, building.yCoordinate) === id);

            setActiveBuildingID({activeBuildingID: building.id})

            // shallow copy
            let buildings = [...parentBuildings];

            let index = parentBuildings.indexOf(building);

            parentBuildings[index] = building;

        }
        else if (activeBuildingID !== "" && parentBuildings.find(building =>
            building.xCoordinate === Number(IDToCoordinates(id)[0]) &&
            building.yCoordinate === Number(IDToCoordinates(id)[1])) === undefined
            || unPlacedBuilding.id !== "") {

            let building;
            if(unPlacedBuilding.id !== ""){
                building = unPlacedBuilding;
            }
            else{
                building = parentBuildings.find(building => building.id === activeBuildingID.activeBuildingID);
            }

            setActiveBuildingID({activeBuildingID: building.id})

            let buildings = [...parentBuildings];

            let index = parentBuildings.indexOf(building);

            building.xCoordinate = Number(IDToCoordinates(id)[0]);
            building.yCoordinate = Number(IDToCoordinates(id)[1]);

            parentBuildings[index] = building;

            buildingsChangeHandler(buildings);


            setActiveBuildingID("")

            await BuildingsApi.update(building);

            unPlacedBuilding.id = "";

            handleBuildings(parentBuildings);
        }
    }

    const buildingsChangeHandler = useCallback((parentBuildings) => {
        buildingsChange(parentBuildings);
    }, []);

    function renderSquare(i, j) {
        const id = i + '|' + j;

        if(parentBuildings.find(a => a.xCoordinate === i && a.yCoordinate === j)){

            const building = parentBuildings.find(a => a.xCoordinate === i && a.yCoordinate === j).nameOfBuilding.toUpperCase().replace(/\s+/g,'');

            let a = `url(dirt)`

            // Not nice solution
            if (building === "HUNTERHUT") {
                a = `url(${HUNTERHUT})`;
            } else if (building === "CANNONTOWER") {
                a = `url(${CANNONTOWER})`;
            } else if (building === "ARCHERTOWER") {
                a = `url(${ARCHERTOWER})`;
            } else if (building === "NUCLEARHORNET") {
                a = `url(${NUCLEARHORNET})`;
            }

            return <Square
                key={id}
                id={id}
                keyVal={id}
                // @ts-ignore
                onClick={() => towerMover(id)}
                style={{ backgroundImage: a }}
            />

        }
        else{
            return <Square
                key={id}
                id={id}
                keyVal={id}
                // @ts-ignore
                onClick={() => towerMover(id)}
                style={{ backgroundImage:`url(${dirt})` }}
            />
        }

    }

    function render() {
        const boardCSS = {
            borderWidth: "5px",
            borderStyle: "ridge",
            borderColor: "#DEB887",
        };

        const board = [];
        for (let i = 0; i < 12; i++) {
            const squareRows = [];
            for (let j = 0; j < 12; j++) {
                squareRows.push(renderSquare(i, j));
            }
            board.push(<div className="board-row" key={i}>{squareRows}</div>);
        }

        return (
            <div id="div0" style={boardCSS}>

                <div className="childDiv" style={boardCSS}>{board}</div>

            </div>
        );
    }

    return render();
}
export default Board;
