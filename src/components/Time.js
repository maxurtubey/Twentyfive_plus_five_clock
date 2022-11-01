import React from "react";

export default function Time({ timeID, min, seg }) {

  let colo = "";
  (min < 1) ? colo = 'red' : colo = 'white';
  
  return (
    <h1 id={timeID} className={colo} >{min}:{seg}</h1>
  )
}