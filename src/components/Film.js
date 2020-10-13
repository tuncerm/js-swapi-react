import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import CharacterCard from "./CharacterCard";
import PlanetCard from "./PlanetCard";
import SpeciesCard from "./SpeciesCard";
import VehiclesCard from "./VehiclesCard";
import StarShipsCard from "./StarShipsCard";

import "./Film.css";

export default function Film() {
  const { getData } = useContext(CacheContext);
  const { filmId } = useParams();
  const [film, setFilm] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getData(atob(filmId));
        setFilm(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovie();
  }, [filmId, getData, setFilm]);

  return (
    <div className="film-main">
      {film && (
        <>
          <h2 className="film-title">
            {film.title} E.{film.episode_id}
          </h2>
          <hr />
          <div className="film-detail-div">
            <p>{film.opening_crawl}</p>
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
            <p>Release Date: {film.release_date}</p>
          </div>
        </>
      )}
      <hr />

      {film && film.characters && film.characters.length > 0 &&
        <>
          <h3>Characters</h3>
          <div className="list-subarray">
            { film.characters.map((character) => (
                <CharacterCard key={btoa(character)} url={character} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.planets && film.planets.length > 0 &&
        <>
          <h3>Planets</h3>
          <div className="list-subarray">
            { film.planets.map((planet) => (
                <PlanetCard key={btoa(planet)} url={planet} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.species && film.species.length > 0 &&
        <>
          <h3>Species</h3>
          <div className="list-subarray">
            { film.species.map((specie) => (
                <SpeciesCard key={btoa(specie)} url={specie} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.vehicles && film.vehicles.length > 0 &&
        <>
          <h3>Vehicles</h3>
          <div className="list-subarray">
            { film.vehicles.map((vehicle) => (
                <VehiclesCard key={btoa(vehicle)} url={vehicle} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.starships && film.starships.length > 0 &&
        <>
          <h3>StarShips</h3>
          <div className="list-subarray">
            {film &&
              film.starships &&
              film.starships.map((starship) => (
                <StarShipsCard key={btoa(starship)} url={starship} />
              ))}
          </div>
          <hr />
        </>
      }
    </div>
  );
}
