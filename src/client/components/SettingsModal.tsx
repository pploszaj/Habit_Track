import React, {useState} from "react";

type SettingsModalProps = {
  changeColorHandler: (color: string) => void;
  toggleModal: () => void;
  changeHabitName: (currentHabitName: string, newHabitName: string) => void;
  currentHabitName: string;
};

function SettingsModal(props: SettingsModalProps) {

  const [newHabitName, setnewHabitName] = useState('');

  const handleSave = () => {
    props.changeHabitName(props.currentHabitName, newHabitName);
    props.toggleModal();
  }

  return (
    <div className="relative">
    <div className="bg-gray h-48 w-80 z-50 flex flex-col gap-4 justify-center rounded-md items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] fixed">
      <input placeholder="Enter new habit name" type="text" value={newHabitName} onChange={(e) => setnewHabitName(e.target.value)}></input>
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
      <button className="text-lightgray" onClick={handleSave}>Save</button>
    <button className="absolute right-6 top-2 text-lightgray hover:text-gray-700 text-2xl" onClick={props.toggleModal}>x</button>
    </div>
    </div>
  );
}

export default SettingsModal;
