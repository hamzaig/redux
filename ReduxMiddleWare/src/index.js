import { bugAdded, bugAssignedToUser, bugResolved, getBugsByUser, getUnresolvedBugs } from "./store/bugs";
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
const store = configureStore();


store.dispatch((dispatch, getState) => {
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3, 4] })
  // console.log(getState());
})

store.dispatch({
  type: "erxror",
  payload: {
    message: "New Error",
  },
})

// store.dispatch(userAdded({ name: "user1" }))
// store.dispatch(userAdded({ name: "user2" }))
// store.dispatch(projectAdded({ name: "colne" }));
// store.dispatch(bugAdded({ desc: "Bug 1" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

// console.log(getBugsByUser(3)(store.getState()));
// console.log(getUnresolvedBugs(store.getState()));
// console.log(store.getState());