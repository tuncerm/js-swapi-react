import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
// import Modal from "./Modal";

import "./Actor.css";

export default function Actor({ actor }) {
  const { name, height, birth_year, gender, films, url } = actor;
  const [isLoading, setLoading] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [modalUrl, setModalUrl] = useState("");

  const [actorFilms, setActorFilms] = useState([]);

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const temp = [];
        setLoading(true);
        for (const url of films) {
          const film = { url };
          const response = await getData(url);
          film.title = response.title;
          temp.push(film);
        }
        setActorFilms(temp);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFilmData();
  }, [films, getData]);

  // const openModal = (url) => {
  //   setModalUrl(url);
  //   setModal(true);
  // };
  // const closeModal = () => {
  //   setModal(false);
  //   setModalUrl("");
  // };

  return (
    <>
      {/* {modal && <Modal url={modalUrl} close={closeModal} />} */}
      <div className={"actor-main"}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="actor-detail-div">
              <div class="actor-view">
                <div class="plane main">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </div>
            <div className="actor-detail-part">
              <h5 className="actor-title"><Link to={`/people/${btoa(url)}`}>{name}</Link></h5>
              <p> Born in {birth_year} </p> <p> Height {height} </p>
              <p> {gender} </p>
            </div>
            <div className="actor-detail-part">
              <h5 className="actor-title"> Movies </h5>
              {actorFilms.map((film) => (
                <p
                  key={btoa(film.url)}
                  // onClick={() => {
                  //   openModal(film.url);
                  // }}
                  className="actor-movie-item"
                >
                  <Link to={`/films/${btoa(film.url)}`}>{film.title}</Link>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
