import { useState } from "react";
import { Card } from "./Card";
import { Loader } from "./Loader";

export function Feed({ movies ,feedClicked,loader,children,found}) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {loader?children:(isOpen1 && (
        <ul className="list">
          {movies.map((movie) => (
            (movies && <Card feedClicked={feedClicked} movie={movie} key={movie.imbdID} />)
          ))}
          {!found && <Loader message="Movie Not Found" />}
        </ul>
      ))}
    </div>
  );
}
