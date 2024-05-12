import React, { useState, useEffect } from "react";
import Heatmap from "./components/Heatmap";
import NewHabit from "./components/NewHabit";
import Login from "./components/Login";
import "./styles.css";
import { Habit } from "../client/types";
import axios from "axios";
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [habits, sethabits] = useState<Habit[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const addNewHabit = (newHabit: Habit) => {
    setLoading(true);
    try {
      setTimeout(() => {
        sethabits([...habits, newHabit]);
        setLoading(false);
      }, 1500); // Simulate delay
    } catch (error) {
      console.error("Failed to create habit", error);
      setLoading(false);
    }
  };

  const changeHabitName = (currentName: string, newHabitName: string) => {
    console.log("in the changehabit func");
    const index = habits.findIndex((habit) => habit.name === currentName);
    if (index !== -1) {
      console.log("changing name to : ", newHabitName);
      const updatedHabits = [...habits];
      updatedHabits[index] = {
        ...updatedHabits[index],
        name: newHabitName,
      };
      sethabits(updatedHabits);
    }
  };

  const toggleIsLoggedIn = (newToken: string | null = null) => {
    // setisLoggedIn(!isLoggedIn);
    if (newToken) {
      setToken(newToken);
      setisLoggedIn(true);
      localStorage.setItem("accessToken", newToken);
    } else {
      setToken(null);
      setisLoggedIn(false);
      localStorage.removeItem("accessToken");
    }
  }

  const logoutHandler = () => {
    toggleIsLoggedIn(null);
  }

  useEffect(() => {
    //get habits from db
    //save after a change is made
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken){
      setToken(storedToken);
      setisLoggedIn(true);
    }

    const fetchHabits = async () => {
      if(!storedToken) return;

      try {
        const res = await axios.get("/habits", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
        });
        sethabits(res.data.habits);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };

    fetchHabits();
  }, [token]);

  return isLoggedIn ? (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      {loading && <Loader />}
      <button onClick={logoutHandler} className="text-2xl text-white">Logout</button>
      <NewHabit addNewHabit={addNewHabit} token={token} />
      <div className="flex justify-center w-screen h-screen">
        <div className="h-screen w-[70vw] flex flex-col justify-start items-start gap-10 mt-10">
          {habits.map((habit: Habit, index: number) => (
            <Heatmap
              name={habit.name}
              type={habit.type}
              metric={habit.metric}
              key={index}
              token={token}
              changeHabitName={changeHabitName}
            />
          ))}
          {habits.length === 0 ? (
            <div className="flex h-4/6 w-full justify-center items-center">
              <h1 className="text-[#9CA3AF] text-2xl">
                Start Crafting Your New Habits Today.
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <Login toggleIsLoggedIn = {toggleIsLoggedIn}/>
  );
}

export default App;
