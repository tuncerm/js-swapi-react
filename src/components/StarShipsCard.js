import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";

import { CacheContext } from "../context/cache-context";

import "./Card.css";

import image from "../statics/starship.png";

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
    <div className="card-main">
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <div className="card-image-container" >
            <img className="card-image" src={image} alt={data.name}/>
          </div>
          <div className="card-text">
          <Link to={`/starships/${btoa(data.url)}`} className="card-title-link"><h2 className="card-title">{data.name}</h2></Link>
            <hr />
            <div className="card-detail-div">
              <p>Model: {data.model}</p>
              <p>Manufacturer: {data.manufacturer}</p>
              <p>Cost: {data.cost_in_credits}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}