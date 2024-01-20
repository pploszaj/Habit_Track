import React from "react";

type SettingsModalProps = {
  changeColorHandler: (color: string) => void;
  toggleModal: () => void;
};

function SettingsModal(props: SettingsModalProps) {
  return (
    <div className="bg-gray h-48 w-80 z-50 flex flex-col gap-4 justify-center rounded-md items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] fixed">
      <div className="flex gap-4">
        <button
          className="h-6 w-6 rounded-full bg-[#D33953] focus:border focus:border-blue-500"
          onClick={() => props.changeColorHandler("#D33953")}
        ></button>
        <button
          className="h-6 w-6 rounded-full bg-[#39D353] focus:border focus:border-blue-500"
          onClick={() => props.changeColorHandler("#39D353")}
        ></button>
        <button
          className="h-6 w-6 rounded-full bg-[#3933D3] focus:border focus:border-blue-500"
          onClick={() => props.changeColorHandler("#3933D3")}
        ></button>
        <button
          className="h-6 w-6 rounded-full bg-[#D37339] focus:border focus:border-blue-500"
          onClick={() => props.changeColorHandler("#D37339")}
        ></button>
        <button
          className="h-6 w-6 rounded-full bg-[#7339D3] focus:border focus:border-blue-500 "
          onClick={() => props.changeColorHandler("#7339D3")}
        ></button>
      </div>
      <button onClick={props.toggleModal}>Save</button>
    </div>
  );
}

export default SettingsModal;
