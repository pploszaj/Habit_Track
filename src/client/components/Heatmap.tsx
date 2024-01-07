import React from "react";
import Square from "./Square";

function Heatmap() {
  const squares: string[] = Array(365).fill("");

  const getChunks = (arr: string[]) => {
    let chunks = [];
    for (let i = 0; i < arr.length; i += 7) {
      chunks.push(arr.slice(i, i + 7));
    }
    return chunks;
  };

  let columns = getChunks(squares);

  return (
    <div className="flex gap-1">
      {columns.map((column, index) => {
        return (
          <div className="flex flex-col gap-1" key={index}>
            {column.map((_, index) => {
              return <Square key={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Heatmap;