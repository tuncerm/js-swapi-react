import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";

import { CacheContext } from "../context/cache-context";

import "./StarShipsCard.css";

export default function StarShipsCard({ starship, url }) {
  const [data, setData] = useState(starship);
  const [isLoading, setLoading] = useState(false);
  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchStarShipData = async () => {
      try {
        setLoading(true);
        if (url) {
          const response = await getData(url);
          setData(response);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStarShipData();
  }, [url, getData]);

  return (
    <div className="starshipscard-main">
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <Link
            to={`/starships/${btoa(data.url)}`}
            className="starshipscard-title-link"
          >
            <h2 className="starshipscard-title">{data.name}</h2>
          </Link>
          <hr />
          <div className="starshipscard-detail-div">
            <p>Model: {data.model}</p>
            <p>Manufacturer: {data.manufacturer}</p>
            <p>Cost: {data.cost_in_credits}</p>
          </div>
        </>
      )}
    </div>
  );
}
