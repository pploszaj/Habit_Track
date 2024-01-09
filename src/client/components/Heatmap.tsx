import React from "react";
import Square from "./Square";

type HeatMapProps = {
  name: String;
};

function Heatmap(props: HeatMapProps) {
  //need to get the current year then fill the array with dates from January 1st of current year to the current date
  // const squares: string[] = Array(365).fill("");
  const datesArray: Date[] = [];

  //gets the array of squares (amount of squares)
  //to see only as many squares up to the current day change endDate to the value of today
  const generateSquaresArray = () => {
    const today = new Date();
    const year = today.getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for(let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      datesArray.push(new Date(date));
    }
  }

  //gets the columns
  const getChunks = (arr: Date[]) => {
    let chunks = [];
    for (let i = 0; i < arr.length; i += 7) {
      chunks.push(arr.slice(i, i + 7));
    }
    return chunks;
  };

  generateSquaresArray();
  let columns = getChunks(datesArray);

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-2xl text font-bold mb-3">{props.name.toUpperCase()}</h2>
      <div className="flex gap-1">
        {columns.map((column, index) => {
          return (
            <div className="flex flex-col gap-1" key={index}>
              {column.map((date, index) => {
                return <Square date={date} key={index} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Heatmap;
