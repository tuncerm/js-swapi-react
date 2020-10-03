import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Character from "./Character";

import "./Film.css";

export default function Film() {
  const { getData } = useContext(CacheContext);
  const { filmId } = useParams();
  const [film, setFilm] = useState({});
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getData(atob(filmId));
        setFilm(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovie();
  }, [filmId, getData, setFilm]);

  return (
    <div className="film-main">
      {film && (
        <>
          <Link to="/films">
            <i className="back-button">&laquo; Back</i>
          </Link>
          <h2 className="film-title">
            {film.title} E.{film.episode_id}
          </h2>
          <hr />
          <div className="film-detail-div">
            <p>{film.opening_crawl}</p>
          </div>
          <hr />
          <p className="film-date">Release Date: {film.release_date}</p>
        </>
      )}
      <hr />
      <h3 onClick={() => setExpanded((e) => !e)}>
        Characters <span>({film.characters && film.characters.length})</span>
      </h3>
      {isExpanded && film && film.characters && (
        <div>
          <div className="film-character-list">
            {film.characters.map((c) => (
              <Character key={btoa(c)} url={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
