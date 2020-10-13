import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import SpeciesCard from "./SpeciesCard";
import VehiclesCard from "./VehiclesCard";
import StarShipsCard from "./StarShipsCard";
import FilmCard from "./FilmCard";

import "./Character.css";

export default function Character() {
  const { peopleId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [character, setCharacter] = useState({});
  const [homeworld, setHomeWorld] = useState("");

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await getData(atob(peopleId));
        if(response.homeworld){
          const world = await getData(response.homeworld);
          setHomeWorld(world);
        }
        setCharacter(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCharacter();
  }, [getData, peopleId]);

  return (
    <div className="character-main">
      {isLoading && <Spinner asOverlay />}
      <h2 className="character-title">{character.name}</h2>
      {!isLoading && (
        <div className="character-content">
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair Color: {character.hair_color}</p>
          <p>Skin Color: {character.skin_color}</p>
          <p>Eye Color: {character.eye_color}</p>
          <p>Birth Year: {character.birth_year}</p>
          <p>Gender: {character.gender}</p>
          <p>HomeWorld: {homeworld && <Link to={`/planets/${btoa(homeworld.url)}`}>{homeworld.name}</Link>}</p>
          <hr/>

          {character && character.species && character.species.length > 0 &&
            <>
              <h3>Species</h3>
              <div className="list-subarray">
                { character.species.map((specie) => (
                    <SpeciesCard key={btoa(specie)} url={specie} />
                  ))}
              </div>
              <hr />
            </>
          }

          {character && character.vehicles && character.vehicles.length > 0 &&
            <>
              <h3>Vehicles</h3>
              <div className="list-subarray">
                { character.vehicles.map((vehicle) => (
                    <VehiclesCard key={btoa(vehicle)} url={vehicle} />
                  ))}
              </div>
              <hr />
            </>
          }

          {character && character.starships && character.starships.length > 0 &&
            <>
              <h3>StarShips</h3>
              <div className="list-subarray">
                { character.starships.map((starship) => (
                    <StarShipsCard key={btoa(starship)} url={starship} />
                  ))}
              </div>
              <hr />
            </>
          }

          {character && character.films &&  character.films.length > 0 &&
            <>
              <h3>Films</h3>
              <div className="list-subarray">
                { character.films.map((film) => (
                    <FilmCard key={btoa(film)} url={film} />
                  ))}
              </div>
              <hr />
            </>
          }
        </div>
      )}
    </div>
  );
}
