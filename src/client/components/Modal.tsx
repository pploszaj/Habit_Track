import React, { useState } from "react";

type ModalProps = {
    id: number;
    modalHandler: () => void;
    updateValue: (id: number, updatedValue: number) => void;
}

function Modal(props: ModalProps) {
  const [amount, setamount] = useState<string>("");

  return (
    <div className="bg-gray h-48 w-80 z-50 flex flex-col justify-center items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] fixed">
      <input type="text" className="text-gray w-48" placeholder="Enter an amount" value={amount} onChange={(e) => setamount(e.target.value)}/>
      <div className="flex gap-4 text-lightgray">
        <button onClick={() => props.updateValue(props.id, Number(amount))}>Save</button> 
        <button onClick={props.modalHandler}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
