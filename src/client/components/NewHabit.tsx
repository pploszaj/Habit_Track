import React, {useState} from 'react'

type NewHabitProps = {
  addNewHabit: (newHabit: String) => void;
}

function NewHabit(props: NewHabitProps) {

    const [habitName, sethabitName] = useState("");

    const newHabitHandler = () => {
        props.addNewHabit(habitName);
        sethabitName("");
    }

  return (
    <div>
        <input type="text" placeholder='Go to gym, stop smoking, wake up early, etc' value={habitName} onChange={(e) => sethabitName(e.target.value)}/>
        <button onClick={newHabitHandler}>+</button>
    </div>
  )
}

export default NewHabit