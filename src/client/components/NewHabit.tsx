import React, {useState} from 'react';
import { HabitType, Habit } from '../types';

type NewHabitProps = {
  addNewHabit: (newHabit: Habit) => void;
}

function NewHabit(props: NewHabitProps) {

    const [habitName, sethabitName] = useState('');
    const [habitType, sethabitType] = useState<HabitType>(HabitType.NUMBER);
    const [metric, setmetric] = useState<string>('');

    const newHabitHandler = () => {
      if((habitName !== '' && habitType === 'CHECKBOX')||(habitType === 'NUMBER' && metric !== '' && habitName !== '')){
        props.addNewHabit({name: habitName, type: habitType, metric});
        sethabitName('');
      }
    }


  return (
    <div className='flex mt-10 ml-10 items-center'>
        <select className='bg-gray rounded text-[#9CA3AF] h-10 pl-1 ' value={habitType} onChange={(e) => sethabitType(e.target.value as HabitType)}>
          <option value={HabitType.NUMBER}>Number</option>
          <option value={HabitType.CHECKBOX}>Checkbox</option>
        </select>
        <input className='h-10 rounded ml-10 w-64 text-sm pl-2 pr-2 bg-gray text-white' type="text" placeholder='Go to gym, stop smoking, etc' value={habitName} onChange={(e) => sethabitName(e.target.value)}/>
        {habitType === 'NUMBER' ? (<input className='h-10 rounded ml-10 w-48 text-sm pl-2 pr-2 bg-gray text-white' type="text" placeholder='Miles, Minutes, Litres, etc' value={metric} onChange={(e) => setmetric(e.target.value)}></input>): null}
        <button onClick={newHabitHandler} className="flex justify-center items-center text-[#9CA3AF] ml-4 border border-transparent h-10 w-14 rounded hover:text-gray-500 hover:bg-gray transition-all duration-100">
          <p>Add</p>
        </button>
    </div>
  )
}

export default NewHabit