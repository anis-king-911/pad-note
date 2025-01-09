import Disk from "@/icons/disk";
import Close from "@/icons/close";

import { useContext, useRef } from "react";
import { localStorageContext } from "@/app/(routes)/page";

import useDebounce from "@/utils/useDebounce";

function ActiveNote() {
  const formRef = useRef(null);
  const localStorageApi = useContext(localStorageContext);
  const { storage, loadFunc, _ActiveNote } = localStorageApi;
  const { getActiveNote, setActiveNote } = _ActiveNote;

  const AutoSave = useDebounce(() => {
    if (formRef.current) HandleSubmit(formRef.current);
  }, 4000);

  function HandleClose() {
    setActiveNote(null);
  }

  function HandleSubmit(input) {
    let form;

    if (input?.preventDefault) {
      input.preventDefault();
      form = input.target;
    } else if (input instanceof HTMLFormElement) {
      form = input;
    }

    if (!form) return;

    const newData = {
      title: form.title.value,
      content: form.content.value,
    };

    storage.update(getActiveNote?._id, newData);
    loadFunc();
  }

  function HandleChange(event) {
    AutoSave(event.target.value);
  }

  return <form ref={formRef} onSubmit={HandleSubmit} className="">
    <header className="border-b-2 border-slate-800 pb-1 gap-1 flex items-center justify-between">
      <p className="flex-1 text-sm">ID: <span className="font-black">{getActiveNote?._id}</span></p>
      <button
        type="button"
        onClick={HandleClose}
        className="bg-rose-400 p-0.5 border-2 border-gray-800 rounded-md"
      ><Close className="size-4" /></button>
      <button
        type="submit"
        className="bg-emerald-400 p-0.5 border-2 border-gray-800 rounded-md"
      ><Disk className="size-4" /></button>
    </header>

    <div className="gap-1 py-1 flex flex-col">
      <input
        id="title"
        type="text"
        name="title"
        onInput={HandleChange}
        defaultValue={getActiveNote?.title}
        className="text-3xl border-b-2 border-slate-800"
      />
      <textarea
        id="content"
        name="content"
        onInput={HandleChange}
        defaultValue={getActiveNote?.content}
        className="resize-none min-h-[23rem]"
      ></textarea>
    </div>
  </form>
}

export default ActiveNote;