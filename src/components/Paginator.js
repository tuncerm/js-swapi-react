import React from "react";

import "./Paginator.css";

export default function Paginator({
  current,
  count,
  itemsPerPage,
  setPage,
}) {
  const pages = new Array(Math.ceil(count / itemsPerPage))
    .fill(0)
    .map((_, i) => i + 1);
  const prev = current === 1 ? false : true;
  const next = current === pages.length ? false : true;

  return (
    <div className="paginator-main">
      <button
        disabled={!prev}
        className="paginator-item paginator-prev"
        onClick={() => setPage(current - 1)}
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          className={`paginator-item ${
            p === current ? "paginator-item-active" : ""
          }`}
          key={p}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
      <button
        disabled={!next}
        className="paginator-item paginator-next"
        onClick={() => setPage(current + 1)}
      >
        Next
      </button>
    </div>
  );
}
