// Action types 
// These are used if we use core redux
// No Need if we use Redux Tool Kit
// const BUG_ADDED = 'bugAdded';
// const BUG_REMOVED = 'bugRemoved';
// const BUG_RESOLVED = 'bugResolved';

// Action Creators with core redux
// export const bugAdded = desc => ({
//   type: BUG_ADDED,
//   payload: {
//     desc: "Bug1",
//   }
// });

// export const bugResolved = id => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id
//   }
// });

// Action Creators with Redux toolkit
// import { createAction } from "@reduxjs/toolkit";

// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

// Reducer with core redux
// let lastId = 0;
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           desc: action.payload.desc,
//           resolved: false,
//         }
//       ]
//     case bugResolved.type:
//       return state.map(s => {
//         if (s.id === action.payload.id) {
//           return {
//             ...s,
//             resolved: true,
//           }
//         }
//         return s;
//       })
//     case bugRemoved.type:
//       return state.filter(s => s.id !== action.payload.id);
//     default:
//       return state;
//   }
// }

// Reducer with redux tool kit
// import { createReducer } from "@reduxjs/toolkit";
// export default createReducer([], {
//   bugAdded: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       desc: action.payload.desc,
//       resolved: false,
//     });
//   },
//   bugResolved: (bugs, action) => {
//     const index = bugs.findIndex(bug => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   },
//   bugRemoved: (bugs, action) => {

//   }
// })
// let lastId = 0;

//Create slice so we dont need any action types and action creators seprate files

import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
let lastId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex(bug => bug.id === bugId);
      // console.log();
      bugs[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        desc: action.payload.desc,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {

    }
  }
})

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => !bug.resolved)
)
export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.userId === userId)
)

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;
export default slice.reducer;