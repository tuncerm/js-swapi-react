import React, { useState, useEffect } from 'react';

import {useFetch} from '../hooks/http.hook';
import Spinner from './Spinner';

import Film from './Film';

import './FilmList.css';

export default function FilmList() {
  const {isLoading, sendRequest} = useFetch();
  const [movies, setMovies] = useState([]);
  
  useEffect(()=>{
    const fetchMovies = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_API_URL}/films/`);
        setMovies(response.results);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovies();
  }, [sendRequest]);
  return (
    <div className="filmlist-main">
      <h1>Star Wars Films</h1>
      {isLoading && <Spinner/>}
      <div className="filmlist-movies">
        {movies && movies.map(movie => <Film key={btoa(movie.url)}  movie={movie}/>)}
      </div>
    </div>
  );
}
