import React from "react";

type SettingsModalProps = {
  changeColorHandler: (color: string) => void;
};

function SettingsModal(props: SettingsModalProps) {
  return (
    <div className="bg-gray h-48 w-80 z-50 flex flex-col gap-4 justify-center rounded-md items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] fixed">
      <div className="flex gap-4">
        <button
          className="text-red-600"
          onClick={() => props.changeColorHandler("#D33953")}
        >
          Red
        </button>
        <button
          className="text-green-600"
          onClick={() => props.changeColorHandler("#39D353")}
          value="green"
        >
          Green
        </button>
        <button
          className="text-blue-600"
          onClick={() => props.changeColorHandler("#3933D3")}
          value="blue"
        >
          Blue
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
