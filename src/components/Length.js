import React from "react";

export default function Length({ idTitle, titulo, duracion, idBtnDecrement, idBtnIncrement, durID, modifyTime }) {
  return (
    <div>
      <div className="row">
        <div className="col text-center">
          <p id={idTitle}>{titulo}</p>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col text-center">
          <button id={idBtnDecrement} onClick={() => modifyTime(-60, titulo)}>-</button>
        </div>
        <div className="col text-center">
          <h5 id={durID}>{duracion}</h5>
        </div>
        <div className="col text-center">
          <button id={idBtnIncrement} onClick={() => modifyTime(60, titulo)}>+</button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}