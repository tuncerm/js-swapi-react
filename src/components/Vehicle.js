import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import CharacterCard from "./CharacterCard";
import FilmCard from "./FilmCard";

import "./Vehicle.css";

export default function Vehicle() {
  const { vehicleId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({});

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await getData(atob(vehicleId));
        setVehicle(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchVehicle();
  }, [getData, vehicleId]);

  return (
    <div className="vehicle-main">
      {isLoading && <Spinner asOverlay />}
      <h2 className="vehicle-title">{vehicle.name}</h2>
      {!isLoading && (
        <div className="vehicle-content">
          <p>Model: {vehicle.model}</p>
          <p>Manufacturer: {vehicle.manufacturer}</p>
          <p>Cost: {vehicle.cost_in_credits}</p>
          <p>Length: {vehicle.length}</p>
          <p>Speed: {vehicle.max_atmosphering_speed}</p>
          <p>Crew: {vehicle.crew}</p>
          <p>Passengers: {vehicle.passengers}</p>
          <p>Cargo Capasity: {vehicle.cargo_capacity}</p>
          <p>Consumables: {vehicle.consumables}</p>
          <p>Vehicle Class: {vehicle.vehicle_class}</p>
          <hr />
          <h3>Pilots</h3>
          <div className="vehicle-subarray">
            {vehicle && vehicle.pilots && vehicle.pilots.map(pilot=><CharacterCard key={btoa(pilot)} url={pilot}/>)}
          </div>
          <hr />
          <h3>Films</h3>
          <div className="vehicle-subarray">
            {vehicle &&
              vehicle.films &&
              vehicle.films.map((film) => (
                <FilmCard key={btoa(film)} url={film} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
