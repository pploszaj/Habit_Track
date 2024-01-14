import React, { useState } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { HabitType } from "../types";
import Modal from "./Modal";

type SquareProps = {
  id: number;
  date: Date;
  completed: boolean;
  toggleComplete: (id: Number) => void;
  type: HabitType;
};

//darkest green: #0D4429
//second darkest: #006D32
//second lightest: #26A641
//lightest green: #39D353

function Square(props: SquareProps) {
  const [modal, setmodal] = useState<boolean>(false);

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
          className="h-4 w-4 rounded"
          style={{
            border:
              props.date.toDateString() === new Date().toDateString()
                ? "#39D353 2px solid"
                : "",
            backgroundColor: props.completed ? "#39D353" : "#161B22",
            cursor: props.date <= new Date() ? "pointer" : "default",
          }}
          onClick={props.type === "CHECKBOX" ? clickHandler : modalHandler}
        ></div>
      </BootstrapTooltip>
      {modal ? <Modal /> : null}
    </>
  );
}

export default Square;
