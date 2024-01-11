import React, { useState, useEffect } from "react";
import { SquareObject } from "../types";
import Square from "./Square";

type HeatMapProps = {
  name: String;
};

function Heatmap(props: HeatMapProps) {
  const [heatmap, setheatmap] = useState<SquareObject[]>([]);
  const [columns, setcolumns] = useState<SquareObject[][]>([]);

  //gets the array of squares (amount of squares)
  //to see only as many squares up to the current day change endDate to the value of today
  const generateSquaresArray = () => {
    const datesArray: SquareObject[] = [];
    let i = 0;
    const today = new Date();
    const year = today.getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      datesArray.push({ id: i++, date: new Date(date), completed: false });
    }

    setheatmap(datesArray);
  };

  //gets the columns
  const getChunks = (arr: SquareObject[]) => {
    let chunks = [];
    for (let i = 0; i < arr.length; i += 7) {
      chunks.push(arr.slice(i, i + 7));
    }
    return chunks;
  };

  useEffect(() => {
    generateSquaresArray();
  }, []);

  useEffect(() => {
    let columns = getChunks(heatmap);
    setcolumns(columns);
  }, [heatmap])


  return (
    <div className="flex flex-col">
      <h2 className="text-white text-2xl text font-bold mb-3">
        {props.name.toUpperCase()}
      </h2>
      <div className="flex gap-1">
        {columns.length > 0 ? (columns.map((column, index) => {
          return (
            <div className="flex flex-col gap-1" key={index}>
              {column.map((square, index) => {
                return <Square id={square.id} date={square.date} completed={square.completed} key={index}/>;
              })}
            </div>
          );
        })) : (
          <p className="text-white">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}

export default Heatmap;
