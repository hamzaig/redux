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
import moment from "moment";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs) => {
      bugs.loading = false;
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      // console.log();
      bugs.list[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
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

const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diff = moment().diff(moment(lastFetch), "minutes");
  // if (diff < 1) return;
  dispatch(
    apiCallBegan({
      url,
      onRequest: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    }))
}

export const addBug = (bug) => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type,
})

export const resolveBug = id => apiCallBegan({
  url: `${url}/${id}`,
  method: "patch",
  data: { resolved: true },
  onSuccess: bugResolved.type,
})

export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: `${url}/${bugId}`,
  method: "patch",
  data: { userId },
  onSuccess: bugAssignedToUser.type,
})
