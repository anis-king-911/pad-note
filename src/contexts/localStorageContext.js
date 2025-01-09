import { createContext, useContext } from "react";

// import localStorageApi from "@/database/localStorage";
// const storage = new localStorageApi("MyDatabase");

export const localStorageContext = createContext(null);
export const localStorageProvider = localStorageContext.Provider;

function useLocalStorageApi() {
  const storage = useContext(localStorageContext);
  return storage;
}

export default useLocalStorageApi;

/* USAGE */ /* @/layout.js */
// 
// import { localStorageProvider } from "./localStorageContext"
// 
// function Compo({ children }) {
//   /* localStorageProvider.Provider value={{ colorMode, update: setColorMode }} */
//   
//   return <localStorageProvider>
//     {children}
//   </localStorageProvider>
// }
// 
// export default Compo;
//

//////////////////////////////////////////
/* USAGE */ /* @/page.js */
//
// import { useLocalStorageApi } from "./localStorageContext"
// 
// function Compo(props) {
//   const localStorageApi = useLocalStorageApi()
// 
//   return <p>The color mode is: {localStorageApi?.?.?.}</p>
// }
// 
// export default Compo;