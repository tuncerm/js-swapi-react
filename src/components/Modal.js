import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";

import "./Modal.css";

export default function Modal({ url, close }) {
  const [isLoading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        setLoading(true);
        const response = await getData(url);
        setMovie(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFilmData();
  }, [url, getData]);

  return (
    <div className="modal-main">
      <div className="modal-content">
        {isLoading && <Spinner />}
        <h4 onClick={close} className="modal-close">
          <i className="close-arrow"></i>Back to Actors Search
        </h4>
        <hr />
        {!isLoading && (
          <>
            <h4><Link to={`/films/${btoa(movie.url)}`}>{movie.title}</Link></h4>
            <p>
              <span className="dark">Director:</span> {movie.director}
            </p>
            <p>
              <span className="dark">Producer:</span> {movie.producer}
            </p>
            <p>
              <span className="dark">Opening crawl:</span>
            </p>
            {movie.opening_crawl &&
              movie.opening_crawl
                .split("\r\n\r\n")
                .map((s, i) => <p key={i}>{s}</p>)}
          </>
        )}
      </div>
    </div>
  );
}
