import React, {useCallback, useEffect, useRef, useState} from "react";
import {IBuilding} from "../../domain/IBuilding";
import {IHunterBase} from "../../domain/IHunterBase";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {HeroesApi} from "../../services/HeroesApi";
import {IHero} from "../../domain/IHero";
import Board from "../HunterBase/BoardCreate";

function AttackHeroes({ activeHeroHandler, activeHero }) {

    const [heroes, setHeroes] = useState([]);

    const HeroesRow = (props) => (
        <tr>
            <td style={{fontWeight: "bold"}} onClick={(i) => selectHero(props.hero)}>{props.hero.nameOfHero}</td>
        </tr>
    );


    const heroHandler = useCallback((hero) => {
        activeHeroHandler(hero);
    }, []);

    function selectHero(hero){

        heroHandler(hero)

    }

    useEffect(() => {
        const callApi = async () => {
            const heroes = await HeroesApi.getAll();
            setHeroes(heroes);
        };
        callApi();
    }, [1]);

    return (
        <>
            <table className="table table-responsive-sm table-borderless" style={{color: "red", backgroundColor: "black", borderRadius: "25px"}}>
                <thead>
                <tr>
                    <th style={{fontSize: "large"}}>Your Heroes</th>
                </tr>
                </thead>
                <tbody>
                {heroes.map(hero =>
                    <HeroesRow hero={hero} key={hero.id} />
                )}
                </tbody>
            </table>
        </>
    );
}

export default AttackHeroes;
