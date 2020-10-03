import React, { useState, useEffect, useContext } from "react";

import { CacheContext } from "../context/cache-context";

import Spinner from "./Spinner";
import Paginator from "./Paginator";
import CharacterCard from "./CharacterCard";

import "./People.css";

export default function People() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [people, setPeople] = useState([]);
  const itemsPerPage = 10;

  const { getData } = useContext(CacheContext);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/people/?page=${page}`;
        const response = await getData(url);
        setCount(response.count);
        setPeople(response.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPeople();
  }, [getData, page]);

  return (
    <div className="people-main">
      <h1>Star Wars Planets</h1>
      {isLoading && <Spinner asOverlay />}
      <div className="people-item">
        {people &&
          people.map((character) => (
            <CharacterCard key={`${btoa(character.url)}`} character={character} />
          ))}
      </div>
      <Paginator
        current={page}
        count={count}
        itemsPerPage={itemsPerPage}
        setPage={setPage}
      />
    </div>
  );
}
