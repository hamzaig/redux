////////////////// from core redux package
// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
// import reducer from "./bugs";


// export default function configureStore() {
//   const store = createStore(reducer, devToolsEnhancer({ trace: true }));
//   return store;
// };


////////////////// from redux toolkit package
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
  });
};