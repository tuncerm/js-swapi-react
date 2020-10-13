import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { CacheContext } from "../context/cache-context";

import CharacterCard from "./CharacterCard";
import PlanetCard from "./PlanetCard";
import SpeciesCard from "./SpeciesCard";
import VehiclesCard from "./VehiclesCard";
import StarShipsCard from "./StarShipsCard";

import "./Film.css";

// A idiotic way to do things. It will do for now...
import ep1 from '../statics/EP1_TPM_Poster.png';
import ep2 from '../statics/EP2_AOTC_Poster.jpg';
import ep3 from '../statics/EP3_ROTS_Poster.png';
import ep4 from '../statics/EP4_ANH_Poster.jpg';
import ep5 from '../statics/EP5_TESB_Poster.jpg';
import ep6 from '../statics/EP6_ROTJ_Poster.jpg';

const images = {
  '1': ep1,
  '2': ep2,
  '3': ep3,
  '4': ep4,
  '5': ep5,
  '6': ep6,
}

export default function Film() {
  const { getData } = useContext(CacheContext);
  const { filmId } = useParams();
  const [film, setFilm] = useState({});

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
      <h2 className="film-title">
        Star Wars, Episode - {film.episode_id} : {film.title}
      </h2>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img className='flip-card-image' src={images[film.episode_id]} alt={film.title} />
          </div>
          <div className="flip-card-back">
          <div className="fade"></div>
          {film && (
            <>
              <div className="film-detail-div">
                <section className="star-wars">
                <div className="crawl">
                  <div className="title">
                    <p>Episode {film.episode_id}</p>
                    <h1>{film.title}</h1>
                  </div>
                  {film && film.opening_crawl && film.opening_crawl.split('\n\r').map((p, i)=><p key="i">{p}</p>)}
                  <p>Director: {film.director}</p>
                  <p>Producer: {film.producer}</p>
                  <p>Release Date: {film.release_date}</p>
                </div>
                </section>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
      <hr />

      

      


      {film && film.characters && film.characters.length > 0 &&
        <>
          <h3>Characters</h3>
          <div className="list-subarray">
            { film.characters.map((character) => (
                <CharacterCard key={btoa(character)} url={character} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.planets && film.planets.length > 0 &&
        <>
          <h3>Planets</h3>
          <div className="list-subarray">
            { film.planets.map((planet) => (
                <PlanetCard key={btoa(planet)} url={planet} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.species && film.species.length > 0 &&
        <>
          <h3>Species</h3>
          <div className="list-subarray">
            { film.species.map((specie) => (
                <SpeciesCard key={btoa(specie)} url={specie} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.vehicles && film.vehicles.length > 0 &&
        <>
          <h3>Vehicles</h3>
          <div className="list-subarray">
            { film.vehicles.map((vehicle) => (
                <VehiclesCard key={btoa(vehicle)} url={vehicle} />
              ))}
          </div>
          <hr />
        </>
      }

      {film && film.starships && film.starships.length > 0 &&
        <>
          <h3>StarShips</h3>
          <div className="list-subarray">
            {film &&
              film.starships &&
              film.starships.map((starship) => (
                <StarShipsCard key={btoa(starship)} url={starship} />
              ))}
          </div>
          <hr />
        </>
      }
    </div>
  );
}
