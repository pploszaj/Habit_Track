import React, { useState, useEffect } from "react";
import Heatmap from "./components/Heatmap";
import NewHabit from "./components/NewHabit";
import "./styles.css";
import { Habit } from '../client/types';
import axios from "axios";

function App() {
  const [habits, sethabits] = useState<Habit[]>([]);
  const [response, setresponse] = useState('');

  const addNewHabit = (newHabit: Habit) => {
    sethabits([...habits, newHabit]);
  };

  const changeHabitName = (currentName: string, newHabitName: string) => {
    console.log('in the changehabit func');
    const index = habits.findIndex((habit) => habit.name === currentName);
    if (index !== -1){ 
      console.log('changing name to : ', newHabitName);
      const updatedHabits = [...habits];
      updatedHabits[index] = {
        ...updatedHabits[index],
        name: newHabitName
      }
      sethabits(updatedHabits);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/hi');
        console.log(res.data);
        setresponse(res.data);
      } catch(error) {
        console.error('error fetching data', error)
      }
    }
    fetchData();
  },[])

  return (
    <div>
      <NewHabit addNewHabit={addNewHabit} />
      {response ? <div className="text-white text-[100px]">WOAH IT WORKS</div> : null} 
      <div className="flex justify-center w-screen h-screen">
        <div className="h-screen w-[70vw] flex flex-col justify-start items-start gap-10 mt-10">
          {habits.map((habit: Habit, index: number) => (
            <Heatmap name={habit.name} type={habit.type} metric={habit.metric} key={index} changeHabitName={changeHabitName}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
