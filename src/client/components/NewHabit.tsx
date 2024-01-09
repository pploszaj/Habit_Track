import React, {useState} from 'react'

type NewHabitProps = {
  addNewHabit: (newHabit: String) => void;
}

function NewHabit(props: NewHabitProps) {

    const [habitName, sethabitName] = useState("");

    const newHabitHandler = () => {
      if(habitName !== ""){
        props.addNewHabit(habitName);
        sethabitName("");
      }
    }

  return (
    <div className='flex mt-10'>
        <input className='rounded ml-10 w-64 text-sm pl-2 pr-2 bg-gray text-white' type="text" placeholder='Go to gym, stop smoking, etc' value={habitName} onChange={(e) => sethabitName(e.target.value)}/>
        <button onClick={newHabitHandler} className="text-2xl text-white ml-4">+</button>
    </div>
  )
}

export default NewHabit