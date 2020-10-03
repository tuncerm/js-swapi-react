import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

import { CacheContext } from '../context/cache-context';

import './CharacterCard.css';

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
    <div className="charactercard-main">
      {isLoading && <Spinner />}
      {!isLoading && data && <>
        <Link to={`/people/${btoa(data.url)}`} className="charactercard-title-link"><h2 className="charactercard-title">{data.name}</h2></Link>
        <hr />
        <div className="filmcard-detail-div">
          <p>Birth Year: {data.birth_year}</p>
          <p>Gender: {data.gender}</p>
          <p>Height / Weight: {data.height} / {data.mass}</p>
        </div>
      </>}
    </div>
  );
}
