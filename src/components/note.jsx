import Trash from "@/icons/trash";
import ArrowRight from "@/icons/arrow-right";
import { useContext } from "react";

import { localStorageContext } from "@/app/(routes)/page";
import getTimeSinceDate from "@/utils/getTimeSinceDate";

function Note({ data }) {
  const localStorageApi = useContext(localStorageContext);
  const { storage, loadFunc, _ActiveNote } = localStorageApi;
  const { getActiveNote, setActiveNote } = _ActiveNote;

  const { _id, title, content, _createdAt } = data;

  function HandleDelete() {
    storage.remove(_id);
    setActiveNote(null);
    loadFunc();
  }

  function HandleOpen() {
    setActiveNote(data);
  }

  return <div className="py-1 px-2 border-2 border-gray-800 rounded-md">
    <h3 className="font-black text-xl">{title}</h3>
    <p className="text-sm line-clamp-2">{content}</p>
    <div className="flex justify-between items-center pt-2">
      <span className="bg-emerald-400 py-0.5 px-1 border-2 border-gray-800 rounded-md text-[10px] font-black">{getTimeSinceDate(_createdAt)}</span>

      <div className="flex gap-1">
        <button
          type="button"
          onClick={HandleDelete}
          className="bg-rose-400 p-0.5 border-2 border-gray-800 rounded-md"
        ><Trash className="size-4" /></button>
        {/* <button
          type="button"
          onClick={HandleEdit}
          className="bg-amber-400 p-0.5 border-2 border-gray-800 rounded-md"
        ><Edit className="size-4" /></button> */}
        <button
          type="button"
          onClick={HandleOpen}
          className="bg-sky-400 p-0.5 border-2 border-gray-800 rounded-md"
        ><ArrowRight className="size-4" /></button>
      </div>
    </div>

  </div>
}

export default Note;