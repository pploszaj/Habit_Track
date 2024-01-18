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

function Square(props: SquareProps) {
  const [modal, setmodal] = useState<boolean>(false);
  const [color, setcolor] = useState<string>("#161B22");

  console.log(props.updatedColor);
  console.log("color:", color);
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
    if (props.date <= new Date()) {
      setmodal(!modal);
    }
  };

  const newValueHandler = (id: number, val: number) => {
    setmodal(!modal);
    props.updateValue(id, val);
  };

  useEffect(() => {
    let max = props.maxVal;
    let val = props.val;
    let updatedColor = props.updatedColor;

    if (val > 0) {
      let w = max / 4;
      switch (updatedColor) {
        case "#39D353":
          if (val >= max - w) {
            setcolor("#39D353");
          } else if (val >= max - w * 2) {
            setcolor("#26A641");
          } else if (val >= max - w * 3) {
            setcolor("#006D32");
          } else if (val >= max - w * 4) {
            setcolor("#0D4429");
          } else {
            setcolor("#161B22");
          }
          break;
        case "#D33953":
          if (val >= max - w) {
            setcolor("#D33953");
          } else if (val >= max - w * 2) {
            setcolor("#B0243D");
          } else if (val >= max - w * 3) {
            setcolor("#8C1027");
          } else if (val >= max - w * 4) {
            setcolor("#660618");
          } else {
            setcolor("#161B22");
          }
          break;
        case "#D37339":
          if (val >= max - w) {
            setcolor("#D37339");
          } else if (val >= max - w * 2) {
            setcolor("#8C5420");
          } else if (val >= max - w * 3) {
            setcolor("#5D3614");
          } else if (val >= max - w * 4) {
            setcolor("#301F0B");
          } else {
            setcolor("#161B22");
          }
          break;
        case "#3933D3":
          if (val >= max - w) {
            setcolor("#3933D3");
          } else if (val >= max - w * 2) {
            setcolor("#352CAE");
          } else if (val >= max - w * 3) {
            setcolor("#30268F");
          } else if (val >= max - w * 4) {
            setcolor("#241D6E");
          } else {
            setcolor("#161B22");
          }
          break;
        case "#7339D3":
          if (val >= max - w) {
            setcolor("#7339D3");
          } else if (val >= max - w * 2) {
            setcolor("#4F2B9C");
          } else if (val >= max - w * 3) {
            setcolor("#35206D");
          } else if (val >= max - w * 4) {
            setcolor("#1C1441");
          } else {
            setcolor("#161B22");
          }
          break;
      }
    }
  }, [props.val, props.maxVal, props.updatedColor]);

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
            backgroundColor:
              props.type === "NUMBER"
                ? color
                : props.completed
                ? props.updatedColor
                : "#161B22",
            cursor: props.date <= new Date() ? "pointer" : "default",
          }}
          onClick={props.type === "CHECKBOX" ? clickHandler : modalHandler}
        ></div>
      </BootstrapTooltip>
      {modal ? (
        <Modal
          id={props.id}
          modalHandler={modalHandler}
          updateValue={newValueHandler}
        />
      ) : null}
    </>
  );
}

export default Square;
