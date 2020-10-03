import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";

import { CacheContext } from "../context/cache-context";

import "./FilmCard.css";

export default function FilmCard({ movie, url }) {
  const [data, setData] = useState(movie);
  const [isLoading, setLoading] = useState(false);
  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchFilmData = async () => {
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
    fetchFilmData();
  }, [url, getData]);

  return (
    <div className="filmcard-main">
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <Link to={`/films/${btoa(data.url)}`} className="filmcard-title-link">
            <h2 className="filmcard-title">
              {data.title} E.{data.episode_id}
            </h2>
          </Link>
          <hr />
          <div className="filmcard-detail-div">
            <p>{data.opening_crawl.split("\n\r").splice(0, 1)[0]}</p>
          </div>
          <hr />
          <p className="filmcard-date">Release Date: {data.release_date}</p>
        </>
      )}
    </div>
  );
}
