
export function Card3({ movie,del}) {
    return (
      <li key={movie.imdbID} className="zoom">
        <img src={movie.Poster} alt={`${movie.Title} poster`} /> <br />
        <h3>{movie.Title}</h3><button onClick={()=>del(movie.imdbID)}  className="btn-delete">❌</button><br />
        <br />
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.Runtime} </span>
          </p>
        </div>
      </li>
    );
  }
  