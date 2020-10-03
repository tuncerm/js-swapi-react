import React, { useState, useEffect, useContext } from "react";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import Paginator from "./Paginator";
import VehiclesCard from "./VehiclesCard";

import "./Vehicles.css";

export default function Vehicles() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const itemsPerPage = 10;

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/vehicles/?page=${page}`;
        const response = await getData(url);
        setCount(response.count);
        setVehicles(response.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchVehicle();
  }, [getData, page]);

  return (
    <div className="vehicles-main">
      <h1>Star Wars Vehicles</h1>
      {isLoading && <Spinner asOverlay />}
      <div className="vehicles-item">
        {vehicles &&
          vehicles.map((vehicle) => (
            <VehiclesCard key={`${btoa(vehicle.url)}`} vehicle={vehicle} />
          ))}
      </div>
      <Paginator
        current={page}
        count={count}
        itemsPerPage={itemsPerPage}
        setPage={setPage}
      />
    </div>
  );
}
