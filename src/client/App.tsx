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
      <div className="h-screen w-screen flex flex-col justify-start items-center gap-10 mt-10">
        {habits.map((name: String) => (
          <Heatmap name={name} />
        ))}
      </div>
    </>
  );
}

export default App;
