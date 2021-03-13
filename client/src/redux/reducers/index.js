import {combineReducers} from "redux";
import user from "./user";
import article from "./article";
import bookSection from "./bookSection";
import publication from "./publication";


export default combineReducers({user, article, bookSection, publication});
