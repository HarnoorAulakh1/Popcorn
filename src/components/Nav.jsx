import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export function Nav({ movies, query, setQuery }) {

  // useEffect(()=>{
  //   const callback = (e) => {
  //     if (e.code === "Enter") {
  //       setQuery("");
  //     }
  //   };
  //   document.addEventListener("keydown",callback)
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // },[])
  const dom = useRef();

  function action(){
    dom.current.focus();
    setQuery("");
  }

  useEffect(()=>{
    action();
  },[])

  useKey("Slash",action);

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>Popcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={dom}
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
    </>
  );
}
