import React, { useState, useCallback } from "react";

import Actor from "./Actor";

import { useFetch } from "../hooks/http.hook";

import "./Home.css";

export default function Home() {
  const { sendRequest } = useFetch();
  const [input, setInput] = useState("");
  const [peopleList, setPeopleList] = useState([]);

  const searchPeople = useCallback(
    async (url) => {
      const response = await sendRequest(url);
      setPeopleList(response.results);
    },
    [sendRequest]
  );

  const onChange = (e) => {
    const s = e.target.value;
    if (s.length > 2) {
      searchPeople(`${process.env.REACT_APP_API_URL}/people/?search=${s}`);
    } else {
      setPeopleList([]);
    }
    setInput(s);
  };
  return (
    <div className="home-main">
      <h1>JS-SWAPI-REACT</h1>
      <input
        className="home-search-bar"
        type="text"
        placeholder="Search for Movie Characters"
        onChange={onChange}
        value={input}
      />
      <div className="home-list">
        {peopleList.map((p) => (
          <Actor key={btoa(p.url)} actor={p} />
        ))}
      </div>
    </div>
  );
}
