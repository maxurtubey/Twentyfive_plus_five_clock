import React from "react";

export default function StartButton({ btnID, text, countDown, setCountDown }) {
  return (
    <button id={btnID} onClick={() => setCountDown(!countDown)}>{text}</button>
  )
}