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
    <div className='flex mt-10'>
        <input className='rounded ml-10 w-72 text-sm' type="text" placeholder='Go to gym, stop smoking, wake up early, etc' value={habitName} onChange={(e) => sethabitName(e.target.value)}/>
        <button onClick={newHabitHandler} className="text-2xl text-white ml-4">+</button>
    </div>
  )
}

export default NewHabit