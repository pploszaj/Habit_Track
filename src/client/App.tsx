import React, { useState } from "react";
import Heatmap from "./components/Heatmap";
import NewHabit from "./components/NewHabit";
import "./styles.css";
import { Habit } from '../client/types'

function App() {
  const [habits, sethabits] = useState<Habit[]>([]);

  const addNewHabit = (newHabit: Habit) => {
    sethabits([...habits, newHabit]);
  };

  return (
    <div>
      <NewHabit addNewHabit={addNewHabit} />
      <div className="flex justify-center w-screen h-screen">
        <div className="h-screen w-[70vw] flex flex-col justify-start items-start gap-10 mt-10">
          {habits.map((habit: Habit, index: number) => (
            <Heatmap name={habit.name} type={habit.type} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
