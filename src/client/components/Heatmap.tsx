import React, { useState, useEffect } from "react";
import { SquareObject } from "../types";
import Square from "./Square";

type HeatMapProps = {
  name: String;
};

function Heatmap(props: HeatMapProps) {
  //const [heatmap, setheatmap] = useState<SquareObject[]>([]);
  const [heatmap, setheatmap] = useState<SquareObject[][]>([]);

  //gets the array of squares (amount of squares)
  //to see only as many squares up to the current day change endDate to the value of today
  const generateSquaresArray = async () => {
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

    let chunks = [];
    for (let i = 0; i < datesArray.length; i += 7) {
      chunks.push(datesArray.slice(i, i + 7));
    }
    setheatmap(chunks);
  };


  useEffect(() => {
    generateSquaresArray();
  }, []);


  const toggleCompleteHandler = (id: Number) => {
    const updatedHeatmap = heatmap.map((square) => {
    return square.map((obj) => 
      obj.id === id
        ? { ...obj, completed: !obj.completed }
        : obj
    )
  });
    setheatmap(updatedHeatmap);
    console.log('done');
  };
  
  return (
    <div className="flex flex-col">
      <h2 className="text-white text-2xl text font-bold mb-3">
        {props.name.toUpperCase()}
      </h2>
      <div className="flex gap-1">
        {heatmap.length > 0 ? (heatmap.map((column, index) => {
          return (
            <div className="flex flex-col gap-1" key={index}>
              {column.map((square) => {
                return <Square id={square.id} date={square.date} completed={square.completed} key={square.id} toggleComplete={toggleCompleteHandler}/>;
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
