import React, { useState, useEffect, useContext } from "react";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import Paginator from "./Paginator";
import StarShipsCard from "./StarShipsCard";

import "./StarShips.css";

export default function StarShips() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [starships, setStarships] = useState([]);
  const itemsPerPage = 10;

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchStarShips = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/starships/?page=${page}`;
        const response = await getData(url);
        setCount(response.count);
        setStarships(response.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStarShips();
  }, [getData, page]);

  return (
    <div className="starships-main">
      <h1>Star Wars StarShips</h1>
      {isLoading && <Spinner asOverlay />}
      <div className="starships-item">
        {starships &&
          starships.map((starship) => (
            <StarShipsCard key={`${btoa(starship.url)}`} starship={starship} />
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
