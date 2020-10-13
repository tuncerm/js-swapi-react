import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

import { CacheContext } from '../context/cache-context';

import './Card.css';

import image from "../statics/character.png";

export default function CharacterCard({ character, url }) {
  const [data, setData] = useState(character);
  const [isLoading, setLoading] = useState(false);
  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchCharacterData = async () => {
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
    fetchCharacterData();
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
            <Link to={`/people/${btoa(data.url)}`} className="card-title-link"><h2 className="card-title">{data.name}</h2></Link>
            <hr />
            <div className="card-detail-div">
              <p>Birth Year: {data.birth_year}</p>
              <p>Gender: {data.gender}</p>
              <p>Height / Weight: {data.height} / {data.mass}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
