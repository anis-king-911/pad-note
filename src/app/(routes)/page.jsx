"use client";
import Form from "@/components/form";
import Note from "@/components/note";
import ActiveNote from "@/components/activeNote";

import { useState, useEffect, createContext } from "react";
import localStorageApi from "@/database/localStorage";
const storage = new localStorageApi("MyDatabase");

export const localStorageContext = createContext(null);

function HomePage() {
  const [getActiveNote, setActiveNote] = useState(null);
  const _ActiveNote = { getActiveNote, setActiveNote };

  const [getNotes, setNotes] = useState({});
  const notes = Object.values(getNotes);

  function loadNotes() {
    const updatedNotes = storage.load();
    setNotes(updatedNotes);
  };

  useEffect(() => { loadNotes() }, []);

  return <localStorageContext.Provider
    value={{ storage, loadFunc: () => loadNotes(), _ActiveNote }}
  >
    <main className="max-w-[48rem] h-[calc(100vh-2.5rem)] my-4 mx-auto gap-2 flex flex-wrap justify-between"> {/* overflow-y-auto */}
      <section className="h-[calc(100vh-2.5rem)] bg-white p-2 border-2 border-gray-800 rounded-md shadow overflow-y-auto basis-[calc(10rem-1rem)] flex-grow relative">
        <Form />
        <div className="flex flex-col gap-2 pt-2">
          {notes.length ? notes.map(item => (
            <Note key={item._id} data={item} />
          )) : <p
            className="py-1 font-black text-xl text-center border-2 border-gray-800 rounded-md"
          >Database is Empty</p>}
        </div>
      </section>
      <section className="h-[calc(100vh-2.5rem)] bg-white p-2 border-2 border-gray-800 rounded-md shadow overflow-y-auto basis-[calc(22rem-1rem)] flex-grow">
        {getActiveNote ?
          <ActiveNote /> :
          (<p className="py-1 font-black text-xl text-center border-2 border-gray-800 rounded-md opacity-40 cursor-default">
            No Note Is Currently Open Or Active
          </p>)}
      </section>
    </main>
  </localStorageContext.Provider>
}

export default HomePage;