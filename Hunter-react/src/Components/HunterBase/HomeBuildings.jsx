import React, {useCallback, useEffect, useRef, useState} from "react";
import {IBuilding} from "../../domain/IBuilding";
import {BuildingsApi} from "../../services/BuildingsApi";
import {IHunterBase} from "../../domain/IHunterBase";
import {HunterBaseApi} from "../../services/HunterBaseApi";

function Buildings(props) {

    const BuildingsRow = (props) => (
        <tr>
            { props.building.xCoordinate != null &&
                <td style={{fontWeight: "bold"}} key={props.building.id}>{props.building.nameOfBuilding}</td>
            }
            { props.building.xCoordinate == null &&
                <td style={{fontWeight: "bold"}} key={props.building.id} onClick={() => handleHunterBase(props.building)}>{props.building.nameOfBuilding} | <b style={{color: "yellow", fontSize: "10px", fontFamily: "Comic Sans MS"}}>Unplaced</b></td>
            }
        </tr>
    );

    const handleHunterBase = useCallback((building) => {
        props.unPlacedBuilding(building);
    }, []);

    return (
        <>
            <table className="table table-responsive-sm table-borderless"
                   style={{color: "red", backgroundColor: "black", borderRadius: "25px"}}>
                <thead>
                <tr>
                    <th style={{fontSize: "large"}}>Your Buildings</th>
                </tr>
                </thead>
                <tbody>
                {props.parentBuildings.map(building => {
                    return (
                        <BuildingsRow building={building} key={building.id + 1}/>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}
export default Buildings;
