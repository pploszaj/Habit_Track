import React, { useState, useEffect } from "react";
import { SquareObject } from "../types";
import Square from "./Square";
import SettingsModal from "./SettingsModal";
import { Habit } from "../types";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Heatmap(props: Habit) {
  //const [heatmap, setheatmap] = useState<SquareObject[]>([]);
  const [heatmap, setheatmap] = useState<SquareObject[]>([]);
  const [streak, setstreak] = useState<number>(0);
  const [maxVal, setmaxVal] = useState<number>(0);
  const [color, setcolor] = useState<string>("#39D353");
  const [settingsModal, setsettingsModal] = useState<boolean>(false);

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
      datesArray.push({
        id: i++,
        date: new Date(date),
        completed: false,
        val: 0,
      });
    }

    setheatmap(datesArray);
  };

  useEffect(() => {
    generateSquaresArray();
  }, []);

  const toggleCompleteHandler = (id: number) => {
    const foundIndex = heatmap.findIndex((square) => square.id === id);

    if (foundIndex !== -1) {
      const updatedHeatmap = [...heatmap];
      updatedHeatmap[foundIndex] = {
        ...updatedHeatmap[foundIndex],
        completed: !updatedHeatmap[foundIndex].completed,
      };
      setheatmap(updatedHeatmap);
    }
  };

  const updateValue = (id: number, updatedValue: number) => {
    const foundIndex = heatmap.findIndex((square) => square.id === id);

    if (foundIndex !== -1) {
      console.log("new number: ", updatedValue);
      const updatedHeatmap = [...heatmap];
      updatedHeatmap[foundIndex] = {
        ...updatedHeatmap[foundIndex],
        val: updatedValue,
        completed: updatedValue === 0 ? false : true,
      };
      setheatmap(updatedHeatmap);
    }
  };

  const calculateStreakAndMaxVal = () => {
    let maximumStreak = 0;
    let current = 0;
    let maxVal = 0;

    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i].val > maxVal) {
        maxVal = heatmap[i].val;
      }
      if (heatmap[i].completed) {
        current += 1;
        if (current > maximumStreak) {
          maximumStreak = current;
        }
      } else {
        current = 0;
      }
    }
    return [maximumStreak, maxVal];
  };

  const toggleModal = () => {
    setsettingsModal(!settingsModal);
  };

  const changeColorHandler = (color: string) => {
    setcolor(color);
  }

  useEffect(() => {
    const [s, v] = calculateStreakAndMaxVal();
    setstreak(s);
    setmaxVal(v);
  }, [heatmap]);

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-white text-2xl text font-bold mb-3">
          {props.name.toUpperCase()}
        </h2>
        <div className="flex gap-3.75rem">
          {months.map((month, index) => (
            <p className="text-lightgray" key={index}>
              {month}
            </p>
          ))}
        </div>
        <div className="inline-flex flex-col flex-wrap h-[140px]">
          {heatmap.length > 0 ? (
            heatmap.map((square) => {
              return (
                <Square
                  id={square.id}
                  date={square.date}
                  completed={square.completed}
                  key={square.id}
                  val={square.val}
                  toggleComplete={toggleCompleteHandler}
                  updateValue={updateValue}
                  type={props.type}
                  maxVal={maxVal}
                  updatedColor={color}
                />
              );
            })
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>
        <div className="mt-1 text-sm font-medium text-lightgray flex justify-between">
          <h3>
            Streak: {streak} {streak === 1 ? "day" : "days"}
          </h3>
          <h3 className="cursor-pointer" onClick={toggleModal}>
            Settings
          </h3>
        </div>
      </div>
      {settingsModal ? (
        <SettingsModal changeColorHandler = {changeColorHandler} toggleModal={toggleModal}/>
      ) : null}
    </>
  );
}

export default Heatmap;
