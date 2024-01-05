
export function Stats({ watched }) {
  const average = (arr) => arr.reduce((acc, cur) => acc + Number(cur), 0) / arr.length;
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating=="N/A"?10:movie.imdbRating)).toFixed(2);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed();
  const avgRuntime = average(watched.map((movie) => Number(movie.Runtime.slice(0,movie.Runtime.length-3)))).toFixed();

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
