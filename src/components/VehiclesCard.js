import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";

import { CacheContext } from "../context/cache-context";
import "./Card.css";

import image from "../statics/vehicle.png";

export default function VehiclesCard({ vehicle, url }) {
  const [data, setData] = useState(vehicle);
  const [isLoading, setLoading] = useState(false);
  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchVehicleData = async () => {
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
    fetchVehicleData();
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
          <Link to={`/vehicles/${btoa(data.url)}`} className="card-title-link"><h2 className="card-title">{data.name}</h2></Link>
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
