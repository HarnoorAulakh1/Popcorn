import { useEffect } from "react";

export function Card1({ movie }) {
  useEffect(()=>{
    document.title=movie.Title;
    return (()=>{
      document.title="Popcorn";
    })
  })
  return (
    <li key={movie.imdbID} className="zoom">
       <img  src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3 style={{fontSize:"3rem"}}>{movie.Title}</h3><br />
        <p>{movie.Released}</p>
        <p ><span>{movie.Runtime}</span></p>
        <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
      </li>
  );
}
