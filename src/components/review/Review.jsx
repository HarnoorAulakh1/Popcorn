import { useEffect, useState } from "react";
import EmptyStar from "./EmptyStar";
import FullStar from "./FullStar";
import "./styles.css";

export default function Review({ len,movie,add,open}) {
  let arr = [];
  const [x, setter] = useState(-1);
  const [clicked, final] = useState(-1);
  function route(){
    open((x)=>!x);
    add((x)=>[...x,{...movie,userRating:clicked+1}]);
  }

  useEffect(()=>{
    const callback=(e)=>{
      console.log(e.code);
      if( x!=-1 && e.code==="Enter")
      route()
    } 
    document.addEventListener("keydown",callback);

    return ()=>{
      document.removeEventListener("keydown",callback);
    }
  },[x])

  function length(x) {
    setter(x);
  }
  for (var i = 0; i < len; i++)
    arr.push(
      <EmptyStar l={i} clicked={clicked} final={final} length={length} />
    );
  const [stars] = useState(arr);
  return (
    <div className="container">
      <div className="App">
        {stars.map((y, i) =>
          i <= x ? (
            <FullStar
              l={i}
              clicked={clicked}
              final={final}
              length={length}
              key={i}
            />
          ) : (
            <EmptyStar
              l={i}
              clicked={clicked}
              final={final}
              length={length}
              key={i}
            />
          )
        )}
        <span style={{ fontSize: "30px", color: "white", width: "70px" }}>
          {x + 1}
        </span>
      </div>
      <br />
      <div className="btn">
        {clicked !== -1 ? <button onClick={()=>route()} className="btn-add">Add to list</button> : ""}
      </div>
    </div>
  );
}
