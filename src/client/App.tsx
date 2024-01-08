import React, {useState} from "react";
import Heatmap from "./components/Heatmap";
import NewHabit from "./components/NewHabit";
import './styles.css';

function App() {

  const [habits, sethabits] = useState<any>([]);

  const addNewHabit = (newHabit: String) => {
    sethabits([...habits, newHabit]);
  }

  return (
    <>
      <NewHabit addNewHabit = {addNewHabit}/>
      {habits.map((name: String) => <Heatmap name ={name}/>)}
    </>
  );
}

export default App;
