import React, { useState, useEffect, useContext } from 'react';

import { CacheContext } from '../context/cache-context';

import Spinner from './Spinner';

import './Character.css';

export default function Character({ url }) {
    const [isLoading, setLoading] = useState(false);
    const [character, setCharacter] = useState([]);

    const { getData } = useContext(CacheContext);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const c = {};
                setLoading(true);
                const response = await getData(url);
                c.name = response.name;
                c.planet = response.homeworld ? (await getData(response.homeworld)).name : "";
                c.species = [];
                c.vehicles = [];
                c.starships = [];
                for (const item of response.species) {
                    c.species.push((await getData(item)).name);
                }
                for (const item of response.vehicles) {
                    c.vehicles.push((await getData(item)).name);
                }
                for (const item of response.starships) {
                    c.starships.push((await getData(item)).name);
                }
                setCharacter(c);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCharacter();
    }, [getData, url]);

    return (
        <div className={"character-main"}>
            {isLoading ? <Spinner/> : <>
                <h2 className="character-title">{character.name}</h2>
                <hr/>
                <div className="character-detail-div">
                    <p>Homeworld: {character.planet}</p>
                    <p>Species: {(character.species && character.species.join(' - ')) || "Not Specified"}</p>
                    <p>Vehicles: {(character.vehicles && character.vehicles.join(', ')) || "N/A"}</p>
                    <p>Starhips: {(character.starships && character.starships.join(', ')) || "N/A"}</p>
                </div>
            </>}
        </div>
    )
}