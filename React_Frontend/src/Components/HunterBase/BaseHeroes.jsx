import React, {useEffect, useRef, useState} from "react";
import {IHunterBase} from "../../domain/IHunterBase";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {HeroesApi} from "../../services/HeroesApi";
import {IHero} from "../../domain/IHero";

const HeroesRow = (props) => (
    <tr>
        <td style={{fontWeight: "bold"}}>{props.hero.nameOfHero}</td>
    </tr>
);

const Heroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [hunterBase, setHunterBase] =  useState({
        appUserId: "",
        coins: 0,
        id: "",
        levelOfBase: 0,
        nameOfBase: ""
    });
    useEffect(() => {
        const callApi = async () => {
            const base = await HunterBaseApi.getHunterBase();
            setHunterBase(base);
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

export default Heroes;
