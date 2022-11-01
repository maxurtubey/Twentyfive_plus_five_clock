import React from "react";

export default function Label({ label, labelID }) {
  return (
    <h2 id={labelID} className='label'>{label}</h2>
  )
}