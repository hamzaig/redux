import { addBug, assignBugToUser, bugAdded, bugAssignedToUser, bugResolved, getBugsByUser, getUnresolvedBugs, loadBugs, resolveBug } from "./store/bugs";
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from "./store/api";
const store = configureStore();



store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(assignBugToUser(1, 5))
}, 2000);


// store.dispatch(addBug({ desc: "a" }))


// store.dispatch(loadBugs());

// setTimeout(() => {
//   store.dispatch(loadBugs());
// }, 2000);


// before adding loadbugs function in reducer file
// store.dispatch(actions.apiCallBegan({
//   url: "/bugs",
//   onSuccess: "bugs/bugsReceived",
// }))

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   }
// });

// store.dispatch((dispatch, getState) => {
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3, 4] })
//   // console.log(getState());
// })

// store.dispatch({
//   type: "erxror",
//   payload: {
//     message: "New Error",
//   },
// })

// store.dispatch(userAdded({ name: "user1" }))
// store.dispatch(userAdded({ name: "user2" }))
// store.dispatch(projectAdded({ name: "colne" }));
// store.dispatch(bugAdded({ desc: "Bug 1" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

// console.log(getBugsByUser(3)(store.getState()));
// console.log(getUnresolvedBugs(store.getState()));
// console.log(store.getState());