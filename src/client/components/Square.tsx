import React, {useState} from 'react'

type SquareProps = {
  date: Date;
}

function Square(props: SquareProps) {

  const [completed, setcompleted] = useState(false);

  const clickHandler = () => {
    if(props.date <= new Date()){
      setcompleted(!completed);
    }
  }

  return (
    <div className='h-4 w-4 rounded' style={{border: props.date.toDateString() === new Date().toDateString() ? '#FFD700 2px solid' : '', backgroundColor: completed ? '#39D353' : '#161B22', cursor: props.date <= new Date() ? 'pointer' : 'default'}} onClick={clickHandler}></div>
  )
}

export default Square