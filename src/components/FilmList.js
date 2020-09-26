import React, { useState, useEffect, useContext } from 'react';

import {CacheContext} from '../context/cache-context';

import Spinner from './Spinner';
import Film from './Film';

import './FilmList.css';

export default function FilmList() {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const {getData} = useContext(CacheContext);
  
  useEffect(()=>{
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getData(`${process.env.REACT_APP_API_URL}/films/`);
        setMovies(response.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovies();
  }, [getData]);

  return (
    <div className="filmlist-main">
      <h1>Star Wars Films</h1>
      {isLoading && <Spinner asOverlay/>}
      <div className="filmlist-movies">
        {movies && movies.map(movie => <Film key={btoa(movie.url)}  movie={movie}/>)}
      </div>
    </div>
  );
}
