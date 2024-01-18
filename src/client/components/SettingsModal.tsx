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
          className="text-[#D33953]"
          onClick={() => props.changeColorHandler("#D33953")}
        >
          Red
        </button>
        <button
          className="text-[#39D353]"
          onClick={() => props.changeColorHandler("#39D353")}
        >
          Green
        </button>
        <button
          className="text-[#3933D3]"
          onClick={() => props.changeColorHandler("#3933D3")}
        >
          Blue
        </button>
        <button
          className="text-[#D37339]"
          onClick={() => props.changeColorHandler("#D37339")}
        >
          Orange
        </button>
        <button
          className="text-[#7339D3]"
          onClick={() => props.changeColorHandler("#7339D3")}
        >
          Purple
        </button>
      </div>
      <button onClick={props.toggleModal}>Close</button>
    </div>
  );
}

export default SettingsModal;
