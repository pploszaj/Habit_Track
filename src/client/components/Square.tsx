import React, { useState, useEffect } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { HabitType } from "../types";
import Modal from "./Modal";

type SquareProps = {
  id: number;
  date: Date;
  completed: boolean;
  val: number;
  toggleComplete: (id: number) => void;
  type: HabitType;
  updateValue: (id: number, updatedValue: number) => void;
  maxVal: number;
  updatedColor: string;
};

//darkest green: #0D4429
//second darkest: #006D32
//second lightest: #26A641
//lightest green: #39D353

function Square(props: SquareProps) {
  console.log('square')
  const [modal, setmodal] = useState<boolean>(false);
  const [color, setcolor] = useState<string>('#161B22')

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#6F7681",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#6F7681",
      fontSize: 12,
      color: "white",
    },
  }));

  const clickHandler = () => {
    if (props.date <= new Date()) {
      props.toggleComplete(props.id);
    }
  };

  const modalHandler = () => {
    setmodal(!modal);
  };

  const newValueHandler = (id: number, val: number) => {
    setmodal(!modal);
    props.updateValue(id, val);
  }

  useEffect(() => {
    let max = props.maxVal;
    let val = props.val;
    if(val > 0) {
      let w = max / 4;
      if(val >= max - w){
        setcolor('#39D353');
      } else if (val >= max - (w * 2)){ 
        setcolor('#26A641');
      } else if (val >= max - (w * 3)){
        setcolor('#006D32');
      } else if (val >= max - (w * 4)){
        setcolor('#0D4429');
      }
    } else {
      setcolor('#161B22');
    }
  }, [props.val, props.maxVal])

  return (
    <>
      <BootstrapTooltip
        title={props.date.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      >
        <div
          className="h-4 w-4 rounded m-[2px]"
          style={{
            border:
              props.date.toDateString() === new Date().toDateString()
                ? "#39D353 2px solid"
                : "",
            backgroundColor: props.type === "NUMBER" ? color : props.completed ? props.updatedColor : "#161B22",
            cursor: props.date <= new Date() ? "pointer" : "default",
          }}
          onClick={props.type === "CHECKBOX" ? clickHandler : modalHandler}
        ></div>
      </BootstrapTooltip>
      {modal ? <Modal id={props.id} modalHandler={modalHandler} updateValue={newValueHandler}/> : null}
    </>
  );
}

export default Square;
