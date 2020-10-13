import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import CharacterCard from "./CharacterCard";
import FilmCard from "./FilmCard";

import "./StarShip.css";

export default function StarShip() {
  const { starShipId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [starShip, setStarShip] = useState({});

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchStarShip = async () => {
      try {
        setLoading(true);
        const response = await getData(atob(starShipId));
        setStarShip(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStarShip();
  }, [getData, starShipId]);

  return (
    <div className="starship-main">
      {isLoading && <Spinner asOverlay />}
      <h2 className="starship-title">{starShip.name}</h2>
      {!isLoading && (
        <div className="starship-content">
          <p>Model: {starShip.model}</p>
          <p>Manufacturer: {starShip.manufacturer}</p>
          <p>Cost: {starShip.cost_in_credits}</p>
          <p>Length: {starShip.length}</p>
          <p>Speed: {starShip.max_atmosphering_speed}</p>
          <p>Crew: {starShip.crew}</p>
          <p>Passengers: {starShip.passengers}</p>
          <p>Cargo Capasity: {starShip.cargo_capacity}</p>
          <p>Consumables: {starShip.consumables}</p>
          <p>HyperDrive Rating: {starShip.hyperdrive_rating}</p>
          <p>MGLT: {starShip.MGLT}</p>
          <p>StarShip Class: {starShip.starship_class}</p>
          <hr />

          {starShip && starShip.pilots && starShip.pilots.length > 0 &&
            <>
              <h3>Pilots</h3>
              <div className="list-subarray">
                { starShip.pilots.map((character) => (
                    <CharacterCard key={btoa(character)} url={character} />
                  ))}
              </div>
              <hr />
            </>
          }

          {starShip && starShip.films &&  starShip.films.length > 0 &&
            <>
              <h3>Films</h3>
              <div className="list-subarray">
                { starShip.films.map((film) => (
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
