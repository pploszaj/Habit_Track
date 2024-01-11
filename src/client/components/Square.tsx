import React, {useState} from 'react'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { SquareObject } from '../types'



function Square(props: SquareObject) {

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#6F7681',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#6F7681',
      fontSize: 12,
      color: 'white'
    },
  }));
  

  // const clickHandler = () => {
  //   if(props.date <= new Date()){
  //     setcompleted(!completed);
  //   }
  // }

  return (
    <BootstrapTooltip title={props.date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}>
      <div className='h-4 w-4 rounded' style={{border: props.date.toDateString() === new Date().toDateString() ? '#39D353 2px solid' : '', backgroundColor: props.completed ? '#39D353' : '#161B22', cursor: props.date <= new Date() ? 'pointer' : 'default'}} ></div>
    </BootstrapTooltip>
  )
}

export default Square