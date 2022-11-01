import React from "react";

export default function ResetButton({ btnID, text, resetear }) {
  return (
    <button id={btnID} onClick={ () => resetear() }>{text}</button>
  )
}