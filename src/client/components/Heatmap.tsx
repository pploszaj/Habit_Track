import React from "react";
import Square from "./Square";

function Heatmap() {
  const squares: string[] = Array(365).fill("");

  return (
    <div style={{"display":"flex", "gap":"2px", "flexWrap":"wrap"}}>
      {squares.map((_, index) => (
        <Square key={index} />
      ))}
    </div>
  );
}

export default Heatmap;
