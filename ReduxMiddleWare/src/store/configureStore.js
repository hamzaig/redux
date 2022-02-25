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
import func from "./middleware/func";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import reducer from "./reducer";

// export default function () {
//   return configureStore({
//     reducer,
//     middleware: [logger("thisisParams"), func],
//   });
// };
// using default middleware from the redux toolkit instead of custom func
export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger("logger arg"), toast]
  });
};