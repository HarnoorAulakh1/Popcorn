import {useState } from "react";
import { Card3 } from "./Card3";
import { Card1 } from "./Card1";
import { Stats } from "./Stats";
import Review from "./review/Review";

export function Watched({ watched ,movie,add,clicked,open,setWatched}) {
  const [isOpen2, setIsOpen2] = useState(true);
  function del(id){
    console.log(watched);
    setWatched((x)=>x.filter((i)=>i.imdbID!=id))
  }

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {(isOpen2 && (!clicked?(
        <>
          <Stats watched={watched} />
          <ul className="list">
            {watched.map((movie) => (
              <Card3 movie={movie} rating={movie.userRating} del={del} key={movie.imbdID}/>
            ))}
          </ul>
        </>
      ):(< >
        <ul className="list zoom">
        <Card1 movie={movie}  />
        </ul>
        <div className="rating">
        <Review len={10} movie={movie} add={add} open={open}/>
        </div>
        <div><p style={{fontSize:"20px",padding:"20px"}}>{movie.Plot}</p></div>
        </>)))}
    </div>
  );
}
