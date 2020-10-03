import React, { useState, useEffect, useContext } from "react";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import PlanetCard from "./PlanetCard";

import "./Planets.css";
import Paginator from "./Paginator";

export default function Planets() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [planets, setPlanets] = useState([]);
  const itemsPerPage = 10;

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/planets/?page=${page}`;
        const response = await getData(url);
        setCount(response.count);
        setPlanets(response.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlanets();
  }, [getData, page]);

  return (
    <div className="planets-main">
      <h1>Star Wars Planets</h1>
      {isLoading && <Spinner asOverlay />}
      <div className="planets-item">
        {planets &&
          planets.map((planet) => (
            <PlanetCard key={`${btoa(planet.url)}`} planet={planet} />
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
