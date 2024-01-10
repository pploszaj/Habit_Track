import React, {useState} from 'react';
import { HabitType, Habit } from '../types';

type NewHabitProps = {
  addNewHabit: (newHabit: Habit) => void;
}

function NewHabit(props: NewHabitProps) {

    const [habitName, sethabitName] = useState('');
    const [habitType, sethabitType] = useState<HabitType>();

    const newHabitHandler = () => {
      if(habitName !== '' && habitType !== undefined){
        props.addNewHabit({name: habitName, type: habitType});
        sethabitName('');
      }
    }


  return (
    <div className='flex mt-10'>
        <select value={habitType} onChange={(e) => sethabitType(e.target.value as HabitType)}>
          <option value={HabitType.NUMBER}>Number</option>
          <option value={HabitType.CHECKBOX}>Checkbox</option>
        </select>
        <input className='rounded ml-10 w-64 text-sm pl-2 pr-2 bg-gray text-white' type="text" placeholder='Go to gym, stop smoking, etc' value={habitName} onChange={(e) => sethabitName(e.target.value)}/>
        <button onClick={newHabitHandler} className="text-2xl text-white ml-4">+</button>
    </div>
  )
}

export default NewHabit