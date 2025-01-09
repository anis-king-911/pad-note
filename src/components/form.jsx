import Plus from "@/icons/plus";

import { useContext } from "react";
import { localStorageContext } from "@/app/(routes)/page";

function Form() {
  const localStorageApi = useContext(localStorageContext);
  const { storage, loadFunc } = localStorageApi;

  function HandleSubmit(event) {
    event.preventDefault();
    
    storage.insert({ 
      title: "Note Title....",
      content: "Note Content.... Note Content.... Note Content.... Note Content.... Note Content.... Note Content.... Note Content.... Note Content...."
    });

    event.target.reset();
    loadFunc();
  }

  return <form
    className="sticky top-0"
    onSubmit={HandleSubmit}
    autoComplete="off"
  >
    <button
      type="submit"
      className="w-full flex justify-center bg-white p-1 border-2 border-gray-800 rounded-md"
    ><Plus /></button>
  </form>
}

export default Form;