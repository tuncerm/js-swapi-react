import React, { useState, useEffect, useContext } from 'react';

import { CacheContext } from '../context/cache-context';

import Spinner from './Spinner';
import Paginator from './Paginator';
import SpeciesCard from './SpeciesCard';

import './Species.css';

export default function Species() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [species, setSpecies] = useState([]);
  const itemsPerPage = 10;

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/species/?page=${page}`;
        const response = await getData(url);
        setCount(response.count);
        setSpecies(response.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSpecies();
  }, [getData, page]);

  return (
    <div className="species-main">
      <h1>Star Wars Species</h1>
      {isLoading && <Spinner asOverlay />}
      <div className="species-item">
        {species && species.map(specie => <SpeciesCard key={`${btoa(specie.url)}`} specie={specie}/>)}
      </div>
      <Paginator current={page} count={count} itemsPerPage={itemsPerPage} setPage={setPage} />
    </div>
  );
}
