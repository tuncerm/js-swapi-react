import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

import { CacheContext } from '../context/cache-context';

import './PlanetCard.css';

export default function PlanetCard({ planet, url }) {
  const [data, setData] = useState(planet);
  const [isLoading, setLoading] = useState(false);
  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchPlanetData = async () => {
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
    fetchPlanetData();
  }, [url, getData]);

  return (
    <div className="planetcard-main">
      {isLoading && <Spinner />}
      {!isLoading && data && <>
        <Link to={`/planets/${btoa(data.url)}`} className="planetcard-title-link"><h2 className="planetcard-title">{data.name}</h2></Link>
        <hr />
        <div className="filmcard-detail-div">
          <p>Climate: {data.climate}</p>
          <p>Terrain: {data.terrain}</p>
          <p>Population: {data.population}</p>
        </div>
      </>}
    </div>
  );
}