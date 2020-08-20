import { combineReducers } from "redux";

// import bootstrap from './modules/bootstrap'; // Not included in this selection of code
import global from "./modules/global";
// import pages from './modules/pages';
// import hotels from './modules/hotels';
// import user from './modules/user';
import modal from "./modules/modal";

const rootReducer = combineReducers({
  // bootstrap,
  global,
  // pages,
  // hotels,
  // user,
  modal,
});

export default rootReducer;
