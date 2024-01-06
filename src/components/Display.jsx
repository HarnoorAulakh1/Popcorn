import { useState, useEffect } from "react";
import { Feed } from "./Feed";
import { Watched } from "./Watched";
import axios from "axios";
import { Loader } from "./Loader";
import { Nav } from "./Nav";
import { useStoreLocal } from "./useStoreLocal";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     runtime: 110,
//     imdbRating: 8,
//     userRating: 7,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const key = "912a044";
export function Display() {
  const [query, setQuery] = useState("");
  const [movies1, setMovies] = useState([]);
  const [movies, movieSet] = useState([]);
  const [watched, setWatched] = useStoreLocal([],"watched");
  const [clicked, set] = useState(false);
  const [zoom, setter] = useState({});
  const [loader, setLoader] = useState(true);
  const [err, setError] = useState("Loading...");
  const [found,fset]=useState();
  //const [search,setSearch]=useState(false);

  // useEffect(()=>{
  //   const callback =(e) => {
  //     if (e.code === "Enter") {
  //       setSearch((x)=>!x);
  //       movieSet([]);
  //     }
  //   };
  //   document.addEventListener("keydown",callback)
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // },[])

  useEffect(() => {
    const controller=new AbortController();
    setLoader(true);
    //movieSet([]);
    axios
      .get(`https://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal})
      .then((res) => {
        setError("Loading...");
        setLoader(true);
        //console.log(query);
        if (res.data.Search) {
          //console.log(res.data.Search);
          fset(true);
          setMovies(res.data.Search);
        } else {
          fset(false);
          setMovies([]);
          movieSet([]);
        }
        setLoader(false);
      })
      .catch((err) => {
        if(err.message!="canceled")
        setError(err.message);
      });

      return(
        ()=>{
          controller.abort();
        }
      )
  }, [query, key]);

  useEffect(()=>{
    console.log(movies);
    movies1.map((movie)=>(
      axios.get(`https://www.omdbapi.com/?apikey=${key}&i=${movie.imdbID}`)
      .then((res)=>movieSet((x)=>[...x,res.data]))
    ))
  },[movies1])

  function feedClicked(data) {
    set((x) => !x);
    console.log(data);
    setter(data);
  }
  return (
    <>
    <Nav setQuery={setQuery} movies={movies} query={query}/>
      <main className="main">
        <Feed movies={movies} feedClicked={feedClicked} loader={loader} found={found}>
          <Loader message={err} />
        </Feed>
        <Watched
          watched={watched}
          movie={zoom}
          clicked={clicked}
          open={set}
          add={setWatched}
          setWatched={setWatched}
        />
        <div className="credits">
          <p ><p style={{fontSize:"12px"}}>Made by</p><b> H.S Aulakh </b></p><br />
          <div className="links">            
          <a href="https://www.github.com/HarnoorAulakh16/">
            <button className="bttn">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          </button>
          </a>
          <a href="https://www.linkedin.com/in/harnoor-singh-aulakh-046140226/">
          <button className="bttn" >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" /></button>
          </a>
          </div>
        </div>
      </main>
    </>
  );
}


