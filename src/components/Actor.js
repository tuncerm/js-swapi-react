import React, { useState, useEffect, useContext } from 'react';

import { CacheContext } from '../context/cache-context';

import Spinner from './Spinner';

import './Actor.css';

export default function Actor({ actor }) {
    const {name, height, birth_year, gender, films} = actor;
    const [isLoading, setLoading] = useState(false);
    const [actorFilms, setActorFilms] = useState([]);

    const { getData } = useContext(CacheContext);

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const temp = [];
                setLoading(true);
                for (const url of films) {
                    const film = {url}
                    const response = await getData(url);
                    film.title = response.title;
                    temp.push(film);
                }
                setActorFilms(temp);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        fetchFilmData();
    }, [films, getData]);

    return (
        <div className={"actor-main"}>
            {isLoading && <Spinner/>}
            <h2 className="actor-title">{name}</h2>
            <hr/>
            <div className="actor-detail-div">
                <p>Height: {height}</p>
                <p>Born in : {birth_year}</p>
                <p>{gender}</p>
                {actorFilms.map(film=><p key={btoa(film.url)}>{film.title}</p>)}
            </div>
        </div>
    )
}