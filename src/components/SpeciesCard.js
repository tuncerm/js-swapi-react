import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

import { CacheContext } from '../context/cache-context';

import './Card.css';

import image from "../statics/species.png";

export default function SpeciesCard({ specie, url }) {
  const [data, setData] = useState(specie);
  const [isLoading, setLoading] = useState(false);
  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchSpecieData = async () => {
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
    fetchSpecieData();
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
          <Link to={`/species/${btoa(data.url)}`} className="card-title-link"><h2 className="card-title">{data.name}</h2></Link>
            <hr />
            <div className="card-detail-div">
              <p>Language: {data.language}</p>
              <p>Designation: {data.designation}</p>
              <p>Classification: {data.classification}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}