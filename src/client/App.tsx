import React, { useState } from "react";
import Heatmap from "./components/Heatmap";
import NewHabit from "./components/NewHabit";
import "./styles.css";

function App() {
  const [habits, sethabits] = useState<any>([]);

  const addNewHabit = (newHabit: String) => {
    sethabits([...habits, newHabit]);
  };

  return (
    <>
      <NewHabit addNewHabit={addNewHabit} />
      <div className="flex justify-center w-screen h-screen">
        <div className="h-screen w-[70vw] flex flex-col justify-start items-start gap-10 mt-10">
          {habits.map((name: String, index: any) => (
            <Heatmap name={name} key={index}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
