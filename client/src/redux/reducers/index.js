import {combineReducers} from "redux";
import user from "./user";
import article from "./article";
import bookSection from "./bookSection";


export default combineReducers({user, article, bookSection});
