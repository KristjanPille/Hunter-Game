import React, {useCallback, useState} from 'react';

import dirt from '../../Buildings_Gallery/dirt.jpg'
import CANNONTOWER from '../../Buildings_Gallery/CANNONTOWER.jpg'
import WARRIOR from '../../Hunters_Gallery/soldier.jpg'
import HUNTERHUT from '../../Buildings_Gallery/HUNTERHUT.jpg'
import NUCLEARHORNET from '../../Buildings_Gallery/NUCLEARHORNET.jpg'
import ARCHERTOWER from '../../Buildings_Gallery/ARCHERTOWER.jpg'
import initialiseBoard from "../Helpers/initialiseBoard";
import Square from "../HunterBase/square";

function AttackBoard({ parentBuildings, buildingsChange, activeHero, handleHero }) {

    const [squares, setSquares] = initialiseBoard();
    const [homeBase, setHomeBase] = useState({});
    const [activeBuildingID, setActiveBuildingID] = useState("");


    function coordinatesToViewID(xCoordinate, yCoordinate){
        return xCoordinate + '|' + yCoordinate;
    }

    function IDToCoordinates(ID){
        return ID.split("|");
    }

    const handleHunterBaseHero = useCallback((activeHero) => {
        handleHero(activeHero);
    }, []);

    function heroMover(x, y){

        if(activeHero.id !== ""){

            activeHero.xCoordinate = x;
            activeHero.yCoordinate = y;

            handleHunterBaseHero(activeHero);
        }
    }

    function renderSquare(i, j) {
        const id = i + '|' + j;
        if(parentBuildings.find(a => a.xCoordinate === i && a.yCoordinate === j)){

            const building = parentBuildings.find(a => a.xCoordinate === i && a.yCoordinate === j).nameOfBuilding.toUpperCase().replace(/\s+/g,'');

            let backGroundBuilding = `url(dirt)`

            // Not nice solution
            if (building === "HUNTERHUT") {
                backGroundBuilding = `url(${HUNTERHUT})`;
            } else if (building === "CANNONTOWER") {
                backGroundBuilding = `url(${CANNONTOWER})`;
            } else if (building === "ARCHERTOWER") {
                backGroundBuilding = `url(${ARCHERTOWER})`;
            } else if (building === "NUCLEARHORNET") {
                backGroundBuilding = `url(${NUCLEARHORNET})`;
            }

            return <Square
                key={id}
                id={id}
                keyVal={id}
                style={{ backgroundImage: backGroundBuilding }}
            />

        }

        else if(activeHero.xCoordinate === i && activeHero.yCoordinate === j){
            return <Square
                key={id}
                id={id}
                keyVal={id}
                style={{ backgroundImage: `url(${WARRIOR})` }}
            />
        }

        else{
            return <Square
                key={id}
                onClick={() => heroMover(i, j)}
                id={id}
                keyVal={id}
                // @ts-ignore
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
export default AttackBoard;
