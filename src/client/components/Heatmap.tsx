import React, { useState, useEffect } from "react";
import { SquareObject } from "../types";
import Square from "./Square";
import SettingsModal from "./SettingsModal";
import { Habit, HabitType } from "../types";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";

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

type HeatMapProps = {
    name: string;
    type: HabitType;
    metric: string;
    token: string | null;
    changeHabitName: (currentHabitName: string, newHabitName: string) => void;
}

function Heatmap(props: HeatMapProps) {
  const [heatmap, setheatmap] = useState<SquareObject[]>([]);
  const [streak, setstreak] = useState<number>(0);
  const [maxVal, setmaxVal] = useState<number>(0);
  const [color, setcolor] = useState<string>("#39D353");
  const [prevColor, setprevColor] = useState<string>("#39D353");
  const [settingsModal, setsettingsModal] = useState<boolean>(false);
  const [avg, setavg] = useState<number>(0);

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

  const toggleCompleteHandler = async (id: number) => {
    const foundIndex = heatmap.findIndex((square) => square.id === id);

    if (foundIndex !== -1) {
      const updatedHeatmap = [...heatmap];
      const currentSquare = updatedHeatmap[foundIndex];
      currentSquare.completed = !currentSquare.completed;
      setheatmap(updatedHeatmap);

      try {
        await axios.post(`/update/${encodeURIComponent(props.name)}`, {
          id,
          completed: currentSquare.completed,
          val: currentSquare.val,
        }, {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        });
      } catch (error) {
        console.error('Error updating habit data:', error);
      }
    }
  };

  const updateValue = async (id: number, updatedValue: number) => {
    const foundIndex = heatmap.findIndex((square) => square.id === id);

    if (foundIndex !== -1) {
      const updatedHeatmap = [...heatmap];
      const currentSquare = updatedHeatmap[foundIndex];
      currentSquare.val = updatedValue;
      currentSquare.completed = updatedValue !== 0;
  
      setheatmap(updatedHeatmap);

      try {
        await axios.post(`/update/${encodeURIComponent(props.name)}`, {
          id,
          completed: currentSquare.completed,
          val: currentSquare.val,
        }, {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        });
      } catch (error) {
        console.error('Error updating habit data:', error);
      }
    }
  };

  const calculateStreakAndMaxVal = () => {
    let maximumStreak = 0;
    let current = 0;
    let maxVal = 0;
    let sum = 0;
    let counter = 0;
    

    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i].val > maxVal) {
        maxVal = heatmap[i].val;
      }
      if (heatmap[i].val > 0) {
        sum += heatmap[i].val;
        counter += 1;
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

    let avg = counter > 0 ? sum / counter : 0;

    return [maximumStreak, maxVal, avg];
  };

  const toggleModal = () => {
    setsettingsModal(!settingsModal);
  };

  const changeColorHandler = (color: string) => {
    setcolor(color);
  };

  const changePrevColor = () => {
    setprevColor(color);
  }

  useEffect(() => {
    const [s, v, a] = calculateStreakAndMaxVal();
    setstreak(s);
    setmaxVal(v);
    setavg(Number((Math.round(a * 100) / 100).toFixed(2)));
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
          <div className="flex flex-col">
            <h3>
              Streak: {streak} {streak === 1 ? "day" : "days"}
            </h3>
            {props.type === 'NUMBER' ? (<h3>
              Average: {avg} {avg === 1 ? props.metric.slice(0, -1) : props.metric}
            </h3>) : null}
          </div>
          <IoMdSettings className="cursor-pointer" onClick={toggleModal} size="20px"/>
        </div>
      </div>
      {settingsModal ? (
        <SettingsModal
          changeColorHandler={changeColorHandler}
          toggleModal={toggleModal}
          changeHabitName={props.changeHabitName}
          currentHabitName={props.name}
          currentColor={prevColor}
          changePrevColor={changePrevColor}
        />
      ) : null}
    </>
  );
}

export default Heatmap;
