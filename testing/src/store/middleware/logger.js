const logger = parms => store => next => action => {
  // console.log(parms);
  // console.log("hello");
  // console.log("store", store);
  // console.log("next", next);
  // console.log("action", action);
  return next(action);
}

export default logger;