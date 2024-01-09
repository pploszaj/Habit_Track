import React, {useState} from 'react'

type SquareProps = {
  date: Date;
}

function Square(props: SquareProps) {

  const [completed, setcompleted] = useState(false);

  const clickHandler = () => {
   setcompleted(!completed);
  }

  return (
    <div className='h-4 w-4 rounded cursor-pointer' style={{border: props.date.toDateString() === new Date().toDateString() ? '#FFD700 2px solid' : '', backgroundColor: completed ? '#39D353' : '#161B22'}} onClick={clickHandler}></div>
  )
}

export default Square