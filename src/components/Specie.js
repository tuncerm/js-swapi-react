import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import CharacterCard from "./CharacterCard";
import FilmCard from "./FilmCard";

import "./Specie.css";

export default function Specie() {
  const { specieId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [specie, setSpecie] = useState({});
  const [homeworld, setHomeWorld] = useState("");

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchSpecie = async () => {
      try {
        setLoading(true);
        const response = await getData(atob(specieId));
        if(response.homeworld){
          const world = await getData(response.homeworld);
          setHomeWorld(world);
        }
        setSpecie(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSpecie();
  }, [getData, specieId]);

  return (
    <div className="specie-main">
      {isLoading && <Spinner asOverlay />}
      <h2 className="specie-title">{specie.name}</h2>
      {!isLoading && (
        <div className="specie-content">
          <p>Classification: {specie.classification}</p>
          <p>Designation: {specie.designation}</p>
          <p>Average Height: {specie.average_height}</p>
          <p>Skin Colors: {specie.skin_colors}</p>
          <p>Hair Colors: {specie.hair_colors}</p>
          <p>Eye Colors: {specie.eye_colors}</p>
          <p>Average Lifespan: {specie.average_lifespan}</p>
          <p>HomeWorld: {homeworld && <Link to={`/planets/${btoa(homeworld.url)}`}>{homeworld.name}</Link>}</p>
          <p>Language: {specie.language}</p>
          <hr />
          <h3>Characters</h3>
          <div className="specie-subarray">
            {specie &&
              specie.people &&
              specie.people.map((character) => (
                <CharacterCard key={btoa(character)} url={character} />
              ))}
          </div>
          <hr />
          <h3>Films</h3>
          <div className="specie-subarray">
            {specie &&
              specie.films &&
              specie.films.map((film) => (
                <FilmCard key={btoa(film)} url={film} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
